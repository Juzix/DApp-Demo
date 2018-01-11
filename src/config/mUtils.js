/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr];
    }else{
        target = document.defaultView.getComputedStyle(element,null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
	let windowHeight = window.screen.height;
	let height;
	let setTop;
	let paddingBottom;
	let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll',() => {
       loadMore();
    }, false)
    //运动开始时获取元素 高度 和 offseTop, pading, margin
	element.addEventListener('touchstart',() => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element,'paddingBottom');
        marginBottom = getStyle(element,'marginBottom');
    },{passive: true})

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove',() => {
       loadMore();
    },{passive: true})

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend',() => {
       	oldScrollTop = document.body.scrollTop;
       	moveEnd();
    },{passive: true})

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            }else{
            	cancelAnimationFrame(requestFram);
            	//为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
            	height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
       showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },{passive: true})

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    }else if(duration instanceof String){
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") {
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        }else{
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr])*rootSize);
        }else{
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch(mode){
                case 'ease-out':
                    speedBase = iCurrent;
                    intervalTime = duration*5/400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration*20/400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr])/duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration*5/400;
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch(mode){
                case 'ease-out':
                    status = iCurrent != target[attr];
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr];
            }

            if (status) {
                flag = false;
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                }else{
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}

export const mobileAndTabletcheck = () => {
  let check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

export const browseCheck = () => {
  return !(typeof global !== 'undefined' && global.global);
}
