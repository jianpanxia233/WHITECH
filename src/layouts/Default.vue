<template>
  <div id="app">
    <header class="we-header" v-show="$route.name!=='login'&&$route.name!=='meetingroom'">
        <div class="we-header-content">
            <div class="we-header-main">
                <div class="we-header-title">WHITECH</div>
            </div>
            <nav class="we-header-nav">
                <router-link to="/home" class="fb-nav-item">
                首页
                </router-link>
                <router-link to="/activity" class="fb-nav-item">
                活动中心
                </router-link>
                <router-link to="/myacts" class="fb-nav-item">
                我的活动
                </router-link>
            </nav>
            <div class="we-header-addon">
                <el-button type="primary" @click="login()" v-if="!token">
                    登陆/注册
                </el-button>
                <div v-if="token">
                  <router-link to="/chats">
                  <span class="chat"><img src="@/assets/persons/chat.png" alt=""></span>
                  </router-link>
                  <el-dropdown @command="handleCommand" >
                    <span class="center"><img src="@/assets/persons/center.png" alt=""><i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="admin">
                      <router-link to="/dashbord">个人中心</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
            </div>
        </div>
    </header>
    <transition name="slide" mode="out-in">
        <router-view :key="$route.path" />
    </transition>
  </div>
</template>
<script>
import Cookies from 'js-cookie';
export default {
    watch: {
      $route(to) {
        if(to.name != 'login'){
          let token = Cookies.get(process.env.VUE_APP_COOKIE_KEY)
          if(token=='undefined'){ 
              this.token = null
          }
          else{
            this.token = token
          }
        }
      }
    },
    data() {
      return {
        token: undefined
      }
    },
    methods: {
      login() {
        this.$router.push(`/login`)
      },
      handleCommand(command){
        if(command== 'logout') {
          this.token = null
          Cookies.set(process.env.VUE_APP_COOKIE_KEY,'undefined')
          this.$router.push('/home')
        }
      }
    }
}
</script>
<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.we-header {
  background: #090723;
}
.we-header-main {
  display: flex;
  align-items: center;
  height: 100%;
}
.we-header-content {
    height: 80px;
    padding-left: 30px;
    padding-right: 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    a {
    font-size: 14px;
    color: white;
    text-decoration: none;
    padding: 0 35px;
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
    &.router-link-active {
      color: $color-success;
    }
  }
}
.we-header-title {
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.we-header-nav {
    display: flex;
    align-items: center;
}

.we-header-addon {
  display: flex;
  align-items: center;
  div {
    display: flex;
    justify-content: flex-end;
  }
  .chat {
    margin-right: 30px;
    cursor: pointer;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
  }
  .center {
    cursor: pointer;
    img {
      width: 30px;
      height: 27px;
    }
  }
  .el-icon-arrow-down {
    font-size: 12px;
    color: #fff;
  }
}
.selected {
  background-color: $color-primary;
  opacity: 0.6;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>