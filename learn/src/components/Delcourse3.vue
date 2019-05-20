<template>
	<div id="delcourse3">
		<h2>课程删除</h2>
		<table width="1000" border="1px solid #ccc" cellspacing="0" v-for="(fItem,index) in courses">
			<tr>
				<th colspan="4" style="height: 35px;">{{fItem.secondcontent}}</th>
			</tr>
			<tr>
				<th>课程描述</th>
				<th>价格</th>
				<th>视频</th>
				<th>操作</th>
			</tr>
			<tr v-for="(item,i) in fItem.course"> 
				<td style="width: 400px;">{{item.cdesc}}</td>
				<td style="width: 60px;">{{item.cprice}}</td>
				<td>{{item.cvideo}}</td>
				<td><button @click="del(fItem.sid,item.cid,index,i)">删除</button></td>
			</tr>
		</table>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		data(){
			return{
				courses:[]
			}
		},
		methods:{
			//删除课程
			del(sid,cid,index,i){
				var _this=this;
				if (confirm("确定删除吗？")) {
					axios({
						url:'http://localhost:3000/delCourse',
						params:{fid:3,sid:sid,cid:cid}
					}).then(function(data){
						alert(data.data)
						_this.courses[index].course.splice(i,1);
					})
				}
			}
		},
		mounted(){
			//内容展示
			var _this=this;
			axios({
				url:'http://localhost:3000/fenlei'
			}).then(function(data){
				_this.courses=data.data[2].second
			})
		}
	}
</script>

<style scoped>
	#delcourse3 h2{
		margin-bottom: 20px;
	}
	#delcourse3 button{
		width: 60px;
		height: 50px;
	}
</style>