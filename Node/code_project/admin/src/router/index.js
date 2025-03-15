import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'// 登录页面
import MainBox from '../views/MainBox.vue'// 项目框架页面(主盒子)
import RoutesConfig from './config'
import store from '../store/index'



const routes = [
  {// 登录页面路由设置
    path:'/login',
    name:'login',
    component: Login
  },
  {// 项目框架页面(主盒子)路由设置
    path:'/mainbox',
    name:'mainbox',
    component: MainBox,

    // 嵌套路由(根据权限动态添加)
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to,from,next)=>{
  if(to.name==="login"){
    next()
  }else{
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
      
    }else{
      // 对vuex中的登录标志为进行判断(第一次登录位false)
      if (!store.state.isGetterRouter) {
        // 删除所有的嵌套路由(直接删除mainbox)
        router.removeRoute('mainbox')// 重新配置mainbox
        ConfigRouter()// 配置动态路由以及设置登录标志位
        next({// 让路由重新走一遍
          path: to.fullPath
        })
      }else{
        next()
      }
    }
  }
})

const ConfigRouter=()=>{
  RoutesConfig.forEach(item=>{
    router.addRoute("mainbox",item)
  })
  store.commit("changeGetterRouter",true)
}
export default router
