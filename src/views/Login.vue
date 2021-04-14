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
                <div class="mobiletext">
                  <el-input v-model="loginUserInfo.mobile" placeholder="请输入手机号"></el-input>
                  <el-button slot="append" v-show="showTime" @click="sendtext()">发送验证码</el-button>
                  <el-button slot="append" v-show="!showTime" >{{sendTime}}秒</el-button>
                </div>
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
        loading: false,
        showTime: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        sendTime: '', /* 倒计时 计数器 */
        timer: null,
      }
    },
    methods: {
      handleClick(tab,event){
        console.log(tab,event)
      },
      sendtext() {
          const TIME_COUNT = 60; //  更改倒计时时间
          if (!this.timer) {
            this.sendTime = TIME_COUNT;
            this.showTime = false
            this.timer = setInterval(() => {
              if(this.sendTime == 60){
                this.$http.get(`/sms/login/${this.loginUserInfo.mobile}`)
                this.sendTime--
              }
              else if (this.sendTime > 0 && this.sendTime < TIME_COUNT) {
                this.sendTime--; 
              } else {
                this.showTime = true;
                clearInterval(this.timer); // 清除定时器
                this.timer = null;
              }
            }, 1000);
          }
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
                if(result.initStatus !== '2'){
                  Cookies.set(initstatus,'unfinish')
                }
                let preroute = localStorage.getItem('preRoute')
                this.$router.push(preroute=='/login'?'/home' : preroute)
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
    .mobiletext {
      display: flex;
      justify-content: space-around;
    }
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