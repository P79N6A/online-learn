<template>
	<div id="personal">
		<h3>我的个人信息</h3>
		<div class="phoneNum">
			<h4>昵称 :</h4>
			<p>{{username}}</p>
			<h4>手机号码 :</h4>
			<p>{{phoneNum}}</p>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		name:'Personal',
		data(){
			return{
				phoneNum:'',
				username:''
			}
		},
		mounted(){
			var _this=this;
			this.phoneNum=sessionStorage.getItem("username");
			axios({
				url:'http://localhost:3000/usermessage',
				params:{phoneNum:this.phoneNum}
			}).then(function(data){
				_this.username=data.data[0].username;
			})
		}
	}
</script>

<style scoped>
	#personal h3{
		height: 40px;
		border-bottom: 1px solid #ccc;
		line-height: 40px;
	}
	#personal .phoneNum{
		min-height: 100px;
		_height:100px;
		padding: 20px 30px;
		margin: 0 30px;
		border-bottom: 1px solid #ccc;
	}
	#personal .phoneNum h4{
		font-size: 22px;
		color: #666;
		line-height: 30px;
		height: 30px;
		font-weight: normal;
		display: inline-block;
		margin-right: 10px;
		margin-top: 20px;
	}
	#personal .phoneNum a{
		color: blue;
		font-size: 14px;
	}
	#personal .phoneNum p{
		font-size: 35px;
		color: #666;
		height: 50px;
		line-height: 60px;
	}
</style>