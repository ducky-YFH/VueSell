<template>
  <div id="app">
    <!-- 头部 -->
    <v-header :seller="seller"></v-header>
    <!-- 导航栏 -->
    <div class="tap">
      <div class="tap-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tap-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tap-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import header from 'components/header/header'
const ERR_OK = 0

export default {
  name: 'App',
  data () {
    return {
      seller: ' '
    }
  },
  components: {
    'v-header': header
  },
  methods: {},
  created () {
    this.$http.get('/api/seller').then(response => {
      if (response.body.errno === ERR_OK) {
        this.seller = response.body.data
      }
    })
  }
}
</script>

<style lang='scss' scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
.tap {
  height: 40px;
  line-height: 40px;
  display: flex;
  @include border-1px(#dee1e6);
  .tap-item {
    flex: 1;
    text-align: center;
    a {
      display: block;
    }
  }
}
.active {
  color: rgb(240, 0, 0);
}
</style>
