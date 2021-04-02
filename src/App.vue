<template>
  <defaultLayout/>
</template>

<script>
import defaultLayout from './layouts/Default.vue';
export default {
  components: {
    defaultLayout
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}
a {
  text-decoration: none;
}
ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

// 其他全局定义
.success {
  background: #f0f9eb;
}
.info {
  background: #d9d9d9;
}
.primary {
  background: #409eff;
}
.error {
  background: #f56c6c;
}
</style>
