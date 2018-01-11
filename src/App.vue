<template>
	<div>
	  <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    	<router-view></router-view>
    </transition>
  </div>
</template>

<script>

  	export default {

  	}

</script>

<style>

</style>
