import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Detail from '@/components/Detail'
import Cart from '@/components/Cart'
import Introduce from '@/components/Introduce'
import Catalogue from '@/components/Catalogue'
import Evaluate from '@/components/Evaluate'
import Video from '@/components/Video'
import Manage from '@/components/Manage'
import Order from '@/components/Order'
import Collect from '@/components/Collect'
import Personal from '@/components/Personal'
import Updatepwd from '@/components/Updatepwd'
import List from '@/components/List'
import Admin from '@/components/Admin'
import Addcourse from '@/components/Addcourse'
import Delcourse1 from '@/components/Delcourse1'
import Delcourse2 from '@/components/Delcourse2'
import Delcourse3 from '@/components/Delcourse3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
    	path: '/main',
      redirect:'/home',
      component: Main,
      children:[
      	{
      		path: '/home',
		      name: 'Home',
		      component: Home
      	},
      	{
      		path: '/list/:id/:id',
		      name: 'List',
		      component: List
      	},
      	{
      		path: '/detail/:id',
      		name:'Detail',
      		redirect:'/introduce/:id',
		      component: Detail,
		      children:[
		      	{
		      		path:'/introduce/:id',
		      		component:Introduce
		      	},
		      	{
		      		path:'/catalogue/:id',
		      		component:Catalogue
		      	},
		      	{
		      		path:'/evaluate/:id',
		      		component:Evaluate
		      	}
		      ]
      	},
		    {
		      path: '/cart',
		      component: Cart
		    },
		    {
		      path: '/manage',
		      name:'Manage',
		      component: Manage,
		      children:[
		      	{
				      path: '/order',
				      component: Order
				    },
			      {
				      path: '/collect',
				      component: Collect
				    },
				    {
			      	path: '/personal',
				      component: Personal
				    },
				    {
			      	path: '/updatepwd',
				      component: Updatepwd
				    }
		      ]
		    }
      ]
    },
    {
      path: '/video/:id/:id',
      name: 'Video',
      component: Video
    },
    {
    	path:'/admin',
    	name:'Admin',
    	redirect:'/addcourse',
    	component:Admin,
    	children:[
    		{
    			path:'/addcourse',
    			name:'Addcourse',
    			component:Addcourse
    		},
    		{
    			path:'/delcourse1',
    			name:'Delcourse1',
    			component:Delcourse1
    		},
    		{
    			path:'/delcourse2',
    			name:'Delcourse2',
    			component:Delcourse2
    		},
    		{
    			path:'/delcourse3',
    			name:'Delcourse3',
    			component:Delcourse3
    		}
    	]
    }
  ]
})
