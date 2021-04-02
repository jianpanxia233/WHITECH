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
              <el-form-item prop="mobile">
                <el-input v-model="loginUserInfo.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input v-model="loginUserInfo.code" placeholder="请输入验证码"></el-input>
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
import Cookies from 'js-cookie';
export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('手机号不能为空'))
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value))
          if(reg.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入正确的手机号"))
          }
        }
      }
      return {
        activeName: 'login',
        loginUserInfo: {
          mobile: '',
          code: ''
        },
        loginRules: {
          mobile: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        loading: false
      }
    },
    methods: {
      handleClick(tab,event){
        console.log(tab,event)
      },
      handleLogin(){
        this.loading = true
        this.$http.post(`/user/login`,this.loginUserInfo)
            .then(result=>{
              if(result&&!result.code){
                Cookies.set(process.env.VUE_APP_COOKIE_KEY, result.accessToken, {
                  expires: 1,
                  sameSite: 'strict',
                });
                Cookies.set('IM_TOKEN',result.imToken)
                this.loading = false
                let preroute = localStorage.getItem('preRoute')
                this.$router.push(preroute=='/login'?'/home' : preroute)
              } else {
                this.loading = false
              }
            })
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