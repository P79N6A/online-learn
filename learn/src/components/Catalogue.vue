<template>
	<div id="catalogue">
		<ul>
			<li v-for="(item,i) in catalogueList" :key=i @click="toVideo(detailId,item.mid)">
				<!--<router-link :to="'/video/'+detailId+'/'+item.mid">{{item.name}}</router-link>-->
				{{item.name}}
			</li>
		</ul>	
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		name:'Catalogue',
		data(){
			return{
				detailId:'',
				detailPrice:'',
				catalogueList:[]
			}
		},
		methods:{
			//点击目录查看当前课程视频
			toVideo(id,mid){
				if (this.detailPrice>0) {
					alert("请先购买课程")
				}else{
					this.$router.push("/video/"+id+'/'+mid)
				}
			}
		},
		mounted(){
			//目录展示
			var _this=this;
			axios({
				url:'http://localhost:3000/detail',
				params:{id:_this.$route.params.id}
			}).then(function(data){
				_this.catalogueList=data.data[0].mulu
				_this.detailId=data.data[0].cid
				_this.detailPrice=data.data[0].cprice
			})
		}
	}
</script>

<style scoped>
	#catalogue{
		padding: 20px;
	}
	#catalogue ul li{
		padding: 20px;
		background: #E6E6E6;
		margin: 15px;
		border-radius: 10px;
		cursor: pointer;
	}
</style>