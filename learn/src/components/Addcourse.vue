<template>
	<div id="addcourse">
		<h2>添加课程</h2>
		<p>一级分类</p>
		<select class="fContent" v-on:change="first" v-model="fID">
			<option value="1">IT.互联网</option>
			<option value="2">电商.营销</option>
			<option value="3">兴趣.生活</option>
		</select>
		<p>二级分类</p>
		<select class="sContent" v-model="sID" v-on:change="second">
			<option v-for="(item,i) in course" :value="item.sid">{{item.secondcontent}}</option>
		</select>
		<p>课程图片路径</p>
		<input type="text" v-model="img"/>
		<p>课程描述</p>
		<input type="text" v-model="desc"/>
		<p>课程价格</p>
		<input type="text" v-model="price"/>
		<p>课程章节</p>
		<input type="text" v-model="topic"/>
		<p>课程视频路径</p>
		<input type="text" v-model="video"/>
		<button @click="add()">添加</button>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		inject:['reload'],
		name:'Addcourse',
		data(){
			return{
				course:[],
				fID:'',
				sID:'',
				img:'',
				desc:'',
				price:'',
				topic:'',
				video:''
			}
		},
		methods:{
			//添加课程
			add(){
				var _this=this;
				var obj={};
				obj.id=Date.now()
				if (this.fID!=""&&this.sID!=""&&this.img!=""&&this.desc!=""&&this.topic!=""&&this.video!="") {
					axios({
						url:'http://localhost:3000/addCourse',
						params:{
							fid:_this.fID,
							sid:_this.sID,
							cid:obj.id,
							cimg:_this.img,
							cdesc:_this.desc,
							cprice:_this.price,
							mid:obj.id,
							name:_this.topic,
							video:_this.video
						}
					}).then(function(data){	
						alert(data.data);
						_this.reload();
					})
				}else{
					alert("不能为空");
				}
			},
			first(){
				var _this=this;
				//获取一级ID下的分类集合
				axios({
					url:'http://localhost:3000/fenlei'
				}).then(function(data){
	//				console.log(data.data[_this.fID].second)
					_this.course=data.data[_this.fID-1].second
				})
			}
		}
	}
</script>

<style scoped>
	#addcourse select{
		width: 95%;
		height: 35px;
		float: left;
		display: block;
	}
	#addcourse p{
		float: left;
		line-height: 30px;
	}
	#addcourse input{
		width: 95%;
		height: 30px;
		display: block;
		float: left;
	}
	#addcourse button{
		float: left;
		width: 100px;
		height: 40px;
		border: 0;
		background: #ccc;
		border-radius: 5px;
		margin-top: 20px;
		margin-left: 200px;
	}
</style>