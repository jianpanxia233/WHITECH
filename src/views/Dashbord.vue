<template>
    <el-container>
        <el-aside width="15%">
            <el-menu :default-active="$route.path ? $route.path : '/dashbord'" router>
                <el-menu-item index="/dashbord">
                    <i class="el-icon-user"></i>
                    <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="/dashbord/follow">
                    <i class="el-icon-zoom-in"></i>
                    <span slot="title">关注/粉丝</span>
                </el-menu-item>
                <el-menu-item index="/dashbord/password">
                    <i class="el-icon-setting"></i>
                    <span slot="title">修改密码</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
  background-color: rgb(247, 243, 243);
}

.el-container {
    overflow: hidden;
    background-color: rgb(247, 243, 243);
}

.el-main {
  overflow: auto;
}
</style>