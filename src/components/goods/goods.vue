<template>
  <div class="goods">
    <!-- ============================left============================ -->
    <div class="menu-wrapper wrapper" ref="left">
      <ul class="menuContent">
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="menu-item"
          :class="{current: currentIndex === index}"
          @click="selectItem(index, $event)"
        >
          <span class="text">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <!-- ============================right============================ -->
    <div class="main-wrapper" ref="right">
      <ul class="mainContent">
        <li class="main-item" v-for="(item, index) in goods" :key="index">
          <h3 class="title">{{ item.name }}</h3>
          <ul>
            <li
              class="foods-item"
              v-for="(food, i) in item.foods"
              :key="i"
              @click="selectFood(food)"
            >
              <!-- 小球 -->
              <div class="ball"></div>
              <!-- 减去 -->
              <transition>
                <span
                  v-show="everyCount(food.name) > 0"
                  class="del"
                  @click.stop="addOrDel(food.name, food.price, flag=false);"
                >-</span>
              </transition>
              <!-- 数量 -->
              <transition>
                <span v-show="everyCount(food.name) > 0" class="count">{{ everyCount(food.name) }}</span>
              </transition>
              <!-- 添加 -->
              <span class="add" @click.stop="addOrDel(food.name, food.price, flag=true)">+</span>
              <div class="icon">
                <img :src="food.icon" alt />
              </div>
              <div class="detail">
                <h3>{{ food.name }}</h3>
                <p class="description" v-if="food.description">{{ food.description }}</p>
                <p class="sellCount">月销{{ food.sellCount }}份&nbsp;&nbsp;好评率{{ food.rating }}%</p>
                <div class="price">
                  <span class="nowPrice">￥{{ food.price }}</span>
                  <span class="oldPrice" v-if="food.oldPrice !== '' ">￥{{ food.oldPrice }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 底部结算组件 -->
    <shoppingCart></shoppingCart>
    <!-- 食物详细信息组件 -->
    <food v-if="this.$store.state.foodShow" :food='food'></food>
    <!-- ============================right============================ -->
  </div>
</template>

// ================================Script================================
<script>
import BScroll from 'better-scroll'
import shoppingCart from 'components/shoppingCart/shoppingCart'
import food from 'components/food/food'
const ERR_OK = 0

export default {
  data () {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      listHeight: [],
      scrollY: 0,
      clickEvent: false,
      flag: false,
      foodList: this.$store.state.foodList,
      food: ''
    }
  },
  components: {
    shoppingCart,
    food
  },
  methods: {
    getGoods () {
      this.$http.get('/api/goods').then((response) => {
        response = response.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
          console.log(this.goods)
        }
      })
    },
    _initScroll () {
      this.left = new BScroll(this.$refs.left, {
        click: true
      })
      this.right = new BScroll(this.$refs.right, {
        click: true,
        probeType: 3
      })
      this.right.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _getHeight () {
      let rightItems = this.$refs.right.getElementsByClassName('main-item')
      let height = 0
      this.listHeight.push(height)
      console.log(rightItems.length)
      for (let i = 0; i < rightItems.length; i++) {
        const el = rightItems[i]
        height += el.clientHeight
        this.listHeight.push(height)
      }
    },
    selectItem (index, event) {
      this.clickEvent = true
      if (!event._constructed) {
        return ''
      } else {
        let rightItems = this.$refs.right.getElementsByClassName('main-item')
        let el = rightItems[index]
        this.right.scrollToElement(el, 300)
      }
    },
    addOrDel (name, price, flag) {
      this.foodList = this.$store.state.foodList
      if (this.foodList.length !== 0) {
        this.foodList.some((item, index) => {
          if (item.name === name && flag) {
            item.count++
          }
          if (item.name === name && !flag) {
            item.count--
          }
        })
        let foodName = this.foodList.find((item) => {
          return item.name === name
        })
        if (typeof foodName === 'undefined') {
          this.foodList.push({name: name, price: price, count: 1})
        }
      }
      if (this.foodList.length === 0 && flag) {
        this.foodList.push({name: name, price: price, count: 1})
      }
      // 清除$store.state.foodList里count为0的对象
      this.foodList.forEach((item, index) => {
        if (item.count === 0) {
          this.foodList.splice(index, 1)
        }
      })
      this.$store.commit('addToList', this.foodList)
    },
    selectFood (food) {
      this.$store.state.foodShow = true
      this.food = food
    }
  },
  created () {
    this.getGoods()
  },
  mounted () {
    setTimeout(() => {
      this.$nextTick(() => {
        this._initScroll()
        this._getHeight()
      })
    }, 500)
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 当height2不存在的时候，或者落在height和height2之间的时候，直接返回当前索引
        // >=height，是因为一开始this.scrollY=0,height=0
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i
        }
      }
      // 如果this.listHeight没有的话，就返回0
      return 0
    },
    everyCount (name) {
      return function (name) {
        let count = 0
        this.foodList.forEach(item => {
          if (item.name === name) {
            count = item.count
          }
        })
        return count
      }
    }
  }
}
</script>
// ================================Script================================

<style lang="scss" scoped>
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      text-align: center;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;
      font-size: 14px;
      &.current {
        background-color: #ffffff;
      }
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: top;
        background-repeat: no-repeat;
        background-size: 12px 12px;
        &.decrease {
          @include bg-image("decrease_3");
        }
        &.discount {
          @include bg-image("./discount_3");
        }
        &.guarantee {
          @include bg-image("./guarantee_3");
        }
        &.invoice {
          @include bg-image("./invoice_3");
        }
        &.special {
          @include bg-image("./special_3");
        }
      }
      .text {
        display: table-cell;
        vertical-align: middle;
        width: 56px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }
  .main-wrapper {
    flex: 1;
    .mainContent {
      position: absolute;
      width: 100%;
    }
    .main-item {
      .title {
        width: 100%;
        line-height: 30px;
        text-indent: 15px;
        background-color: #f5f7f9;
        color: #a2a6ad;
        font-size: 12px;
        border-left: 1px solid #dcdfe4;
      }
      .foods-item {
        position: relative;
        display: flex;
        align-items: flex-start;
        padding: 20px 15px;
        @include border-1px(#e8e9ea);
        .icon {
          width: 60px;
          height: 60px;
          display: inline-block;
          img {
            // width: 100%;
            height: 100%;
          }
        }
        .detail {
          display: inline-block;
          padding-left: 8px;
          h3 {
            font-size: 15px;
            font-weight: 700;
            padding-bottom: 5px;
          }
          .description,
          .sellCount {
            font-size: 10px;
            color: #a2a6ad;
            // height: 20px;
            line-height: 20px;
          }
          .description {
            line-height: 15px;
          }
          .price {
            .nowPrice {
              color: #ed191c;
              font-weight: 600;
            }
            .oldPrice {
              font-size: 10px;
              color: #a2a6ad;
              text-decoration: line-through;
            }
          }
        }
        .add {
          position: absolute;
          width: 20px;
          line-height: 20px;
          background-color: #00a0dc;
          border-radius: 50%;
          text-align: center;
          color: #fff;
          right: 100px;
          bottom: 2.5vh;
        }
        .del {
          position: absolute;
          width: 19px;
          line-height: 19px;
          border-radius: 50%;
          font-weight: bold;
          text-align: center;
          color: #00a0dc;
          border: 1px solid #00a0dc;
          right: 140px;
          bottom: 2.5vh;
        }
        .count {
          position: absolute;
          width: 19px;
          line-height: 19px;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          color: #b1b5ba;
          right: 120px;
          bottom: 2.5vh;
        }
        .ball {
          display: none;
          position: absolute;
          width: 15px;
          height: 15px;
          background-color: red;
          border-radius: 50%;
          position: absolute;
          bottom: 3vh;
          z-index: 111;
          right: 102px;
        }
      }
    }
  }
  .v-enter,
  .v-leave-to {
    opacity: 0;
    transform: translateX(40px);
  }
  .v-enter-active {
    transition: all 0.4s ease;
  }
  .v-leave-active {
    transition: all 0 ease;
  }
}
</style>
