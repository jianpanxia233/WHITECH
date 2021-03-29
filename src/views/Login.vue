<template>
  <div id="loginpage">
    <div class="logincontainer">
      <div id="loginPic">
        <img :src="require(`@/assets/loginPic.png`)" alt="loginPic">
      </div>
      <div id="login">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录" name="login">
              <el-form 
              class="login-form"
              :model="loginUserInfo"
              :rules="loginRules"
              auto-complete="on"
              lavel-position="left"
              >
              <el-form-item>
                <el-input v-model="loginUserInfo.username" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="loginUserInfo.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <el-form 
              class="login-form"
              :model="loginUserInfo"
              :rules="loginRules"
              auto-complete="on"
              lavel-position="left"
              >
              <el-form-item>
                <el-input v-model="loginUserInfo.username" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="loginUserInfo.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-button 
            :loading="loading"
            type="primary"
            @click.native.prevent="handleLogin"
            >{{activeName}}
            </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        activeName: 'login',
        loginUserInfo: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      handleClick(tab,event){
        console.log(tab,event)
      },
      handleLogin(){
        
      }
    }
}
</script>
<style lang="scss" scoped>
#loginpage {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .logincontainer {
      height: auto;
      width: auto;
      display: flex;
      justify-content: center;
      border:1px solid #202564;
      #loginPic {
        width: 30%;
        // background-image: linear-gradient(#090723,#202564);
        img {
          height: 100%;
          width: 100%;
          opacity: 0.6;
        }
      }
      #login {
        height: 100%;
        width: 70%;
        padding: 5px 40px;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }
}
</style>