<template>
  <div class="side-bar-wrapper"
  @touchstart="move=false"
  @touchmove="move=true"
  @touchend="scrollTo" ref="side">
      <div
      v-for="key in list"
      :key="key"
      :class="{active: value == key}"
      @touchend="getValue(key)">{{ key }}</div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      move: false,
      value: '',
      nextSibling: null,
      list: [],
    };
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    scrollTo(e) {
      this.resetGoodsList();
      this.nextSibling = e.target.nextElementSibling;
      const cTop = e.target.getBoundingClientRect().top;
      const sideTop = this.$refs.side.offsetTop;
      const sideHeight = this.$refs.side.offsetHeight / 2;
      this.moveScroll(this.$refs.side.scrollTop, (sideHeight - (cTop - sideTop)));
    },
    getValue(key) {
      if (this.move) {
        return;
      }
      this.value = key;
      this.getGoodsList({ type: this.value, page: 1 });
    },
    moveScroll(start, end) {
      if (this.move) {
        return;
      }
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
    nb() {
      const sibling = this.nextSibling || this.$refs.side.children[1];
      if (sibling) {
        this.getValue(sibling.innerText);
        this.scrollTo({ target: sibling });
      }
    },
  },
  mounted() {
    this.list = this.menuList;
    [this.value] = this.list;
  },
  watch: {
    menuList() {
      this.list = this.menuList;
      [this.value] = this.list;
    },
  },
};

</script>

<style lang='less' scoped>
  .side-bar-wrapper {
    position: fixed;
    top: 135px;
    left: 0;
    width: 79px;
    bottom: 1.33333rem;
    overflow: auto;
     div {
        width: 100%;
        text-align: center;
        font-size: 12px;
        height: 40px;
        line-height: 40px;
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
