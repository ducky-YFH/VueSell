<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="seller-content">
      <div class="seller">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="star-wrapper">
          <star :size="36" :score="seller.score" class="star"></star>
          <span class="num">({{seller.ratingCount}})</span>&nbsp;&nbsp;
          <span class="count">月销{{seller.sellCount}}单</span>
        </div>
        <div class="delivery">
          <div class="delivery-item">
            <p class="title">起送价</p>
            <p>
              <span class="price">{{ seller.minPrice }}</span>
              <span class="unit">元</span>
            </p>
          </div>
          <div class="delivery-item">
            <p class="title">商家配送</p>
            <p>
              <span class="price">{{ seller.deliveryPrice }}</span>
              <span class="unit">元</span>
            </p>
          </div>
          <div class="delivery-item">
            <p class="title">平均配送时间</p>
            <p>
              <span class="price">{{ seller.deliveryTime }}</span>
              <span class="unit">分钟</span>
            </p>
          </div>
        </div>
        <div class="love" @click="addCollect()" :class="{'native': collectFlag}">
          <span class="iconfont icon-shoucang"></span>
          <p>{{ collectFlag ? '已' : '' }}收藏</p>
        </div>
      </div>
      <div class="activity">
        <h1>公告与活动</h1>
        <p class="text">{{ seller.bulletin }}</p>
        <ul>
          <li v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text2">{{ item.description }}</span>
          </li>
        </ul>
      </div>
      <div class="pic">
        <h1>商家实景</h1>
        <div class="pic-wrapper" ref="imgWrapper">
          <ul>
            <li v-for="(item,index) in seller.pics" :key="index">
              <img :src="item" alt />
            </li>
          </ul>
        </div>
      </div>
      <div class="message">
        <h1>商家信息</h1>
        <ul>
          <li v-for="(item, index) in seller.infos" :key="index">
            <p>{{ item }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from 'components/star/star'
import BScroll from 'better-scroll'

const ERR_OK = 0
export default {
  data () {
    return {
      collectFlag: false,
      seller: {},
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.sellerWrapper, {
        click: true
      })
      this.scroll2 = new BScroll(this.$refs.imgWrapper, {
        scrollX: true,
        click: true
      })
    },
    getSeller () {
      this.$http.get('/api/seller').then(response => {
        response = response.data
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      }, () => {
        console.log('请求seller路径有错')
      })
    },
    addCollect () {
      this.collectFlag = !this.collectFlag
      let collect = this.$store.state.collect
      if (this.collectFlag) {
        collect.push(this.seller.name)
      } else {
        collect.some((item, index) => {
          if (item === this.seller.name) {
            collect.splice(index, 1)
          }
        })
      }
    },
    judgeCollect () {
      let collect = this.$store.state.collect
      console.log(collect)
      collect.some((item, index) => {
        if (item === this.seller.name) {
          this.collectFlag = true
        }
      })
    }
  },
  created () {
    this.getSeller()
    this.judgeCollect()
  },
  components: {
    star
  },
  updated () {
    this.scroll.refresh()
    this.scroll2.refresh()
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
    })
  }
}
</script>

<style lang="scss" scoped>
.seller-wrapper {
  width: 100%;
  position: absolute;
  background-color: #f3f5f7;
  top: 176px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  .seller-content {
    .seller {
      padding: 20px;
      position: relative;
      background-color: #ffffff;
      border-bottom: 1px solid #dbdee1;
      .title {
        font-size: 15px;
        margin-bottom: 8px;
      }
      .star-wrapper {
        .star {
          vertical-align: middle;
          display: inline-block;
        }
        .num,
        .count {
          font-size: 10px;
          color: #4d555d;
        }
      }
      .delivery {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 20px;
        .delivery-item {
          text-align: center;
          .title {
            font-size: 12px;
            color: #93999f;
          }
          .price {
            font-size: 25px;
          }
          .unit {
            font-size: 15px;
          }
        }
        .delivery-item:nth-child(1),
        .delivery-item:nth-child(2) {
          padding-right: 20px;
          border-right: 1px solid #e6e7e8;
        }
      }
      .love {
        position: absolute;
        right: 20px;
        top: 20px;
        text-align: center;
        .iconfont {
        }
        p {
          margin-top: 5px;
        }
        &.native {
          color: red;
        }
      }
    }
    .activity {
      margin-top: 15px;
      padding: 20px;
      background-color: #ffffff;
      border-top: 1px solid #dbdee1;
      border-bottom: 1px solid #dbdee1;
      h1 {
        font-size: 15px;
        margin-bottom: 8px;
      }
      .text {
        font-size: 10px;
        line-height: 20px;
        color: #f01414;
        border-bottom: 1px solid #e6e7e8;
      }
      li {
        line-height: 35px;
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-repeat: no-repeat;
          background-size: 16px 16px;
          vertical-align: middle;
          &.decrease {
            @include bg-image("./decrease_4");
          }
          &.discount {
            @include bg-image("./discount_4");
          }
          &.guarantee {
            @include bg-image("./guarantee_4");
          }
          &.invoice {
            @include bg-image("./invoice_4");
          }
          &.special {
            @include bg-image("./special_4");
          }
        }
        .text2 {
          font-size: 10px;
          line-height: 20px;
          color: #07111b;
        }
      }
    }
    .pic {
      padding: 20px;
      margin-top: 15px;
      background-color: #ffffff;
      border-top: 1px solid #dbdee1;
      h1 {
        font-size: 15px;
        margin-bottom: 8px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        ul {
          width: 498px;
          li {
            display: inline-block;
            margin-right: 4px;
            img {
              width: 120px;
              height: 90px;
            }
          }
        }
      }
    }
    .message {
      padding: 20px;
      margin-top: 15px;
      background-color: #ffffff;
      border-top: 1px solid #dbdee1;
      h1 {
        font-size: 15px;
        margin-bottom: 8px;
      }
      ul {
        li {
          font-size: 12px;
          line-height: 50px;
          border-bottom: 1px solid #e6e7e8;
        }
      }
    }
  }
}
</style>
