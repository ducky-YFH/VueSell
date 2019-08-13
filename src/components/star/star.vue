<template>
  <div class="star">
    <span v-for="item in starType" :key="item" class="star-item" :class="[starSize,item]"></span>
  </div>
</template>

<script>
const STAR_ON = 'star-on'
const STAR_HALF = 'star-half'
const STAR_OFF = 'star-off'

export default {
  props: ['size', 'score'],
  computed: {
    starSize () {
      return 'star-' + this.size
    },
    starType () {
      let starArr = []
      let score = Math.floor(this.score * 2) / 2
      // 判断是否有余数
      let decimal = score % 1 !== 0 // true or false
      // 获取星星整数
      let integer = Math.floor(this.score)
      for (let i = 0; i < integer; i++) {
        starArr.push(STAR_ON)
      }
      if (decimal) {
        starArr.push(STAR_HALF)
      }
      while (starArr.length < 5) {
        starArr.push(STAR_OFF)
      }
      return starArr
    }
  }
}
</script>

<style lang="scss" scoped>
.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
    &:last-child {
      margin-right: 0;
    }
    &.star-24 {
      & {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
      }
      &.star-on {
        @include bg-image("star24_on");
      }
      &.star-half {
        @include bg-image("star24_half");
      }
      &.star-off {
        @include bg-image("star24_off");
      }
    }
    &.star-36 {
      & {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
      }
      &.star-on {
        @include bg-image("star36_on");
      }
      &.star-half {
        @include bg-image("star36_half");
      }
      &.star-off {
        @include bg-image("star36_off");
      }
    }
    &.star-48 {
      margin-right: 22px;
      & {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px;
      }
      &.star-on {
        @include bg-image("star48_on");
      }
      &.star-half {
        @include bg-image("star48_half");
      }
      &.star-off {
        @include bg-image("star48_off");
      }
    }
  }
}
</style>
