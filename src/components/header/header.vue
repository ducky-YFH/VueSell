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
        <div v-if="seller.supports" class="support-count">
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
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['seller'],
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  }
}
</script>

<style lang="scss" scoped>
.header {
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
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
