<template>
	<div id="list">
		<div class="sList">
			<h4 class="fen">分类:</h4>
			<ul>
				<li v-for="(item,i) in fenlei" :key=i>
					<router-link :to="'/list/'+firstID+'/'+item.sid" @click.native="refresh">{{item.secondcontent}}</router-link>
				</li>
			</ul>
		</div>
		<div class="tList">
			<ul>
				<li v-for="(items,i) in lists" :key=i>
					<router-link :to="'/detail/'+items.cid">
						<img :src="items.cimg" />
						<h6>{{items.cdesc}}</h6>
						<p v-if="items.cprice>0">￥{{items.cprice}}</p>
						<p v-else="">{{items.cprice}}</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		inject:['reload'],
		name:'List',
		data(){
			return{
				fenlei:[],
				lists:[],
				firstID:''
			}
		},
		methods:{
			refresh:function(){
				this.reload();
			}
		},
		mounted(){
			//相关课程的展示
			var _this=this;
			var fid=this.$route.path.split('/')[2];
			var sid=parseInt(this.$route.path.split('/')[3]);
			this.firstID=parseInt(fid)
			axios({
				url:'http://localhost:3000/lists',
				params:{fid:fid}
			}).then(function(data){
				_this.fenlei=data.data[0].second;
				_this.lists=data.data[0].second[sid-1].course;
			})
		}
	}
</script>

<style scoped>
	#list{
		min-height: 400px;
		_height:400px;
		width: 1200px;
		margin: 0 auto;
	}
	#list .sList{
		border-bottom: 1px solid #CCCCCC;
		width: 100%;
		overflow: hidden;
	}
	#list .sList .fen{
		width: 100px;
		color: #999;
		text-align: left;
		float: left;
		padding-top: 20px;
	}
	#list .sList ul{
		float: left;
		width: 1000px;
	}
	#list .sList li{
		float: left;
		margin: 20px;
		
	}
	#list .tList ul{
		display: flex;
		flex-wrap: wrap;
		width: 1000px;
		margin: 0 auto;
	}
	#list .tList ul li{
		width: 220px;
    	height: 200px;
    	border: 1px solid #ccc;
    	margin: 20px 4px;
    	padding: 10px;
    	position: relative;
    	overflow: hidden;
    	border-radius: 8px;
	}
	#list .tList ul li img{
		width: 220px;
    	height: 130px;
	}
	#list .tList ul li:hover{
		box-shadow: 3px 3px 3px #ccc;
	}
	#list .tList ul li h6{
		font-size: 14px;
    	line-height: 20px;
    	color: #333;
    	margin-top: 10px;
	} 
	#list .tList ul li p{
     	font-size: 14px;
     	margin-top: 10px;
     	color: red;
     	position: absolute;
     	bottom: 10px;
    }
</style>