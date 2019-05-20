<template>
	<div id="introduce">
		<img :src="intro.introImg">
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		name:'Introduce',
		data(){
			return{
				intro:[]
			}
		},
		mounted(){
			//课程介绍
			var _this=this;
			axios({
				url:'http://localhost:3000/detail',
				params:{id:_this.$route.params.id}
			}).then(function(data){
				_this.intro=data.data[0];
			})
		}
	}
</script>

<style scoped>
	#introduce img{
		width: 860px;
	}
</style>