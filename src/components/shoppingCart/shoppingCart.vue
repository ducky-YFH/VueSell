<template>
  <div class="shoppingCart">
    <!-- 左边 -->
    <div class="logoWrapper" @click="editFlag = !editFlag">
      <span
        id="cart"
        class="logo iconfont icon-shoppingCart"
        :class="this.$store.getters.getCount !== 0 ? 'logoActive' : '' "
      ></span>
      <span
        class="count"
        v-show="this.$store.getters.getCount !== 0 ? true : false"
      >{{ this.$store.getters.getCount }}</span>
    </div>
    <!-- 右边 -->
    <div class="mainWrapper" @click="editFlag = !editFlag">
      <span
        class="price"
        :class="this.$store.getters.getPrice !== 0 ? 'priceActive' : '' "
      >￥{{ this.$store.getters.getPrice }}</span>
      <span class="tip">另需配送费￥4元</span>
      <span class="buy" :class="getMinPrice == '去结算' ? 'buyActive' : '' ">{{ getMinPrice }}</span>
    </div>
    <!-- 编辑购物 -->
    <transition>
      <div class="edit-wrapper" v-show="editFlag">
        <div class="edit-title">
          <span class="title">购物车</span>
          <span class="clear" @click="clear">清空</span>
        </div>
        <div class="edit-content" ref="wrapper">
          <ul>
            <li class="edit-item" v-for="(item, index) in this.$store.state.foodList" :key="index">
              <span class="title">{{ item.name }}</span>
              <span class="price">￥{{ item.price * item.count }}</span>
              <span class="control">
                <span class="del" @click="delOrAdd(item.name,flag=false)">-</span>
                <span class="count">{{ item.count }}</span>
                <span class="add" @click="delOrAdd(item.name,flag=true)">+</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      'countFlag': false,
      'minPrice': 20,
      'editFlag': false
    }
  },
  methods: {
    _initScroll () {
      this.left = new BScroll(this.$refs.wrapper, {
        click: true
      })
    },
    delOrAdd (name, flag) {
      let foodList = this.$store.state.foodList
      let food = foodList.find((item) => {
        return item.name === name
      })
      if (flag) {
        food.count++
      }
      if (!flag && food.count > 0) {
        food.count--
        if (food.count <= 0) {
          foodList.forEach((item, index) => {
            if (item.count === 0) {
              foodList.splice(index, 1)
            }
          })
        }
      }
    },
    clear () {
      this.$store.state.foodList = []
      this.editFlag = !this.editFlag
    }
  },
  mounted () {
    this._initScroll()
  },
  computed: {
    getMinPrice () {
      let minPrice = 20
      let price = this.$store.getters.getPrice
      if (!price) {
        return `￥${minPrice}起送`
      }
      minPrice = minPrice - price
      if (minPrice <= 0) {
        return '去结算'
      } else {
        return `还差${minPrice}元`
      }
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
  z-index: 9999;
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
    z-index: 12;
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
      &.logoActive {
        background: #00a0dc;
        & {
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
      width: 76px;
      right: 0;
      text-align: center;
      padding: 0 15px;
      background-color: #2b333b;
      font-weight: bold;
      font-size: 18px;
      &.buyActive {
        background-color: #00b43c;
        color: #fff;
      }
    }
    .priceActive {
      color: #fff;
      font-weight: bold;
    }
  }
  .edit-wrapper {
    position: absolute;
    width: 100%;
    bottom: 48px;
    background-color: #f3f5f7;
    font-size: 14px;
    z-index: 11;
    .edit-title {
      display: flex;
      line-height: 35px;
      justify-content: space-between;
      padding: 0 15px;
      box-shadow: 0px 2px 3px #065eaf;
      border-bottom: 1px solid #dbdee1;
      .clear {
        color: #00a0dc;
      }
    }
    .edit-content {
      background-color: #fff;
      padding: 0 15px;
      max-height: 200px;
      overflow: hidden;
      .edit-item {
        display: flex;
        .title {
          flex: 1;
        }
        .price {
          color: red;
          flex: 0.3;
        }
        .control {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 60px;
          .del {
            display: inline-block;
            width: 19px;
            line-height: 19px;
            text-align: center;
            border-radius: 50%;
            font-weight: bold;
            color: #00a0dc;
            border: 1px solid #00a0dc;
          }
          .add {
            display: inline-block;
            width: 20px;
            line-height: 20px;
            border-radius: 50%;
            text-align: center;
            background-color: #00a0dc;
            color: #fff;
            right: 100px;
          }
          .count {
            display: inline-block;
            font-size: 12px;
            color: #b1b5ba;
          }
        }
      }
    }
  }
  .v-enter,
  .v-leave-to {
    transform: translateY(200px);
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
}
</style>
