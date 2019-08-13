<template>
  <div class="header">
    <!-- 全部header内容 -->
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
          <span class="count">{{ seller.supports.length }}</span>
          <i>></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title">{{ seller.bulletin }}</span>
      <span class="bulletin-text"></span>
      <i>></i>
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
  color: #fff;
  background-color: #9a9a9a;
  position: relative;
  .content-wrapper {
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
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .bulletin-title{
      display: inline-block;
      width: 22px;
      height: 12px;
      bg-image('')
    }
  }
}
</style>
