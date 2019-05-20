<template>
	<div id="register">
		<div class="header">
			<a href="#" class="logo"><img src="../assets/logo.png"/></a>
			<a class="login" @click="toLogin()">我已经注册了，马上登录</a>
		</div>
		<div class="main">
			<div class="regist">
				<div class="select">
					<span>注册</span>				
				</div>
				<div class="input-box"><span>用户名</span><input type="text" placeholder="请输入用户名" id="uname" v-model="uname" @blur="name()" @focus="foname()"/></div>
				<div class="error-tishi" ref="nameT"></div>
				<div class="input-box"><span>手机号</span><input type="text" placeholder="请输入手机号" id="phone" v-model="phone" @blur="phoneN()" @focus="fophone()"/></div>
				<div class="error-tishi" ref="phoneT"></div>
				<div class="input-box"><span class="sp">手机验证码</span><input type="text" placeholder="请输入验证码" id="yzm" v-model="yzm"/><i id="suiji-yzm" @click="send()">获取验证码</i></div>
				<div class="error"><div class="send-fail" ref="yzmT"></div></div>
				<div class="input-box"><span>密码</span><input type="text" placeholder="请输入密码" id="pwd" v-model="pwd"/></div>
				<div class="error-tishi" ref="pwdT"></div>
				<div class="xieyi"><input type="checkbox" v-model="agree"/>同意<a href="#">《学习乐园注册协议》</a></div>
				<input type="button" value="注册" id="regist-btn" @click="regist()"/>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from "qs"
	import axios from "axios";
	export default {
		name: 'Register',
		data(){
			return{
				uname:'',
				phone:'',
				pwd:'',
				yzm:'',
				agree:false
			}
		},
		methods: {
			//进入登录页面
			toLogin(){
				this.$router.push("/login");
			},
			//失去焦点时验证用户名是否存在
			name(){
				var _this=this;
				if (this.uname!="") {
					axios({
						url:'http://localhost:3000/checkusername',
						params:{username:_this.uname}
					}).then(function(data){
						if (data.data.code==0) {
							_this.$refs.nameT.innerHTML=data.data.msg
						}
					})
				}else{
					this.$refs.nameT.innerHTML="用户名不能为空";
				}
			},
			//用户名聚焦时提示信息消失
			foname(){
				this.$refs.nameT.innerHTML=""
			},
			//失去焦点时验证手机号是否存在
			phoneN(){
				var _this=this;
				if (this.phone!="") {
					axios({
						url:'http://localhost:3000/checkphone',
						params:{phoneNum:_this.phone}
					}).then(function(data){
						if (data.data.code==0) {
							_this.$refs.phoneT.innerHTML=data.data.msg
						}
					})
				}else{
					this.$refs.phoneT.innerHTML="手机号不能为空";
				}
			},
			//手机号聚焦时提示信息消失
			fophone(){
				this.$refs.phoneT.innerHTML=""
			},
			//点击获取验证码
			send(){
				var _this=this;
				axios({
					url:'http://localhost:3000/register',
					params:{id:0,phoneNum:_this.phone}
				}).then(function(data){
				})
			},
			//点击注册
			regist(){
				var _this=this;
				if (_this.agree==true) {
					axios({
						url:'http://localhost:3000/register',
						params:{id:1,username:_this.uname,phoneNum:_this.phone,password:_this.pwd,yzm:_this.yzm}
					}).then(function(data){
						if (data.data.code==0) {
							_this.$refs.nameT.innerHTML=data.data.msg
						}else if(data.data.code==1){
							_this.$refs.phoneT.innerHTML=data.data.msg
						}else if(data.data.code==3){
							_this.$refs.yzmT.innerHTML=data.data.msg
						}else{
							_this.$router.push("/login")
						}
						localStorage.setItem("user",_this.uname)
					})
				}else{
					alert("请先同意学习乐园协议")
				}
				
			}
		}	
	}
</script>

<style scoped>
.header { width: 600px; height: 88px; margin: 0 auto; }

.header .logo {  height: 100%; display: block; float: left; margin-top: 20px; }

.header .logo img{height: 47px;}

.header .logo-text { font-size: 18px; float: left; color: #666; line-height: 88px; }

.header .login { float: right; margin-top: 63px; color: #333; font-size: 12px; cursor: pointer;}

.header .login:hover { color: red; }

.main { width: 600px; margin: 0 auto; border: 1px solid #ddd; border-top: 3px solid red; padding: 30px 0; line-height: 1.5; }

.main .regist { width: 380px; margin: 0 auto; }

.main .regist .select { line-height: 25px; margin-bottom: 17px; }


.main .regist .input-box { width: 378px; height: 38px; border: 1px solid #ccc; line-height: 38px; margin-bottom: 25px; font-size: 12px; border-radius: 10px;background: #E6E6E6;}

.main .regist .input-box span { float: left; width: 76px; padding-left: 11px; }

.main .regist .input-box #phone, .main .regist .input-box #pwd, .main .regist .input-box #e-mail, .main .regist .input-box #uname { display: inline-block; width: 291px; height: 100%; font-size: 14px; color: #333; border: 0; background: 0; outline: none; }

.main .regist .input-box .sp { float: left; }

.main .regist .input-box #yzm { display: inline-block; width: 142px; height: 100%; font-size: 14px; color: #333; border: none; background: 0; outline: none; float: left; }

.main .regist .input-box .el-icon-refresh{ width: 48px; height: 100%;display: inline-block;font-style: normal;text-align: center;float: left;padding-top: 6px;font-size: 25px;color: #666;}

.main .regist .input-box #suiji-yzm { 
	width: 85px; height: 30px; float: left; line-height: 30px; text-align: center; background: #F5F5F5; border: 1px solid #bbb; font-size: 14px; margin: 3px 5px 0 30px;font-style:normal;cursor: pointer;border-radius: 10px;}

.main .regist .error-tishi, .main .regist .tishi, .main .regist .error-email{ 
	height: 22px; line-height: 22px; margin: -25px 0 3px; color: red; font-size: 12px;}

.main .regist .error { height: 34px; margin-top: -25px; }

.main .regist .error .send-fail { height: 34px; line-height: 34px; color: red; font-size: 12px; }

.main .regist .mima-tishi { height: 50px; margin-top: -25px; }

.main .regist .mima-tishi .tishi { color: #999; line-height: 22px; }

.main .regist .mima-tishi .tishi a { color: #333; }

.main .regist .mima-tishi .tishi a:hover { color: orange; }

.main .regist #regist-btn { width: 100%; line-height: 40px; background: red; font-size: 20px; color: #fff; margin: 24px 0 5px; border: 0; border-radius: 2px; border-radius: 10px;outline: none;}

.main .regist .xieyi{font-size: 12px;}
.main .regist .xieyi a{color: blue;}
</style>