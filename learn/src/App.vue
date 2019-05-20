<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
  	return{
  		reload:this.reload
  	}
  },
  data(){
  	return{
  		isRouterAlive:true
  	}
  },
  methods:{
  	reload(){
  		this.isRouterAlive=false
  		this.$nextTick(function(){
  			this.isRouterAlive=true
  		})
  	}
  }
}
</script>

<style>
	html,body,div,ul,li,ol,p,h1,h2,h3,h4,h5,h6,form,fieldset,button,dl,dt,dd{
		margin: 0;
		padding: 0;
	}
	li{
		list-style: none;
	}
	img{
		display: block;
		border: 0;
	}
	a{
		text-decoration: none;
	}
	#app{
		width: 100%;
		height: 100%;
	}
	
</style>
