<template>
  <div id="evaluate">
		<textarea placeholder="快来说说你的想法吧~" class="txt" v-model="txt"></textarea>
		<el-button type="primary" style="float: right;margin: 10px 25px 0 0;overflow: hidden;" @click="fabiao">发表评论</el-button>
		<div class="pinglun">
			<h3 class="pl">热门评论</h3>
			<ul class="eval">
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
export default {
	inject:['reload'],
  name: 'Evaluate',
  data () {
    return {
    	txt: '',
    	evals:[]
    }
  },
  methods: {
  	//发表评论
    fabiao(){
    	var _this=this;
    	if(this.txt!=""){
	    	if (sessionStorage.getItem("username")) {
		    	axios({
		    		url:'http://localhost:3000/add-evaluate',
		    		params:{id:_this.$route.params.id,username:sessionStorage.getItem("username"),content:_this.txt}
		    	}).then(function(data){
		    		_this.reload();
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
  	//评论展示
  	var _this=this;
  	axios({
  		url:'http://localhost:3000/evaluatelist',
  		params:{id:_this.$route.params.id}
  	}).then(function(data){
  		console.log(data.data[0].eval)
			_this.evals=data.data[0].eval
  	})
  }
}
</script>

<style scoped>
	#evaluate .txt{
		width: 95%;
		height: 100px;
		border: 1px solid #409EFF;
		margin-left: 18px;
	}
	#evaluate .pinglun{
		min-height: 200px;
		_height:200px;
		width: 100%;
		border-top: 1px solid #ccc;
		overflow: hidden;
		margin-top: 60px;
	}
	#evaluate .pinglun .pl{
		height: 30px;
		padding-left: 20px;
		line-height: 30px;
		font-size: 16px;
		width: 100%;
		overflow: hidden;
	}
	#evaluate .pinglun .eval{
		max-height: 700px;
		overflow: auto;
	}
	#evaluate .pinglun .eval li{
		width: 90%;
		min-height: 80px;
		_height:80px;
		background: #E6E6E6;
		border-radius: 20px;
		margin: 20px;
		padding: 20px;
	}
	#evaluate .pinglun .eval li img{
		float: left;
		margin: 10px 20px 0 30px;
	}
	#evaluate .pinglun .eval li .content{
		float: left;
	}
	#evaluate .pinglun .eval li .content p{
		height: 40px;
		font-size: 14px;
		line-height: 40px;
	}
</style>