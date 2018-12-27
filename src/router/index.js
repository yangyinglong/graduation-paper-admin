import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/authorize/Register'
import ForgotPass from '@/authorize/ForgotPass'
import UserCenter from '@/authorize/UserCenter'
import Center from '@/components/operation/Center'
import LabShow from '@/components/operation/center/labOper/LabShow'
import LabEdit from '@/components/operation/center/labOper/LabEdit'
import OrderShow from '@/components/operation/center/orderOper/OrderShow'
import OrderEdit from '@/components/operation/center/orderOper/OrderEdit'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/register',
    	name: 'Register',
    	component: Register
    },
    {
      path: '/forgotpass',
      name: 'ForgotPass',
      component: ForgotPass
    },
    {
      path: '/usercenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/center',
      name: 'Center',
      component: Center,
      meta: {authRequired: true}
    },
    {      
      path: '/labshow',
      name: 'LabShow',
      component: LabShow,
      meta: {authRequired: true}
    },
    {      
      path: '/labEdit',
      name: 'LabEdit',
      component: LabEdit,
      meta: {authRequired: true}
    },
    {     
      path: '/ordershow',
      name: 'OrderShow',
      component: OrderShow,
      meta: {authRequired: true}
    },
    {     
      path: '/orderedit',
      name: 'OrderEdit',
      component: OrderEdit,
      meta: {authRequired: true}
    }
  ]
})

router.beforeEach((to, from, next) => {    //判断是否需要登录拦截
  if (to.meta.authRequired) {        //存在token正常跳转
    if (sessionStorage.getItem('status') != 0) {
      next()
    } else {
      next({path: '/'})
      // next()
    }
  } else {
    next()
  }
})

export default router
