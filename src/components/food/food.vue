<template>
  <div class="foodWrapper" ref="foodWrapper">
    <div class="foodContent">
      <!-- 头部 -->
      <div class="header">
        <span class="back iconfont icon-houtui" @click="foodShow"></span>
        <img :src="food.image" alt />
        <div class="sell">
          <h3 class="title" @click="getFood">{{ food.name }}</h3>
          <p>月销{{ food.sellCount }}份&nbsp;&nbsp;&nbsp;好评率{{ food.rating }}%</p>
          <div>
            <span class="price">￥{{ food.price }}</span>
            <span @click="addCart()" class="addCart" v-if="getCount <= 0">加入购物车</span>
          </div>
          <!-- 控制数量 -->
          <span class="control" v-if="getCount > 0">
            <span class="del" @click="delOrAdd(flag=false)">-</span>
            <span class="count">{{ getCount }}</span>
            <span class="add" @click="delOrAdd(flag=true)">+</span>
          </span>
        </div>
      </div>
      <div class="center" v-if="food.info">
        <h3>商品介绍</h3>
        <p>{{ food.info }}</p>
      </div>
      <!-- 底部 -->
      <div class="footer">
        <h3>商品评价</h3>
        <div class="btn">
          <span
            @click="getNative(0)"
            :class="{'native':native === 0}"
          >全部{{ goodRating.length + badRating.length }}</span>
          <span @click="getNative(1)" :class="{'native':native === 1}">推荐{{ goodRating.length }}</span>
          <span @click="getNative(2)" :class="{'native2':native === 2}">吐槽{{ badRating.length }}</span>
        </div>
        <div class="comment">
          <div class="select" @click="onlyRating()">
            <span class="tick iconfont icon-pinglun" :class="{'native': onlyFlag}"></span>
            <span class="reminder">只查看内容的评价</span>
          </div>
          <ul>
            <li class="comment-item" v-for="(item,index) in allRating" :key="index">
              <span class="date">{{ item.rateTime }}</span>
              <div class="user">
                <span class="id">{{ item.username }}</span>
                <span class="avatar">
                  <img :src="item.avatar" alt />
                </span>
              </div>
              <div class="rating">
                <span class="logo iconfont icon-zan"></span>
                <span class="con">{{ item.text }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data: function () {
    return {
      goodRating: [],
      badRating: [],
      allRating: [],
      justRating: [],
      native: 0,
      onlyFlag: false
    }
  },
  props: ['food'],
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.foodWrapper, {
        click: true
      })
    },
    foodShow () {
      this.$store.state.foodShow = false
    },
    getFood () {
      // console.log(this.food)
      console.log(this.$store.state.foodList)
    },
    getRating () {
      //  全部评论
      this.allRating = this.food.ratings
      // 好、坏评论
      this.food.ratings.forEach((item) => {
        if (item.rateType === 1) {
          this.badRating.push(item)
        } else {
          this.goodRating.push(item)
        }
      })
    },
    getNative (index) {
      if (index === 0) {
        this.native = 0
        if (!this.onlyFlag) {
          this.allRating = this.food.ratings
        } else {
          this.allRating = this.justRating
        }
      }
      if (index === 1) {
        this.native = 1
        this.allRating = this.goodRating
      }
      if (index === 2) {
        this.native = 2
        this.allRating = this.badRating
      }
    },
    onlyRating () {
      this.onlyFlag = !this.onlyFlag
      this.allRating = []
      this.goodRating = []
      this.badRating = []
      this.justRating = []
      if (this.onlyFlag) {
        this.food.ratings.forEach((item) => {
          if (item.text !== '') {
            this.justRating.push(item)
          }
          if (item.text !== '' && item.rateType === 0) {
            this.goodRating.push(item)
          }
          if (item.text !== '' && item.rateType === 1) {
            this.badRating.push(item)
            console.log(this.badRating)
          }
        })
        if (this.native === 0) {
          this.allRating = this.justRating
        }
        if (this.native === 1) {
          this.allRating = this.goodRating
        }
        if (this.native === 2) {
          this.allRating = this.badRating
        }
      } else {
        this.getRating()
      }
    },
    delOrAdd (flag) {
      let foodList = this.$store.state.foodList
      let food = foodList.find((item) => {
        return item.name === this.food.name
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
    addCart () {
      let food = {'name': this.food.name, 'price': this.food.price, 'count': 1}
      this.$store.state.foodList.push(food)
    }
  },
  created () {
    this.getRating()
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  updated () {
    // 重新计算高度
    this.scroll.refresh()
  },
  computed: {
    getCount () {
      let count = 0
      this.$store.state.foodList.some((item) => {
        if (item.name === this.food.name) {
          count = item.count
        }
      })
      return count
    }
  }
}
</script>

<style lang="scss" scoped>
.foodWrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  background-color: #f3f5f7;
  z-index: 1111;
  overflow: hidden;
  .foodContent {
    .header {
      position: relative;
      .back {
        position: absolute;
        top: 20px;
        left: 15px;
        color: #fff;
        font-weight: bold;
        font-size: 20px;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .sell {
        position: relative;
        background-color: #ffffff;
        padding: 20px;
        .title {
          color: #07111b;
          font-size: 14px;
        }
        p {
          color: #93999f;
          line-height: 30px;
          font-size: 12px;
        }
        div {
          .price {
            font-size: 15px;
            font-weight: bold;
            color: #f01414;
            vertical-align: middle;
            line-height: 26px;
          }
          .addCart {
            float: right;
            padding: 6px 10px;
            color: #fff;
            font-size: 12px;
            font-weight: 500;
            box-sizing: border-box;
            border-radius: 15px;
            background-color: #00a0dc;
          }
        }
        .control {
          position: absolute;
          right: 25px;
          bottom: 25px;
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
    .center {
      margin-top: 20px;
      background-color: #fff;
      padding: 20px;
      h3 {
        font-size: 15px;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        line-height: 20px;
        color: #a9adb1;
      }
    }
    .footer {
      margin-top: 20px;
      background-color: #fff;
      padding: 20px;
      h3 {
        font-size: 15px;
      }
      .btn {
        line-height: 60px;
        border-bottom: 0.5px solid #edeeef;
        span {
          padding: 6px 12px;
          font-size: 13px;
          margin-right: 5px;
          font-weight: 300;
        }
        span:nth-child(1) {
          background-color: #ccecf8;
        }
        span:nth-child(2) {
          background-color: #ccecf8;
        }
        span:last-child {
          background-color: #dbdddf;
        }
        span.native {
          background-color: #00a0dc;
          color: #fff;
        }
        span.native2 {
          background-color: #4d555d;
          color: #fff;
        }
      }
      .comment {
        .select {
          line-height: 50px;
          border-bottom: 1px solid #edeeef;
          .tick {
            vertical-align: middle;
            color: #93999f;
            &.native {
              color: #00c850;
            }
          }
          .reminder {
            font-size: 12px;
            color: #93999f;
          }
        }
        .comment-item {
          line-height: 35px;
          .date {
            color: #93999f;
            font-size: 10px;
          }
          .user {
            float: right;
            color: #93999f;
            font-size: 10px;
            .avatar {
              display: inline-block;
              width: 15px;
              height: 15px;
              img {
                border-radius: 50%;
                vertical-align: middle;
                width: 100%;
                height: 100%;
              }
            }
          }
          .rating {
            .logo {
              color: #00a0dc;
            }
            .con {
              margin-left: 8px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
