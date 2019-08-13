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
          <span class="icon" :class="seller.supports[0].type"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['seller']
}
</script>

<style lang="scss" scoped>
.header {
  color: #fff;
  background-color: #000;
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
      .support{
        .icon{
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-image('./decrease_1')
          }
          &.discount{
            @include bg-image('./discount_1')
          }
          &.guarantee{
            @include bg-image('./guarantee_1')
          }
          &.invoice{
            @include bg-image('./invoice_1')
          }
        }
      }
    }
  }
}
</style>
