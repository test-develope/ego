<template>
   <div>
        <div class="header" >
            <i v-show="!isCollapse" @click="ChageNavMenu" class="el-icon-s-fold"></i>
            <i v-show="isCollapse" @click="ChageNavMenu" class="el-icon-s-unfold"></i>
            <div class="header-right">
                <div class="menuss">    
                    <!-- <el-dropdown>
                        <span class="el-dropdown-link" style="color:#fff">
                            多语言<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>简体中文</el-dropdown-item>
                            <el-dropdown-item>English</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                </div>
                <div class="user">
                    欢迎：{{userinfo.user}}   
                </div>
                <div class="userimg">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link" style="color:#fff">
                            <el-avatar shape="circle"  :size="45" :src="circleUrl" ></el-avatar>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">修改信息</el-dropdown-item>
                            <el-dropdown-item command="loginout">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    <!-- 内容区域   路由出口-->
        <div class="content" >
            <router-view/>
        </div>
   </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name:'con_tent',
    data(){
        return{
            circleUrl:"http://localhost:8989/1650722365091-7.jpg"
        }
    },
    computed:{
        ...mapState(['isCollapse']),
        ...mapState('loginModule',['userinfo'])
    },
    methods:{
        ...mapMutations(['ChageNavMenu']),
        ...mapMutations('loginModule',['clearUser']),
        loginout(){
            //退出登陆
            //清空vuex数据
            this.clearUser()
            //清空本地存储
            localStorage.removeItem('user')
            //返回登陆
            this.$router.push('/login')
        },
        //下拉框触发事件
        handleCommand(command) {
            if(command==='loginout'){
                this.loginout()
            }
      }

    },
    mounted(){

    }
}
</script>

<style  scoped>
.header{
    height: 60px;
    background-color:rgba(50, 72, 90, 0.836);
}

.header .el-icon-s-fold{
    font-size: 26px;
}

.header .el-icon-s-unfold{
    font-size: 26px;
}
.header-right{
    float: right;
    padding-right: 70px;
    display: flex;
}

.header-right .user{
    margin-right: 40px;
    margin-top: 18px;
    color: #fff;
    font-size: 18px;
}
.header-right .userimg{
    margin-right: 10px;
    margin-top: 8px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>>

