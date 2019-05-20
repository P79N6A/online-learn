<template>
	<div id="collect">
		<h3>我的课程收藏</h3>
		<ul v-if="collectlist.length>0">
			<li v-for="(item,i) in collectlist">
				<router-link :to="'/detail/'+item.id">				
					<div class="course">
						<img :src="item.img" />
						<p>{{item.desc}}</p>
					</div>
					<p class="price" v-if="item.price>0">￥<span>{{item.price}}</span></p>
					<p class="price" v-else=""><span>{{item.price}}</span></p>
				</router-link>
				<button @click="del(item.id,i)">删除</button>
			</li>
		</ul>
		<p v-else="" class="tishi">您还没有收藏过课程哦！快去找些感兴趣的吧</p>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		name:'Collect',
		data(){
			return{
				collectlist:[]
			}
		},
		methods:{
			//删除收藏课程
			del(id,i){
				var _this=this;
				axios({
					url:'http://localhost:3000/del-collect',
					params:{id:id}
				}).then(function(data){
					_this.collectlist.splice(i,1)
				})
			}
		},
		mounted(){
			//收藏展示
			var _this=this;
			axios({
				url:'http://localhost:3000/collectlist'
			}).then(function(data){
				_this.collectlist=data.data;
			})
		}
	}
</script>

<style scoped>
	#collect h3{
		height: 40px;
		border-bottom: 1px solid #ccc;
		line-height: 40px;
	}
	#collect li{
		height: 50px;
		border-bottom: 1px solid #ccc;
		padding: 20px 0;
	}
	#collect li .course{
		float: left;
		margin-left: 20px;
	}
	#collect li .course img{
		width: 100px;
		height: 50px;
		float: left;
		margin-right: 20px;
	}
	#collect li .course p{
		float: left;
		font-size: 14px;
		color: #000;
		font-weight: 700;
		width: 300px;
		line-height: 20px;
	}
	#collect li .price{
		float: left;
		color: red;
		height: 50px;
		width: 40px;
		line-height: 50px;
	}
	#collect li button{
		float: right;
		width: 50px;
		height: 30px;
		border: 0;
		border-radius: 5px;
		background: red;
		color: #fff;
		margin-top: 10px;
		margin-right: 60px;
		outline: none;
	}
	#collect .tishi{
		font-size: 25px;
		color: #999;
		text-align: center;
		line-height: 300px;
		height: 300px;
	}
</style>