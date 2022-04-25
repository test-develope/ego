import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './modules/loginModule'

Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        isCollapse:false
    },
    mutations:{
        ChageNavMenu(state){
            state.isCollapse=!state.isCollapse
        }
    },
    actios:{
        
    },
    modules:{
        loginModule
    }
})

export default store