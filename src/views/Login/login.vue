<template>
  <div class="login-bacc">
      <div class="login-box">
        <h3 class="title">后台管理系统</h3>
        <el-form 
        :model="loginForm" 
        status-icon 
        :rules="rules"
         ref="ruleForm" 
         label-width="60px" 
         class="demo-ruleForm"
         >
        <el-form-item label="账号" prop="username" class="aaaa">
          <el-input type="text" v-model="loginForm.username" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="bbbb">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="cccc">提交</el-button>
          <el-button @click="resetForm('ruleForm')" class="dddd">重置</el-button>
        </el-form-item>
      </el-form>
      </div>
  </div>
</template>

<script>
import jwt from 'jwt-decode'
import {mapMutations}  from 'vuex'

export default {
    data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        info:'',
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: validateUser, trigger: 'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      ...mapMutations('loginModule',['setUser']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {username,password}=this.loginForm
            //请求登陆接口，实现登陆
            this.$api.getLogin({
                username,password
            }).then(res=>{
              console.log('---------',res.data);
              if(res.data.status===200){
                  console.log(jwt(res.data.data));
                  //登陆成功： 1.存储登陆信息  2.跳转网页  3.顶部区域显示用户信息
                  // 4.数据持久化
                  let userObj={
                    user:jwt(res.data.data).username,
                    token:res.data.data
                  }
                  this.setUser(userObj)
                  //存储本地
                  localStorage.setItem('user',JSON.stringify(userObj))
                  //跳转
                  this.$router.push('/')
              }else{
                //账号密码错误
                this.$message.error('账号密码错误，请重新输入');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    beforeCreate(){
      console.log('sss',document.querySelector('body'));
        document.querySelector('body').classList.add("loginBgc");
    },
    beforeDestroy(){
      document.querySelector("body").classList.remove("loginBgc")
    }
  }
</script>

<style>
.loginBgc{
  width: 100%;
  height: 100%;
  background-image:url('../../../public/img/12.png') ;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>

<style scoped>
.login-box{
  width: 450px;
  height: 350px;
  padding: 20px;
  margin-top: 13%;
  margin-left: 57%;
  border-radius: 10px;
  border: 1px solid #eee;
  background-color: #fff;
}
.title{
  margin-bottom: 30px;
  text-align: center;
  color: #666;
}

.aaaa{
  margin-top: 10%;
  margin-left: 10%;
}

.bbbb{
  margin-top: 10%;
  margin-left: 10%;
}

.cccc{
  margin-top: 10%;
  margin-left: 17%;
}

.dddd{
  margin-top: 10%;
  margin-left: 17%;
}
</style>>
