<template>
	<div id="home">
		<div class="block">
		    <el-carousel :interval="7000" type="card" height="300px">
		      <el-carousel-item v-for="(item,i) in swiper" :key="i">
		      	<img :src="item.banner_img_url" />
		      </el-carousel-item>
		    </el-carousel>
	    </div>
	    <div id="index-main">
	    	<!--一楼-->
	    	<div class="temai-con floor1">
				<div class="title floor1-title">
					IT.互/联/网
				</div>
				<div class="pic nvzhuang-pic">
					<ul class="pic-list nvzhuang-pic-list">
						<li v-for="(item,i) in list1">
							<router-link :to="'/detail/'+item.cid">
								<img :src="item.cimg" />
								<h6>{{item.cdesc}}</h6>
								<p v-if="item.cprice>0">￥{{item.cprice}}</p>
								<p v-else="">{{item.cprice}}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<!-- 二楼 -->
			<div class="temai-con floor2">
				<div class="title floor2-title">
					生/活/百/科
				</div>
				<div class="pic xiebao-pic">
					<ul class="pic-list xiebao-pic-list">
						<li v-for="(item,i) in list2">
							<router-link :to="'/detail/'+item.cid">
								<img :src="item.cimg" />
								<h6>{{item.cdesc}}</h6>
								<p v-if="item.cprice>0">￥{{item.cprice}}</p>
								<p v-else="">{{item.cprice}}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<!-- 三楼 -->
			<div class="temai-con floor3">
				<div class="title floor3-title">
					音/乐/天/堂
				</div>
				<div class="pic nanzhuang-pic">
					<ul class="pic-list nanzhuang-pic-list">
						<li v-for="(item,i) in list3">
							<router-link :to="'/detail/'+item.cid">
								<img :src="item.cimg" />
								<h6>{{item.cdesc}}</h6>
								<p v-if="item.cprice>0">￥{{item.cprice}}</p>
								<p v-else="">{{item.cprice}}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<!-- 四楼 -->
			<div class="temai-con floor4">
				<div class="title floor4-title">
					书/法/之/家
				</div>
				<div class="pic yundong-pic">
					<ul class="pic-list yundong-pic-list">
						<li v-for="(item,i) in list4">
							<router-link :to="'/detail/'+item.cid">
								<img :src="item.cimg" />
								<h6>{{item.cdesc}}</h6>
								<p v-if="item.cprice>0">￥{{item.cprice}}</p>
								<p v-else="">{{item.cprice}}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<!-- 五楼 -->
			<div class="temai-con floor5">
				<div class="title floor5-title">
					摄/影/乐/园
				</div>
				<div class="pic shipin-pic">
					<ul class="pic-list shipin-pic-list">
						<li v-for="(item,i) in list5">
							<router-link :to="'/detail/'+item.cid">
								<img :src="item.cimg" />
								<h6>{{item.cdesc}}</h6>
								<p v-if="item.cprice>0">￥{{item.cprice}}</p>
								<p v-else="">{{item.cprice}}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<!-- 楼梯 -->
			<div id="index-floorNav">
				<ul>
					<li>1F<span>IT</span></li>
					<li>2F<span>生活</span></li>
					<li>3F<span>音乐</span></li>
					<li>4F<span>书法</span></li>
					<li>5F<span>摄影</span></li>
					<li>TOP</li>
				</ul>
			</div>
	    </div>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		name: 'Home',
		data(){
			return{
				swiper:[],
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				list5:[]
			}
		},
		methods:{
			
		},
		mounted(){
			var _this=this;
			//轮播图
			axios({
				url:' http://jx.xuzhixiang.top/ap/api/bannerlist.php',
				params:{uid:1153}
			}).then(function(data){
				_this.swiper=data.data.data;
			})
			/*//课程展示
			axios({
				url:'http://localhost:3000/fenlei'
			}).then(function(data){
				console.log(data.data[0].second[0].course)
				_this.list1=data.data[2].second[2].course;
				_this.list2=data.data[2].second[3].course;
				_this.list3=data.data[2].second[4].course;
				_this.list4=data.data[2].second[5].course;
//				_this.list5=data.data[2].second[6].course;
				_this.fid1=data.data[0].fid;
				_this.fid2=data.data[2].fid;
			})*/
			//IT
			axios({
				url:'http://localhost:3000/courselist1'
			}).then(function(data){
				_this.list1=data.data;
			})
			//生活
			axios({
				url:'http://localhost:3000/courselist2'
			}).then(function(data){
				_this.list2=data.data;
			})
			//音乐
			axios({
				url:'http://localhost:3000/courselist3'
			}).then(function(data){
				_this.list3=data.data;
			})
			//书法
			axios({
				url:'http://localhost:3000/courselist4'
			}).then(function(data){
				_this.list4=data.data;
			})
			//摄影
			axios({
				url:'http://localhost:3000/courselist5'
			}).then(function(data){
				_this.list5=data.data;
			})
			//滚动条滚动事件
			var flag=true;
			$(window).scroll(function(){
				var sTop=$(window).scrollTop();
				if(sTop>250){
					$("#index-floorNav").show();
				}else{
					$("#index-floorNav").hide();
				}
				if(flag){
					$("#index-main .temai-con").each(function(){
						if (sTop>$(this).offset().top-$(this).outerHeight()/2) {
							$("#index-floorNav ul").find("li").eq($(this).index()).addClass("hover").siblings().removeClass("hover");
						}
					})
				}
			})
			//点击每个楼梯显示对应楼层
			$("#index-floorNav ul li:not(li:last-child)").click(function(){
				flag=false;
				$('html,body').animate({'scrollTop':$("#index-main .temai-con").eq($(this).index()).offset().top-90},300,function(){
					flag=true;
				})
				$(this).addClass("hover").siblings().removeClass("hover");
			})
			//点击回到顶部
			$("#index-floorNav ul li:last-child").click(function(){
				flag=false;
				$('html,body').stop().animate({'scrollTop':0},300,function(){
					flag=true;
				})
			})
		}
	}
</script>

<style scoped="scoped">
	.el-carousel__container{
		overflow: hidden;
	}
	.el-carousel__item img{
	    width: 100%;
	    height: 100%;
  	}

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
  
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    #index-main{
    	width: 1000px;
    	margin: 50px auto;
    	position: relative;
    }
    #index-main .temai-con{
    	margin-top: 30px;
    }
    #index-main .temai-con .title{
    	width: 300px;
    	margin: 0 auto;
    	text-align: center;
    	font-size: 25px;
    	line-height: 35px;
    	font-weight: 700;
    }
    #index-main .pic{
    	width: 100%;
    }
    #index-main .pic ul{
    	overflow: hidden;
    	width: 100%;
    }
    #index-main .pic ul li{
    	float: left;
    	width: 220px;
    	height: 200px;
    	border: 1px solid #ccc;
    	margin: 20px 4px;
    	padding: 10px;
    	position: relative;
    	overflow: hidden;
    	border-radius: 8px;
    }
    #index-main .pic ul li:hover{
    	box-shadow: 3px 3px 3px #ccc;
    }
    #index-main .pic ul li img{
    	width: 220px;
    	height: 130px;
    }
    #index-main .pic ul li h6{
    	font-size: 14px;
    	line-height: 20px;
    	color: #333;
    	margin-top: 10px;
    }
     #index-main .pic ul li p{
     	font-size: 14px;
     	margin-top: 10px;
     	color: red;
     	position: absolute;
     	bottom: 10px;
     }
     #index-main #index-floorNav{
		position: fixed;
		top: 150px;
		left: 50px;
		width: 50px;
		border: 1px solid #CECECE;
		display: none;
		background: #fff;
		border-radius: 5px;
	}
	#index-main #index-floorNav li{
		position: relative;
		width: 50px;
		height: 50px;
		border-bottom: 1px solid #CECECE;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		border-radius: 5px;
	}
	#index-main #index-floorNav span{
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 50px;
		height: 50px;
		background: red;
		color: white;
		border-radius: 5px;
		cursor: pointer;
	}
	#index-main #index-floorNav li:hover span,#index-main #index-floorNav li.hover span{
		display: block;
	}
	#index-main #index-floorNav li:last-child{
		background: red;
		color: white;
		border-bottom: none;
		cursor: pointer;
	}
     
</style>