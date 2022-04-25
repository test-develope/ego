import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index'
import Layout from '../views/Layout/index'
import Login from '../views/Login/login'
import store from '../store/index'
//异步加载
const Goods=()=>import('../views/Goods/Goods')
const Params=()=>import('../views/Params/Params')
const Advert=()=>import('../views/Advert/Advert')
const Order=()=>import('../views/Order/index')
const OrderBack=()=>import('../views/Order/OrderBack/index')
const OrderList=()=>import('../views/Order/OrderList/index')

//子级路由
const AddGoods=()=>import('../views/Goods/AddGoods.vue')

Vue.use(VueRouter)

const routes=[
    {
        path:'',
        component:Layout,
        //路由元信息
        meta:{
            isLogin:true
        },
        children:[
            {
                path:'/',
                name:'Home',
                component:Home
            },
            {
                path:'/goods',
                name:'Goods',
                component:Goods
            },
            {
                path:'add-goods',
                name:'AddGoods',
                component:AddGoods
            },
            {
                path:'/params',
                name:'Params',
                component:Params
            },
            {
                path:'/advert',
                name:'Advert',
                component:Advert
            },
            {
                path:'/order',
                name:'Order',
                component:Order,
                redirect:'/order/order-list',
                children:[
                    {
                        path:'order-list',
                        component:OrderList
                    },
                    {
                        path:'order-back',
                        component:OrderBack
                    }
                ]
            }
        ]
    },
    {
        path:'/login',
        name:'Login',
        component:Login
    }
]

const  router=new  VueRouter({
    routes
})

//获取vuex数据
//路由拦截
router.beforeEach((to,from,next)=>{
    //判断是否需要登陆
    // next()
    if(to.matched.some(ele=>ele.meta.isLogin)){
        //在判断用户已经登陆
        let token=store.state.loginModule.userinfo.token;
        if(token){
            next()
        }else{
          next('/login')  
        }
    }else{//不需要登陆
        next()
    }
})

export default router