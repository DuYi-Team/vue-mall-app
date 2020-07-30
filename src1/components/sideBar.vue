<template>
  <div class="side-bar-wrapper"
  @touchstart="move=false"
  @touchmove="move=true"
  @touchend="scrollTo" ref="side" >
      <div
      v-for="(item, index) in list"
      :key="item"
      :class="{active: value == item}"
      :data-item="item"
      @touchend="getValue(item)">{{ index == 0 ? '全部' : item}}</div>
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
      over: false,
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
    ...mapMutations(['resetGoodsList', 'changeOver']),
    ...mapActions(['getGoodsList']),
    scrollTo(e) {
      if (this.move) {
        return;
      }
      this.resetGoodsList();
      this.nextSibling = e.target.nextElementSibling;
      const cTop = e.target.getBoundingClientRect().top;
      const sideTop = this.$refs.side.offsetTop;
      const sideHeight = this.$refs.side.offsetHeight / 2;
      this.moveScroll(this.$refs.side.scrollTop, (sideHeight - (cTop - sideTop)));
    },
    getValue(item) {
      if (this.move) {
        return;
      }
      this.value = item;
      this.getGoodsList({ type: item, page: 1 });
    },
    moveScroll(start, end) {
      if (this.move) {
        this.move = false;
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
      let sibling = null;
      if (this.nextSibling) {
        sibling = this.nextSibling;
      } else if (this.over === false) {
        [, sibling] = this.$refs.side.children;
        this.over = true;
      }
      if (sibling) {
        const { item } = sibling.dataset;
        console.log(sibling.dataset);
        this.getValue(item);
        this.scrollTo({ target: sibling });
      }
    },
  },
  created() {
    this.list = this.menuList;
    [this.value] = this.list;
  },
  watch: {
    menuList() {
      this.list = this.menuList;
      [this.value] = this.menuList;
    },
    nextSibling() {
      if (this.nextSibling === null) {
        this.changeOver(true);
      } else {
        this.changeOver(false);
      }
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
    background: #f8f8f8;
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
        color: #ff1a90;
      }
      .active::before {
        position: absolute;
        width: 6px;
        height: 18px;
        background: #ff1a90;
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
