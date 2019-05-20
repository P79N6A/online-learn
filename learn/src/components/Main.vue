<template>
	<div id="out">
		<!--头部导航-->
		<div id="head">
			<div id="head-left">
				<h2 @click="toIndex()"><img src="../assets/logo1.png"/></h2>
				<div id="fenlei">
					<i class="el-icon-tickets"></i>
					<strong href="">分类</strong>
					<div class="first">
						<ul>
							<li v-for="(fItem,i) in firstList" :key=i class="firstLi">
								<h4><a href="#/cart">{{fItem.firstcontent}}</a><i class="el-icon-arrow-right"></i></h4>
								<p>{{fItem.firstli}}</p>
								<div class="second">
									<ul>
										<li v-for="(sItem,si) in firstList[i].second" :key=si class="secondLi"><router-link :to="'/list/'+fItem.fid+'/'+sItem.sid" @click.native="refresh">{{sItem.secondcontent}}</router-link></li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<!--搜索框-->
				<div id="search">
					<el-select v-model="value" placeholder="课程">
					    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				    </el-select>
				    <el-input v-model="input" placeholder="请输入内容" id="sousuo" @keyup="get()"></el-input>
				    <el-button type="primary" icon="el-icon-search"></el-button>
				    <!--<div id="search-box">
				  	  <ul>
				  	  	<li v-for="value in myData">{{value}}</li>
				  	  </ul>
				  	  <p v-show="myData.length==0">暂无数据...</p>
				    </div>-->
				</div>
			</div>
			<!--导航条-->
			<div id="head-right">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				  <el-menu-item index="1" @click="reglog">注册/登录</el-menu-item>
				  <el-submenu index="2">
				    <template slot="title">开课/合作</template>
				  </el-submenu>
				  <el-menu-item index="3" style="position: relative;" id="gouwuche">
				  	<em @click="gwc" style="font-style: normal;">购物车</em>
				  	<strong id="cart-num">{{cartList.length}}</strong>
				  	<div id="gwc">
				  		<h4>我的购物车</h4>
				  		<div id="gwc-content">
				  			<ul v-if="cartList.length>0">
				  				<li v-for="(item,i) in cartList">
				  					<img :src="item.img">
				  					<div class="desc-pri">
				  						<h6>{{item.desc}}</h6>
				  						<span>￥{{item.price}}</span>
				  						<a href="#" @click="del(item.id,i,$event)">删除</a>
				  					</div>
				  				</li>
				  			</ul>
				  			<p v-else="">购物车空空如也</p>
				  		</div>
				  		<h3><span>我的订单</span><a href="#" @click="goCart($event)">去购物车</a></h3>
				  	</div>
				  </el-menu-item>
				  <el-submenu index="4" v-if="username!==null">
				    <template slot="title">
				    	<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload"
						   style="float: left;">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
				    	{{username}}
				    </template>
				    <el-menu-item index="4-1" @click="orderAll()">全部订单</el-menu-item>
				    <el-menu-item index="4-2" @click="shoucang()">收藏</el-menu-item>
				    <el-menu-item index="4-3" @click="personal()">个人信息</el-menu-item>
				    <el-menu-item index="4-4" @click="updateMima()">修改密码</el-menu-item>
				    <el-menu-item index="4-5" @click="tuichu()">退出登陆</el-menu-item>
				  </el-submenu>
				  <el-menu-item v-else="">我的</el-menu-item>
				</el-menu>
			</div>
		</div>
		<div>
			<router-view></router-view>
		</div>
		<div id="foot">
			<i class="el-icon-sunny"></i>
			<p>Copyright © 2019 Tencent. All Rights Reserved.</p>
			<p>
				学习乐园计算机系统有限公司 版权所有 | 
				<a href="">学习乐园服务协议</a>|
				<a href="">站点地图</a>|
				<a href="">侵权投诉</a>|
				<a href="">问题反馈</a>|
				<a href="">帮助</a>
			</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default{
		inject:['reload'],
		name:'Main',
		data(){
			return{
				options: [{
			      value: '选项1',
			      label: '机构'
			    }],
			    value:'',
			    input:'',
			    myData:[],
			    activeIndex: '1',
				activeIndex2: '1',
				cartList:[],
				username:'',
				imageUrl: '',
				firstList:[]
			}
		},
		methods:{
			//点击logo跳转到首页
  			toIndex(){
				this.$router.push("/home");
			},
			refresh:function(){
				this.reload();
			},
			//导航模块
			handleSelect(key, keyPath) {
//	    		console.log(key, keyPath);
		    },
		    //点击登陆注册跳到注册页面
		    reglog(){
		  	  this.$router.push("/login")
		    },
		    //进入购物车页面
		    gwc(e){
		    	e.stopPropagation
		    	if (sessionStorage.getItem("username")) {
		    		this.$router.push("/cart");
//		    		this.reload();
		    	}else{
		    		alert("您还没有登陆哦！")
		    		this.$router.push("/login");
		    	}
		    },
		    goCart(e){
		    	e.stopPropagation
		  	  	if (sessionStorage.getItem("username")) {
		    		this.$router.push("/cart");
//		    		this.reload();
		    	}else{
		    		alert("您还没有登陆哦！")
		    		this.$router.push("/login");
		    	}
		    },
		    //删除购物车课程
		    del(id,i,e){
		    	e.stopPropagation
			  	var _this=this;
			  	axios({
			  		url:'http://localhost:3000/del-cart',
					params:{id:id}
				}).then(function(data){
					//保证页面数据删除
					_this.cartList.splice(i,1)
				})
		  	},
		  	//全部订单
		  	orderAll(){
		  		this.$router.push("/order")
		  	},
		  	//收藏
		  	shoucang(){
		  		this.$router.push("/collect")
		  	},
		  	//个人信息
		  	personal(){
		  		this.$router.push("/personal")
		  	},
		  	updateMima(){
		  		this.$router.push("/updatepwd")
		  	},
		  	//退出登陆
		  	tuichu(){
		  		sessionStorage.removeItem("username");
		  		this.$router.push("/home")
		  		this.reload();
		  	},
		  	handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
	      	},
	      	beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
	      	}
		},
		mounted(){
			//购物车展示
		  	var _this=this;
		  	if (sessionStorage.getItem("username")) {
		  		axios({
			  		url:'http://localhost:3000/cartlist'
			  	}).then(function(data){
			  		_this.cartList=data.data;
			  	})
		  	}
		  	this.username=sessionStorage.getItem("username");
		  	//顶部悬浮
		  	$(window).scroll(function(){
		  		var sTop=$(window).scrollTop();
		  		if(sTop>1){
		  			$("#head").css({"position":"fixed","top":"0","left":"0","box-shadow":"0 2px 3px #ccc"})
		  		}else{
		  			$("#head").css({"position":"relative","box-shadow":"0 0 0 #fff"});
		  		}
		  	})
		  	//鼠标移到分类上显示相应的分类条目
		  	$("#fenlei").on("mouseenter",function(){
		  		$(".first").show();
		  	})
		  	$("#fenlei").on("mouseleave",function(){
		  		$(".first").hide();
		  	})
		  	//axios请求课程分类接口
		  	var _this=this;
		  	axios({
		  		url:'http://localhost:3000/fenlei'
		  	}).then(function(data){
		  		_this.firstList=data.data;
		  	}) 
		  	
		  	//点击搜索框显示相关内容
		  	$("#sousuo").click(function(e){
		  		var e=e||event;
		  		e.stopPropagation();
		  		$("#search-box").show();
		  	})
		  	$(document).click(function(){
		  		$("#search-box").hide();
		  	})
		  	
		  	//鼠标到购物车上，显示购物车模块
		  	$("#gouwuche").mouseenter(function(){
		  		$("#gwc").show();
		  	}).mouseleave(function(){
		  		$("#gwc").hide();
		  	})
	  	},
	  	updated(){
	  		//鼠标移到相应分类条目上显示相关信息
		  	$(".first>ul>li").each(function(item,i){
		  		$(this).mouseenter(function(){
			  		$(this).children(".second").show()
			  	}).mouseleave(function(){
			  		$(this).children(".second").hide()
			  	})
		  	})
	  	}
	}
</script>

<style>
	#out{
		width: 100%;
		height: 100%;
	}
	#head{
		width: 100%;
		height:90px;
		margin: 0 auto;
		position: relative;
		top: 0;
		left: 0;
		background: #fff;
		border-bottom: 1px solid #ccc;
		z-index: 1000;
	}
	#head-left{
		float: left;
		margin-left: 80px;
	}
	#head-left h2{
		float: left;
		margin-top: 14px;
		cursor: pointer;
	}
	#head-left h2 img{
		width: 200px;
		height: 70px;
	}
	#head-left #fenlei{
		font-size: 20px;
		float: left;
		position: relative;
		height: 60px;
		padding: 30px 20px 0;
	}
	#head-left #fenlei i{
		font-size: 30px;
		color: #666;
	}
	#head-left #fenlei strong{
		color: #666;
	}
	#head-left #fenlei .first{
		width: 200px;
		border: 1px solid #ccc;
		background: #fff;
		position: absolute;
		top: 90px;
		left: -55px;
		display: none;
		z-index: 20;
		border-radius: 3px;
	}
	#head-left #fenlei .first ul{
		width: 200px;
	}
	#head-left #fenlei .first ul .firstLi{
		width: 200px;
		height: 100px;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
	}
	#head-left #fenlei .first ul .firstLi:hover{
		background: #cecece;
	}
	#head-left #fenlei .first ul .firstLi h4{
		height: 60px;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
	}
	#head-left #fenlei .first ul .firstLi h4 a{
		color: #000;
	}
	#head-left #fenlei .first ul .firstLi h4 i{
		font-size: 16px;
		color: #999;
	}
	#head-left #fenlei .first ul .firstLi p{
		font-size: 14px;
		padding: 0 10px;
		color: #666;
	}
	#head-left #fenlei .first .second{
		position: absolute;
		left: 200px;
		top: -1px;
		border: 1px solid #ccc;
		width: 600px;
		height: 263px;
		background: #fff;
		display: none;
		padding-top: 40px;
	}
	#head-left #fenlei .first .second ul{
		width: 100%;
	}
	#head-left #fenlei .first .second .secondLi{
		float: left;
		margin: 20px;
	}
	.router-link-active{
		color: red;
	}
	#head-left #search{
		height: 40px;
		float: left;
		margin-top: 27px;
		position: relative;
	}
	#head-left #search .el-select{
		width: 80px;
		float: left;
		cursor:pointer;
	}
	#head-left #search .el-select .el-input--suffix{
		width: 80px;
	}
	#head-left #search .el-select .el-input--suffix .el-input__inner{
		width: 80px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	#head-left #search .el-input{
		width: 250px;
		float: left;
		cursor:pointer;
	}
	#head-left #search .el-input .el-input__inner{
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	#head-left #search .el-button{
		float: left;
		cursor:pointer;
	}
	#head-left #search #search-box{
		width: 383px;
		height: 200px;
		border: 1px solid #ccc;
		background: #fff;
		position: absolute;
		top: 40px;
		left: 0;
		display: none;
	}
	#search-box h5{
		height: 40px;
		border-bottom: 1px solid #999;
		color: #ccc;
		margin: 0 20px;
		line-height: 40px;
	}
	#search-box ul{
		padding: 0 30px;
	}
	#search-box ul li{
		margin-top: 10px;
	}
	#search-box ul li a{
		color: #666;
		display: block;
		width: 100px;
	}
	#search-box ul li a:hover{
		color: #000;
	}
	#head-right{
		float: left;
		margin-top: 20px;
		margin-left: 30px;
	}
	#head-right .el-submenu .el-menu-item{
		width: 80px;
		position: relative;
	} 
	#head-right .el-menu-item  #cart-num{
		position: absolute;
		right: 8px;
		top: 5px;
		width: 22px;
		height: 22px;
		background: red;
		color: #fff;
		text-align: center;
		line-height: 22px;
		display: block;
		border-radius: 50%;
	}
	#head-right #gwc{
		width: 300px;
		border: 1px solid #ccc;
		position: absolute;
		left: -95px;
		top: 60px;
		padding: 0 10px;
		background: #fff;
		display: none;
		z-index: 30;
		border-radius: 3px;
	}
	#head-right #gwc h4{
		height: 40px;
		border-bottom: 1px solid #666;
		font-size: 14px;
		line-height: 40px;
		color: #666;
	}
	#head-right #gwc #gwc-content{
		overflow-y: auto;
		height: 300px;
	}
	#head-right #gwc #gwc-content::scrollbar {
        width: 5px;
       	height: 5px;
    }
	#head-right #gwc #gwc-content ul li{
		border-bottom: 1px solid #ccc;
		width: 100%;
		height: 50px;
		overflow: hidden;
		padding: 10px 0;
	}
	#head-right #gwc #gwc-content ul li img{
		width: 80px;
		height: 50px;
		float: left;
	}
	#head-right #gwc #gwc-content ul li .desc-pri{
		float: left;
		height: 80px;
		margin-left: 10px;
	}
	#head-right #gwc #gwc-content ul li .desc-pri h6{
		font-size: 12px;
		color: #333;
		width: 180px;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		line-height: 12px;
	}
	#head-right #gwc #gwc-content ul li .desc-pri span{
		color: red;
		font-size: 12px;
		margin-right: 100px;
	}
	#head-right #gwc #gwc-content ul li .desc-pri a{
		color: red;
		font-size: 12px;
	}
	#head-right #gwc #gwc-content>p{
		font-size: 25px;
		color: #999;
		text-align: center;
		margin-top: 100px;
	}
	#head-right #gwc h3{
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #ccc;
		width: 100%;
		margin: 0 auto;
		font-size: 12px;
		font-weight: normal;
	}
	#head-right #gwc h3>a{
		width: 70px;
		height: 25px;
		font-size: 12px;
		background: red;
		color: #fff;
		text-align: center;
		line-height: 25px;
		display: inline-block;
		border-radius: 20px;
	}
	#head-right .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 25px;
    height: 25px;
    line-height: 25px;
  }
  #head-right .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #head-right .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
  }
  #head-right .avatar {
    width: 25px;
    height: 25px;
    display: block;
  }
  #foot{
    padding-top: 40px;
    height: 180px;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    background: #444547;
    font-size: 12px;
  }
  #foot i{
  	    font-size: 42px;
	    color: gray;
	    font-family: webfont;
	    speak: none;
	    font-style: normal;
	    font-weight: 400;
	    font-variant: normal;
	    text-transform: none;
	    line-height: 1;
	    font-size: 16px;
	    position: relative;
	    vertical-align: 0;
		-webkit-font-smoothing: antialiased;
  }
  #foot p{
  	    color: #777;
    	line-height: 24px;
  }
  #foot p a{
  	    color: #777;
    	line-height: 24px;
  }
</style>