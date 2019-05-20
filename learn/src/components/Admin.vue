<template>
	<div id="admin">
		<el-container>
		  <el-header>后台管理</el-header>
		  <el-main>
		  	<el-container style="height: 500px; border: 1px solid #eee">
			  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
			    <el-menu :default-openeds="['1', '3']">
			      <el-submenu index="1">
			        <template slot="title"><i class="el-icon-message"></i>导航一</template>
			        <el-menu-item-group>
			          <router-link to="/addcourse"><el-menu-item index="1-1">添加课程</el-menu-item></router-link>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="2">
			        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
			        <el-menu-item-group>
			        	 <template slot="title">删除课程</template>
			          <router-link to="/delcourse1" tag="p"><el-menu-item index="2-1">IT.互联网</el-menu-item></router-link>
			          <router-link to="/delcourse2" tag="p"><el-menu-item index="2-1">电商.营销</el-menu-item></router-link>
			          <router-link to="/delcourse3" tag="p"><el-menu-item index="2-1">兴趣.生活</el-menu-item></router-link>
			        </el-menu-item-group>
			      </el-submenu>
			    </el-menu>
			  </el-aside>
			  <el-container>
			    <el-header style="text-align: right; font-size: 12px">
			      <el-dropdown>
			        <i class="el-icon-setting" style="margin-right: 15px"></i>
			        <el-dropdown-menu slot="dropdown">
			          <el-dropdown-item><span @click="tc()">退出登录</span></el-dropdown-item>
			        </el-dropdown-menu>
			      </el-dropdown>
			      <span>{{admin}}</span>
			    </el-header>
			    <el-main>
			      <router-view></router-view>
			    </el-main>
			  </el-container>
		  	</el-container>
		  </el-main>
		</el-container>
	</div>
</template>

<script>
	export default{
		name:'Admin',
		inject:['reload'],
		data(){
			return{
				admin:''
			}
		},
		methods:{
			tc(){
				console.log("11")
				sessionStorage.removeItem("managename");
		  		this.$router.push("/login")
		  		this.reload();
			}
		},
		mounted(){
			this.admin=sessionStorage.getItem("managename")
		}
	}
</script>

<style>
	.el-header, .el-footer {
	    background-color: #B3C0D1;
	    color: #333;
	    text-align: center;
	    line-height: 60px;
  	}
  	.el-main {
	    background-color: #E9EEF3;
	    color: #333;
	    text-align: center;
	    min-height: 500px;
	    _height:500px;
  	}
</style>