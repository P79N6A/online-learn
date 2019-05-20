<template>
	<div id="updatepwd">
		<h3>修改密码</h3>
		<div class="pwd">
			修改密码：<input type="text" v-model="newPwd"/>
			<button @click="update">修改</button>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		name:'Updatepwd',
		data(){
			return{
				phoneNum:'',
				newPwd:''
			}
		},
		methods:{
			update(){
				var _this=this;
				this.phoneNum=sessionStorage.getItem("username");
				axios({
					url:'http://localhost:3000/updatepwd',
					params:{phoneNum:_this.phoneNum,password:_this.newPwd}
				}).then(function(data){
					alert(data.data)
				})
			}
		}
	}
</script>

<style scoped>
	#updatepwd h3{
		height: 40px;
		border-bottom: 1px solid #ccc;
		line-height: 40px;
	}
	#updatepwd .pwd{
		min-height: 100px;
		_height:100px;
		padding: 20px 30px;
		margin: 0 30px;
		border-bottom: 1px solid #ccc;
	}
	#updatepwd .pwd input{
		width: 200px;
		height: 30px;
		margin-right: 10px;
		margin-top: 20px;
	}
	#updatepwd .pwd button{
		width: 60px;
		height: 36px;
		text-align: center;
		line-height: 36px;
		margin-top: 20px;
	}
</style>