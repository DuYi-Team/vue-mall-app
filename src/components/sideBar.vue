<template>
  <div class="side-bar-wrapper" @click="scrollTo" ref="side">
      <div
      v-for="key in list"
      :key="key"
      :class="{active: value == key}"
      @click="getValue(key)">{{ key }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '全部',
      list: [
        '全部', '热销爆款', '周末特价', '苹果', '香梨', '柚子', '榴莲',
        '西瓜', '奇异果', '车厘子', '火龙果', '牛油果'],
    };
  },
  methods: {
    scrollTo(e) {
      const cTop = e.target.getBoundingClientRect().top;
      const sideTop = this.$refs.side.offsetTop;
      const sideHeight = this.$refs.side.offsetHeight / 2;
      this.moveScroll(this.$refs.side.scrollTop, (sideHeight - (cTop - sideTop)));
    },
    getValue(key) {
      this.value = key;
    },
    moveScroll(start, end) {
      let dis = 0;
      let speed = 5;
      if (end > 0) {
        speed *= -1;
      }
      const t = setInterval(() => {
        dis += speed;
        this.$refs.side.scrollTop = start + dis;
        if (Math.abs(dis) >= Math.abs(end)) {
          this.$refs.side.scrollTop = start - end;
          clearInterval(t);
        }
      }, 2);
    },
  },
};

</script>

<style lang='less' scoped>
  .side-bar-wrapper {
    position: fixed;
    top: 135px;
    width: 79px;
    bottom: 1.33333rem;
    overflow: auto;
     div {
        width: 100%;
        text-align: center;
        font-size: 12px;
        height: 50px;
        line-height: 50px;
        position: relative;
      }
      .active {
        font-weight: bold;
        color: #d13193;
      }
      .active::before {
        position: absolute;
        width: 6px;
        height: 18px;
        background: #d13193;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        content: '';
      }
  }
  .side-bar-wrapper::-webkit-scrollbar{
    width: 0px;
    background: none;
  }
</style>
