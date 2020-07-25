import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("../views/home/Home")
const Category = () => import("../views/category/Category")
const Shopcart = () => import("../views/shopcart/Shopcart")
const Profile = () => import("../views/profile/Profile")
const Detail = () => import("../views/detail/Detail")
const Login = () => import("../views/login/Login")

import store from '../store'

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      needLogin: false
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      needLogin: false
    }
  },
  {
    path: '/shopcart',
    component: Shopcart,
    meta: {
      needLogin: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      needLogin: false
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      needLogin: false
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      needLogin: false
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//路由的导航守卫，配合vuex实现登录验证
router.beforeEach((to, from, next) => {
  if(to.meta.needLogin) {
    if(store.state.isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {  //必须要保证next()
    next()
  }
})

export default router