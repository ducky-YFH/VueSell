<template>
  <div class="shoppingCart">
    <!-- 左边 -->
    <div class="logoWrapper">
      <span
        class="logo iconfont icon-shoppingCart"
        :class="this.$store.state.foodCount !== 0 ? 'active' : '' "
      ></span>
      <span
        class="count"
        v-show="this.$store.state.foodCount !== 0 ? true : false"
      >{{ this.$store.state.foodCount }}</span>
    </div>
    <!-- 右边 -->
    <div class="mainWrapper">
      <span class="price">￥{{ price }}</span>
      <span class="tip">另需配送费￥4元</span>
      <span class="buy">{{`￥${minPrice}起送`}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'countFlag': false,
      'price': 0,
      'minPrice': 20
    }
  }
}
</script>

<style lang="scss" scoped>
.shoppingCart {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  line-height: 48px;
  display: flex;
  background-color: #141d27;
  .logoWrapper {
    position: relative;
    height: 48px;
    width: 74px;
    line-height: 48px;
    margin-top: -15px;
    margin-left: 10px;
    padding-top: 8px;
    border-radius: 50%;
    background-color: #141d27;
    text-align: center;
    .logo {
      display: inline-block;
      width: 48px;
      height: 48px;
      line-height: 48px;
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 24px;
      font-weight: bold;
      color: #80858a;
      border-radius: 50%;
      &.active {
        background: #00a0dc;
        &{
          color: #fff;
        }
      }
    }
    .count {
      display: inline-block;
      position: absolute;
      top: 5px;
      right: 0;
      line-height: 15px;
      width: 25px;
      font-size: 10px;
      color: #fff;
      background-color: #f01414;
      border-radius: 10px;
    }
  }
  .mainWrapper {
    width: 100%;
    color: #979a9c;
    .pirce,
    .tip,
    .buy {
      display: inline-block;
      line-height: 48px;
      font-size: bold;
    }
    .price {
      padding: 0 8px;
      font-weight: bold;
      font-size: 16px;
      border-right: 1px solid #919396;
    }
    .tip {
      padding: 0 5px;
      font-size: 10px;
    }
    .buy {
      position: absolute;
      right: 0;
      padding: 0 15px;
      background-color: #2b333b;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
