<template>
	<div id="detail">
		<div id="detail-video">
			<div class="detail-left">
				<img :src="list.cimg" />
				<div class="mask">
					<span @click="watch(list.cid)"><i class="el-icon-caret-right"></i></span>
				</div>
			</div>
			<div class="detail-right">
				<h2>{{list.cdesc}}</h2>
				<div class="detail-right-pj">
					<ul>
						<li>好评度90%</li>
						<!--<li style="position: relative;">分享</li>-->
						<li><i class="el-icon-star-off" style="font-size: 18px;" @click="sc(list.cid)"></i>收藏</li>
					</ul>
					<div class="xue">支持随到随学，22年11月过期</div>
				</div>
				<div v-if="list.cprice>0" class="detail-right-btn">
					<p>￥{{list.cprice}}</p>
					<button @click="addCart">加入购物车</button>
					<button @click="buy()">立即购买</button>
				</div>
				<div v-else="" class="detail-right-btn">
					<p>{{list.cprice}}</p>
					<button @click="watch(list.cid)">立即观看</button>
				</div>
			</div>
		</div>
		<div id="introduce">
			<div class="intro-con">
				<div class="intro-left">
					<router-link :to="'/introduce/'+list.cid">课程介绍</router-link>
					<router-link :to="'/catalogue/'+list.cid">课程目录</router-link>
					<router-link :to="'/evaluate/'+list.cid">课程评价</router-link>
					<div>
						<router-view></router-view>
					</div>
				</div>
				<div class="intro-right">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		inject:['reload'],
		name:'Detail',
		data(){
			return{
				list:[],
				beforePath:''
			}
		},
		methods:{
			//点击观看
			watch(id){
				if(this.list.cprice>0){
					alert("请先购买")
				}else{
					this.$router.push("/video/"+id+'/1')
				}
			},
			//添加购物车
			addCart(){
				var _this=this;
				if (sessionStorage.getItem("username")) {
					axios({
						url:'http://localhost:3000/addCart',
						params:{id:_this.$route.params.id}
					}).then(function(data){
						alert(data.data);
						_this.reload();
					})
				}else{
					this.$router.push("/login");
				}
			},
			//购买
			buy(){
				var _this=this;
				if (sessionStorage.getItem("username")) {
					if (confirm("确定购买吗?")) {
						axios({
							url:'http://localhost:3000/pay',
							params:{id:_this.$route.params.id}
						}).then(function(data){
							alert(data.data);
							_this.reload();
						})
					}
				}else{
					this.$router.push("/login");
				}
			},
			//点击收藏
			sc(id){
				var _this=this;
				if (sessionStorage.getItem("username")) {
					axios({
						url:'http://localhost:3000/collect',
						params:{id:id}
					}).then(function(data){
						alert(data.data);
						_this.reload();
					})
				}else{
					alert("请先登陆");
				}
			}
		},
		beforeRouteEnter(to,from,next){
			next((vm)=>{
				vm.beforePath=from.path
			});
		},
		mounted(){
			var _this=this;
			//请求接口显示课程详情
			axios({
				url:'http://localhost:3000/detail',
				params:{id:_this.$route.params.id}
			}).then(function(data){
				_this.list=data.data[0];
			})
			this.$nextTick(()=>{
				console.log(this.beforePath)
				if (this.beforePath=="/home") {
					axios({
						url:'http://localhost:3000/detail',
						params:{id:_this.$route.params.id}
					}).then(function(data){
						_this.list=data.data[0];
					})
				}else{
					var fid=this.beforePath.split('/')[2];
					var sid=this.beforePath.split('/')[3];
					axios({
						url:'http://localhost:3000/detail1',
						params:{fid:fid,sid:sid,id:_this.$route.params.id}
					}).then(function(data){
						console.log(data.data[0].second[sid-1].course)
						data.data[0].second[sid-1].course.map(function(item,i){
							if (item.cid==_this.$route.params.id) {
//								console.log(item)
								_this.list=item;
							}
						})
					})
				}
			})
		},
	}
</script>

<style scoped="scoped">
	#detail{
		width: 100%;
		margin-top: 50px;
	}
	#detail-video{
		width: 1200px;
		height: 350px;
		margin: 0 auto;
	}
	#detail-video .detail-left{
		float: left;
		width: 600px;
		height: 100%;
		margin-right: 50px;
		position: relative;
	}
	#detail-video .detail-left img{
		width: 600px;
		height: 100%;
	}
	#detail-video .detail-left .mask{
		width: 600px;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.4);
	}
	#detail-video .detail-left .mask span{
		position: absolute;
		left: 40%;
		top: 40%;
		width: 70px;
		height: 70px;
		display: block;
		border: 7px solid #fff;
		border-radius: 50%;
	}
	#detail-video .detail-left .mask span i{
		position: absolute;
		left: 17%;
		top: 13%;
		font-size: 50px;
		color: #fff;
	}
	#detail-video .detail-right{
		float: left;
		width: 550px;
		height: 100%;
	}
	#detail-video .detail-right .detail-right-pj{
		width: 100%;
		overflow: hidden;
	}
	#detail-video .detail-right .detail-right-pj ul{
		overflow: hidden;
		height: 30px;
		margin: 10px;
		clear: both;
		line-height: 30px;
	}
	#detail-video .detail-right .detail-right-pj ul li{
		float: left;
		padding: 0 20px;
		border-right: 1px solid #ccc;
		color: #999999;
		font-size: 14px;
	}
	#detail-video .detail-right .detail-right-pj .xue{
		height: 50px;
		border: 1px solid #CCCCCC;
		line-height: 50px;
		padding-left: 20px;
	}
	#detail-video .detail-right .detail-right-btn{
		margin-top: 20px;
	}
	#detail-video .detail-right .detail-right-btn p{
		height: 40px;
		background: #E6E6E6;
		padding-left: 20px;
		font-size: 18px;
		line-height: 40px;
		color: red;
	}
	#detail-video .detail-right .detail-right-btn button{
		width: 130px;
		height: 50px;
		background: red;
		border: 0;
		border-radius: 10px;
		text-align: center;
		line-height: 50px;
		color: #fff;
		font-size: 18px;
		margin-top: 20px;
		margin-right: 20px;
		outline: none;
	}
	#introduce{
		width: 100%;
		background: #E6E6E6;
		padding-top: 20px;
	}
	#introduce .intro-con{
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}
	#introduce .intro-left{
		width: 860px;
		background: #fff;
		float: left;
	}
	#introduce .intro-left a{
		font-size: 20px;
		color: #333333;
		margin: 20px 30px;
		display: inline-block;
		padding-bottom: 10px;
	}
	#introduce .intro-left .router-link-active{
		color: red;
		border-bottom: 3px solid red;
	}
	#introduce .intro-right{
		float: right;
		width: 320px;
		height: 600px;
		background: #fff;
	}
</style>