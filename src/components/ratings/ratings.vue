<template>
  <div class="ratingsWrapper" ref="wrapper">
    <div class="ratingsCon">
      <!-- 上部 -->
      <div class="top">
        <div class="top-left">
          <h1 class="score">{{ seller.score }}</h1>
          <p class="text">综合评分</p>
          <p class="text2">高于周边商家{{ seller.rankRate }}%</p>
        </div>
        <div class="top-right">
          <div class="manner">
            <span class="server">服务态度</span>
            <span class="grade">
              <star :size="36" :score="seller.serviceScore" class="star-wrapper"></star>
            </span>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="goods">
            <span class="server">商品评分</span>
            <span class="grade">
              <star :size="36" :score="seller.foodScore" class="star-wrapper"></star>
            </span>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="arrive">
            <span class="arriveTime">送达时间</span>&nbsp;&nbsp;
            <span class="minute">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <!-- 下部 -->
      <div class="bottom">
        <div class="btn">
          <span
            @click="getNative(0)"
            :class="{'native': native === 0}"
          >全部{{ goodRating.length + badRating.length }}</span>
          <span @click="getNative(1)" :class="{'native': native === 1}">推荐{{ goodRating.length }}</span>
          <span @click="getNative(2)" :class="{'native': native === 2}">吐槽{{ badRating.length }}</span>
        </div>
        <div class="comment">
          <div class="select" @click="onlyRating()">
            <span class="tick iconfont icon-pinglun" :class="{'native': onlyFlag}"></span>
            <span class="reminder">只查看内容的评价</span>
          </div>
          <ul>
            <li class="comment-item" v-for="(item,index) in currentRating" :key="index">
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
import star from 'components/star/star'
const ERR_OK = 0

export default {
  data () {
    return {
      seller: {},
      allRatings: [],
      badRating: [],
      goodRating: [],
      justRating: [],
      currentRating: [],
      native: 0,
      onlyFlag: false
    }
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    },
    getAllRatings () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.data
        if (response.errno === ERR_OK) {
          this.allRatings = response.data
          this.getRating()
        }
      }, () => {
        console.log('请求路径有错')
      })
    },
    getSeller () {
      this.$http.get('/api/seller').then((response) => {
        response = response.data
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      }, () => {
        console.log('请求路径有错')
      })
    },
    getRating () {
      this.currentRating = this.allRatings
      // 好、坏评论
      this.allRatings.forEach((item) => {
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
          this.currentRating = this.allRatings
        } else {
          this.currentRating = this.justRating
        }
      }
      if (index === 1) {
        this.native = 1
        this.currentRating = this.goodRating
      }
      if (index === 2) {
        this.native = 2
        this.currentRating = this.badRating
      }
    },
    onlyRating () {
      this.onlyFlag = !this.onlyFlag
      this.currentRating = []
      this.goodRating = []
      this.badRating = []
      this.justRating = []
      if (this.onlyFlag) {
        this.allRatings.forEach((item) => {
          if (item.text !== '') {
            this.justRating.push(item)
          }
          if (item.text !== '' && item.rateType === 0) {
            this.goodRating.push(item)
          }
          if (item.text !== '' && item.rateType === 1) {
            this.badRating.push(item)
          }
        })
        if (this.native === 0) {
          this.currentRating = this.justRating
        }
        if (this.native === 1) {
          this.currentRating = this.goodRating
        }
        if (this.native === 2) {
          this.currentRating = this.badRating
        }
      } else {
        this.getRating()
      }
    }
  },
  created () {
    this.getSeller()
    this.getAllRatings()
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  updated () {
    this.scroll.refresh()
  },
  components: {
    star
  }
}
</script>

<style lang="scss" scoped>
.ratingsWrapper {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background-color: #f3f5f7;
  .ratingsCon {
    .top {
      display: flex;
      flex-direction: row;
      padding: 20px 0;
      background-color: #fff;
      border-bottom: 1px solid #dbdee1;
      .top-left {
        text-align: center;
        border-right: 1px solid #e6e7e8;
        padding: 7px 20px;
        .score {
          font-size: 25px;
          color: #ff9900;
        }
        .text {
          font-size: 12px;
          line-height: 25px;
        }
        .text2 {
          font-size: 12px;
          color: #93999f;
        }
      }
      .top-right {
        padding-left: 25px;
        .manner,
        .goods {
          line-height: 15px;
          .server,
          .grade {
            font-size: 12px;
            margin-right: 10px;
          }
          .score {
            font-size: 10px;
            color: #b1b5ba;
          }
          .star-wrapper {
            display: inline-block;
            padding: 2px 0;
            text-align: center;
          }
        }
        .arrive {
          .arriveTime {
            font-size: 12px;
          }
          .minute {
            font-size: 10px;
            color: #b1b5ba;
          }
        }
      }
    }
    .bottom {
      margin-top: 20px;
      background-color: #fff;
      padding: 20px;
      border-top: 1px solid #dbdee1;
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
