<template>
  <div class="header">
    <!-- header上部分内容：详情-->
    <div class="content-wrapper">
      <!-- 头像 -->
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt />
      </div>
      <!-- 内容 -->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="detailShow = !detailShow">
          <span class="count">{{ seller.supports.length }}个</span>
          <i>></i>
        </div>
      </div>
    </div>
    <!-- header下部分内容：公告 -->
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i>></i>
    </div>
    <!-- 背景 -->
    <div class="background">
      <img :src="seller.avatar" alt />
    </div>
    <!-- 详情页面 -->
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <star :size="48" :score="seller.score" class="star-wrapper"></star>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="discounts" v-if="seller.supports">
              <ul>
                <li v-for="(item, index) in seller.supports" :key="index">
                  <span class="icon" :class="classMap[item.type]"></span>
                  <span class="description">{{ item.description }}</span>
                </li>
              </ul>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <span class="iconfont icon-guanbi" @click="detailShow = !detailShow"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'

export default {
  data () {
    return {detailShow: false}
  },
  props: ['seller'],
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  components: {
    star
  }
}
</script>

<style lang="scss">
.header {
  .fade-enter-active,
  .fade-leave-active {
    opacity: 1;
    transition: opacity 0.7s;
    -webkit-transition: opacity 0.7s;
  }
  .fade-enter,
  .fade-leave {
    opacity: 0;
    transition: opacity 0.7s;
    -webkit-transition: opacity 0.7s;
  }
  overflow: hidden;
  position: relative;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      vertical-align: top;
      display: inline-block;
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      font-size: 16px;
      .title {
        margin: 2px 0 8px 0;
        height: 18px;
        line-height: 18px;
        .brand {
          vertical-align: top;
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bg-image("./brand");
          background-repeat: no-repeat;
          background-size: 30px 18px;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
        .icon {
          vertical-align: middle;
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image("./decrease_1");
          }
          &.discount {
            @include bg-image("./discount_1");
          }
          &.guarantee {
            @include bg-image("./guarantee_1");
          }
          &.invoice {
            @include bg-image("./invoice_1");
          }
          &.special {
            @include bg-image("./special_1");
          }
        }
        .text {
          font-size: 12px;
          line-height: 12px;
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          // vertical-align: middle;
          font-size: 10px;
        }
        i {
          margin-left: 2px;
          line-height: 24px;
          font-size: 10px;
        }
      }
    }
  }
  .bulletin-wrapper {
    background-color: rgba(0, 0, 0, 0.2);
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    .bulletin-title {
      vertical-align: middle;
      display: inline-block;
      width: 22px;
      height: 12px;
      @include bg-image("./bulletin");
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      margin: 0 4px;
      font-size: 10px;
    }
    i {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 2px;
    }
  }
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    filter: blur(10px);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(10px);
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        margin-top: 32px;
        padding-bottom: 64px;
        .name {
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
          color: rgb(255, 255, 255);
          text-align: center;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          width: 80%;
          margin: 30px auto 24px;
          display: flex;
          align-items: center;
          .line {
            flex: 1;
            position: relative;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            font-size: 14px;
            padding: 0 12px;
          }
        }
        .discounts {
          ul {
            width: 80%;
            margin: 0 auto;
            li {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              font-size: 0;
              padding: 0 12px;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 16px;
                background-repeat: no-repeat;
                background-size: 16px 16px;
                &.decrease {
                  @include bg-image("./decrease_2");
                }
                &.discount {
                  @include bg-image("./discount_2");
                }
                &.guarantee {
                  @include bg-image("./guarantee_2");
                }
                &.invoice {
                  @include bg-image("./invoice_2");
                }
                &.special {
                  @include bg-image("./special_2");
                }
              }
              .description {
                font-size: 14px;
                font-weight: 200;
              }
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          p {
            line-height: 25px;
            font-size: 14px;
            font-weight: 200;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>
