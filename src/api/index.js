/**
 * 请求的方法
 */
import axios from 'axios'
import base from './base'
//node>js 
const qs = require('querystring')

const api = {

    //登陆接口
    getLogin(params){ //params={username:'',password:''}
        return axios.post(base.login,qs.stringify(params))
    },
   
    /**
     * 初始化商品列表
     */
    getGoodsList(params) {//{page:xx}
        return axios.get(base.goodsList,{params})
},
    //商品搜索
    getSearch(params){ //{search:xx}
        return axios.get(base.goodsList,{params})
    },
    //获取类目选择{cid:xxxx}
    getSelectCategory(params){
        return axios.get(base.selectCategory,{params})
    },
    //添加商品
    addGoods(params){  //参数： title cid  category sellPoint price num descs paramsInfo image
        return axios.get(base.addGoods,{
            params
        })
    },
    //删除商品
    deleteGoods(params){  // 参数  id
        return axios.get(base.deleteGoods,{
            params
        })
    },
    //更新商品
    updateGoods(params){  //参数： title cid  category sellPoint price num descs paramsInfo image
        return axios.get(base.updateGoods,{
            params
        })
    }
}  

export default api
