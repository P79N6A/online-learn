<template>
	<div id="manage">
		<el-container style="height: 500px; border: 1px solid #eee">
		  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
		    <el-menu :default-openeds="['1', '3']">
		      <el-submenu index="1">
		        <template slot="title"><i class="el-icon-message"></i>导航一</template>
		        <el-menu-item-group>
		          <router-link to="/order"><el-menu-item index="1-1">订单</el-menu-item></router-link>
		        </el-menu-item-group>
		      </el-submenu>
		      <el-submenu index="2">
		        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
		        <el-menu-item-group>
		          <router-link to="/collect"><el-menu-item index="2-1">收藏</el-menu-item></router-link>
		        </el-menu-item-group>
		      </el-submenu>
		      <el-submenu index="3">
		        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
		        <el-menu-item-group>
		          <router-link to="/personal"><el-menu-item index="3-1">个人信息</el-menu-item></router-link>
		          <router-link to="/updatepwd"><el-menu-item index="3-2">修改密码</el-menu-item></router-link>
		        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>
		  </el-aside>
		  
		  <el-container>
		    <el-header style="text-align: right; font-size: 12px">
		      <el-dropdown>
		        <i class="el-icon-setting" style="margin-right: 15px"></i>
		      </el-dropdown>
		      <span>{{username}}</span>
		    </el-header>
		    
		    <el-main>
		      <router-view></router-view>
		    </el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	export default{
		name:"Manage",
		data(){
			return{
				username:''
			}
		},
		mounted(){
			this.username=sessionStorage.getItem("username");
		}
	}
</script>

<style scoped>
	#manage{
		width: 1000px;
		margin: 0 auto;
	}
	#manage .el-header {
	    background-color: #B3C0D1;
	    color: #333;
	    line-height: 60px;
	  }
	  
	#manage  .el-aside {
	    color: #333;
	  }
</style>