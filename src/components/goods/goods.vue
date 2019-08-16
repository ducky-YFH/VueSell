<template>
  <div class="goods">
    <div class="menu-wrapper wrapper" ref="left">
      <ul class="menuContent">
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="menu-item"
          @click="selectItem(index, $event)"
        >
          <span class="text">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <!-- ============================html============================ -->
    <div class="main-wrapper" ref="right">
      <ul class="mainContent">
        <li class="main-item" v-for="(item, index) in goods" :key="index">
          <h3 class="title">{{ item.name }}</h3>
          <ul>
            <li class="foods-item" v-for="(food, i) in item.foods" :key="i">
              <div class="icon">
                <img :src="food.icon" width alt />
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
    <!-- ============================html============================ -->
  </div>
</template>

// ================================Script================================
<script>
import BScroll from 'better-scroll'
const ERR_OK = 0

export default {
  data () {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      listHeight: [],
      scrollY: 0,
      clickEvent: false
    }
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
    }
  },
  created () {
    this.getGoods()
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._getHeight()
    })
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i
        }
        if (this.listHeight[this.listHeight.length - 1] - this.$refs.right.clientHeight <= this.scrollY) {
          if (this.clickTrue) {
            return this.currentNum
          } else {
            return (this.listHeight.length - 1)
          }
        }
      }
      return 0
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
      }
    }
  }
}
</style>
