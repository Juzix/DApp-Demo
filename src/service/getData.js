/**
 * 调用后台接口定义，接口需要/tyj/开头，发送后台请求
 */

import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 手机号登录
 */
// var sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
// 	code,
// 	mobile,
// 	validate_token
// }, 'POST');

/**
 * 获取用户信息
 */
// export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});

/**
 * 获取用户列表
 */
export const getUserPageList = (keyword = '', currentPage, limit = 10) => fetch('/user/page/list', {keyword, currentPage, limit});
/**
 * 删除用户
 */
export const deleteUser = userId => fetch('/user/del', userId);
/**
 * 编辑用户
 */
export const updateUser = data => fetch('/user/edit', data);
