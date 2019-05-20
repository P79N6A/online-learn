<template>
	<div id="video">
		<div class="video-top">
			<p>>>{{list.name}}</p>
		</div>
		<div class="top">
			<embed :src='list.video' allowFullScreen='true' quality='high' width='1000' height='500' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>
		</div>
		分享：<share :config="config" style="display: inline-block;"></share>
		<textarea placeholder="快来说说你的想法吧~" class="txt" v-model="txt"></textarea>
		<el-button type="primary" style="float: right;margin: 10px 25px 0 0;overflow: hidden;" @click="fabiao">发表评论</el-button>
		<div class="pinglun">
			<!--<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="100"
			  style="float: right;margin-top: 10px;">
			</el-pagination>-->
			<h3 class="pl">热门评论</h3>
			<ul class="evalList">
				<li v-for="(item,i) in evals">
					<img src="../assets/weibo.png" />
					<div class="content">
						<h4>{{item.username}}</h4>
						<p>{{item.content}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		inject:['reload'],
		name:'Video',
		data(){
			return{
				list:[],
				config:{
					url: 'http://www.baidu.com', // 网址，默认使用 window.location.href
					source:'学习乐园', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
					title: '学习梦工厂', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
					description: '学习乐园', // 描述, 默认读取head标签<meta name="description" content="PHP弱类型的实现原理分析" />
					image : '../assets/logo1.png', // 图片, 默认取网页中第一个img标签
					sites: ['qzone', 'qq', 'weibo','wechat'], // 启用的站点
					disabled: [], // 禁用的站点
					wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
					wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
				},
				txt:'',
				evals:[]
			}
		},
		methods:{
			fabiao(){
		    	var _this=this;
		    	if(this.txt!=""){
			    	if (sessionStorage.getItem("username")) {
				    	axios({
				    		url:'http://localhost:3000/add-evaluate',
				    		params:{id:_this.$route.params.id,username:sessionStorage.getItem("username"),content:_this.txt}
				    	}).then(function(data){
//				    		_this.reload();
				    	})
			    	}else{
			    		alert("你还没有登录哦！")
			    		_this.$router.push("/login")
			    	}
		    	}else{
		    		this.txt="内容不能为空"
		    	}
		    }
		},
		mounted(){
			var _this=this;
			/*var id=this.$route.path.split('/')[2]
			var mid=this.$route.path.split('/')[3]*/
			//视频展示
			axios({
				url:'http://localhost:3000/detail',
				params:{id:_this.$route.params.id}
			}).then(function(data){
				console.log(data.data[0].mulu[_this.$route.params.id-1])
				_this.list=data.data[0].mulu[_this.$route.params.id-1];
			})
			//评论展示
		  	axios({
		  		url:'http://localhost:3000/evaluatelist',
		  		params:{id:_this.$route.params.id}
		  	}).then(function(data){
		  		_this.evals=data.data[0].eval
		  	})
		},
		/*updated(){
			//评论展示
		  	axios({
		  		url:'http://localhost:3000/evaluatelist',
		  		params:{id:_this.$route.params.id}
		  	}).then(function(data){
		  		_this.evals=data.data[0].eval
		  	})
		}*/
	}
</script>

<style scoped>
	#video{
		width: 1000px;
		margin: 0 auto;
	}
	#video .video-top{
		height: 45px;
	}
	#video .txt{
		width: 95%;
		height: 100px;
		border: 1px solid #409EFF;
		margin-left: 18px;
		margin-top: 20px;
	}
	#video .pinglun{
		min-height: 200px;
		_height:200px;
		width: 100%;
		border-top: 1px solid #ccc;
		overflow: hidden;
		margin-top: 60px;
		background: #E6E6E6;
		border-radius: 10px;
	}
	#video .pinglun .pl{
		height: 30px;
		padding-left: 20px;
		line-height: 30px;
		font-size: 16px;
		width: 100%;
		overflow: hidden;
	}
	#video .pinglun .evalList{
		width: 100%;
	}
	#video .pinglun .evalList li{
		width: 90%;
		min-height: 150px;
		border: 1px solid #ccc;
		border-radius: 10px;
		background: #fff;
		margin: 15px 20px;
		padding: 10px 20px;
	}
	#video .pinglun .evalList li img{
		float: left;
		margin-left: 30px;
	}
	#video .pinglun .evalList li .content{
		float: left;
	}
</style>