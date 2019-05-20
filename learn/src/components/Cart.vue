<template>
	<div id="cart">
		<div class="cart-title">
			<h2>我的购物车</h2>
		</div>
		<div id="cart-content">
			<div class="cart-con">
				<div v-if="cartlist.length>0">
					<div class="thead">
						<input type="checkbox" v-model="checkAll" @change="changeAll()"/>全选
						<span>课程</span>
						<span>金额</span>
						<span>操作</span>
					</div>
					<div class="youhui"><i>满</i>满299减30，满499减60</div>
					<ul class="course-list">
						<li v-for="(item,i) in cartlist">
							<input type="checkbox" v-model="item.selected" @change="changeItem()"/>
							<div class="course">
								<img :src="item.img" />
								<p>{{item.desc}}</p>
							</div>
							<p>￥<span>{{item.price}}</span></p>
							<button @click="del(item.id,i)">删除</button>
						</li>
					</ul>
				</div>
				<p v-else="" class="tishi">购物车空空如也</p>
			</div>
			<div class="zhifu">
				<p>总金额：￥<span>{{sum}}</span></p>
				<button @click="zhifu">支付</button>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		inject:['reload'],
		name:'Cart',
		data(){
			return{
				cartlist:[],
				checkAll:false
			}
		},
		mounted(){
			//购物车列表
			var _this=this;
			axios({
				url:'http://localhost:3000/cartlist'
			}).then(function(data){
				_this.cartlist=data.data
			})
		},
		methods:{
			//全选
			changeAll(){
				var _this=this;
				this.cartlist.map((item,i)=>{
					item.selected=_this.checkAll;
				})
			},
			//单个选项
			changeItem(){
				var arr=this.cartlist.filter((item,i)=>{
					return item.selected==true;
				})
				arr.length==this.cartlist.length?this.checkAll=true:this.checkAll=false;
			},
			//删除
			del(id,i){
				var _this=this;
				axios({
					url:'http://localhost:3000/del-cart',
					params:{id:id}
				}).then(function(data){
					//保证页面数据删除
					_this.cartlist.splice(i,1)
					_this.reload()
				})
			},
			zhifu(){
				var _this=this;
				var arr=this.cartlist.filter((item,i)=>{
					return item.selected==true;
				})
				if (arr.length<=0) {
					alert("请先选择所要购买的课程")
				}else{
					if (confirm("确定购买？")) {
						arr.map(function(items,index){
							axios({
								url:'http://localhost:3000/del-cart',
								params:{id:items.id}
							}).then(function(data){
								//保证页面数据删除
								alert("购买成功，请进入订单查看！");
								_this.cartlist.splice(index,1);
								axios({
									url:'http://localhost:3000/pay',
									params:{id:items.id}
								}).then(function(data){
									console.log(data)
								})
								_this.reload()
							})
						})
					}
				}
			}
		},
		computed:{
			//计算总价
			sum(){
				var sumPrice=0;
				this.cartlist.map((item)=>{
					if (item.selected==true) {
						sumPrice+=parseInt(item.price);
					}
				})
				if (sumPrice>=299) {
					sumPrice-=30;
				}else if (sumPrice>=499) {
					sumPrice-=60;
				}
				return sumPrice.toFixed(2);
			}
		}
	}
</script>

<style scoped>
	#cart{
		width: 100%;
	}
	#cart .cart-title{
		width: 100%;
		height: 100px;
		background: #CCCCCC;
	}
	#cart .cart-title h2{
		width: 1200px;
		height: 100px;
		margin: 0 auto;		
		line-height: 100px;
		font-size: 30px;
		font-weight: normal;
		color: #333;
		text-align: center;
	}
	#cart #cart-content{
		width: 100%;
		background: #E6E6E6;
		min-height: 600px;
		_height:600px;
		margin-bottom: 80px;
	}
	#cart #cart-content .cart-con{
		width: 1120px;
		background: #fff;
		margin: 0 auto;
		padding: 0 40px;
		min-height: 500px;
		_height:500px;
		border-radius: 10px;
	}
	#cart #cart-content .cart-con .tishi{
		width: 1000px;
		font-size: 30px;
		text-align: center;
		color: #999;
		margin: 0 auto;
		line-height: 300px;
	}
	#cart .cart-con .thead{
		height: 70px;
		width: 100%;
		border-bottom: 2px solid #ccc;
		padding-top: 30px;
	}
	#cart .cart-con .thead input{
		width: 20px;
		height: 20px;
	}
	#cart .cart-con .thead span{
		color: #333;
		font-size: 16px;
	}
	#cart .cart-con .thead span:first-of-type{
		margin: 0 650px 0 60px;
	}
	#cart .cart-con .thead span:nth-of-type(2){
		margin-right: 165px;
	}
	#cart .cart-con .youhui{
		width: 100%;
		height: 40px;
		color: red;
		border-bottom: 1px solid red;
		line-height:40px;
		font-size: 12px;
	}
	#cart .cart-con .youhui i{
		width: 23px;
		height: 23px;
		background: red;
		border-radius: 50%;
		color: #fff;
		display: inline-block;
		margin-top: 10px;
		font-size: 12px;
		line-height: 23px;
		text-align: center;
		font-style: normal;
		margin-right: 15px;
	}
	#cart .cart-con .course-list li{
		height: 100px;
		border-bottom: 1px solid #ccc;
		padding: 20px 0;
	}
	#cart .cart-con .course-list li input{
		width: 20px;
		height: 20px;
		float: left;
		margin-top: 35px;
	}
	#cart .cart-con .course-list li .course{
		float: left;
		margin-left: 60px;
	}
	#cart .cart-con .course-list li .course img{
		width: 150px;
		height: 100px;
		float: left;
		margin-right: 20px;
	}
	#cart .cart-con .course-list li .course p{
		float: left;
		font-size: 20px;
		color: #000;
		font-weight: 700;
		width: 535px;
		line-height: 35px;
	}
	#cart .cart-con .course-list li>p{
		float: left;
		color: red;
		margin-top: 45px;
	}
	#cart .cart-con .course-list li button{
		float: right;
		width: 50px;
		height: 30px;
		border: 0;
		border-radius: 5px;
		background: red;
		color: #fff;
		margin-top: 40px;
		margin-right: 60px;
	}
	#cart .zhifu{
		width: 100%;
		height: 60px;
		padding-top: 20px;
		position: fixed;
		bottom: 0;
		background: #fff;
		margin: 0 auto;
		border-top: 1px solid #ccc;
	}
	#cart .zhifu p{
		width: 980px;
		text-align: right;
		display: inline-block;
		color: red;
		margin-left: 100px;
	}
	#cart .zhifu p span{
		width: 150px;
		display: inline-block;
		text-align: left;
	}
	#cart .zhifu button{
		width: 100px;
		height: 50px;
		color: #fff;
		text-align: center;
		line-height: 30px;
		background: red;
		border: 0;
		border-radius: 3px;
	}
</style>