<template>
  <div class="card van-hairline--bottom">
    <div class="card-img">
      <img :src="thumb">
    </div>
    <div class="card-content">
      <div class="overflow-hidden title">{{title}}</div>
      <div class="overflow-hidden desc">{{desc}}</div>
      <div class="overflow-hidden tags">
        <div v-for="i in tags" :key="i">{{i}}</div>
      </div>
      <div class="overflow-hidden prices">
        <div class="price-off">{{priceOff}}</div>
        <div class="price">{{price}}</div>
      </div>
      <div class="counter">
        <div v-if="num" @click="$emit('changeHandler', id, -1)">-</div>
        <div v-if="num" class="num">{{num}}</div>
        <div @click="add">+</div>
      </div>
    </div>
    <transition-group
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
      >
        <div class="move-dot" v-for="(item, index) in showMoveDot"  :key="index">
          <img :src="thumb">
        </div>
    </transition-group>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';

export default {
  data() {
    return {
      showMoveDot: [],
      elLeft: 0,
      elTop: 0,
    };
  },
  props: ['price', 'priceOff', 'title', 'tags', 'desc', 'num', 'thumb', 'id', 'fly'],
  methods: {
    add() {
      if (this.fly) {
        this.showMoveDot = [...this.showMoveDot, true];
      }
      this.$emit('changeHandler', this.id, 1);
    },
    beforeEnter(el) {
      if (!this.fly) {
        return;
      }
      el.style.opacity = 0;
    },
    enter(el, done) {
      if (!this.fly) {
        return;
      }
      const { left, top } = el.getBoundingClientRect();
      const { left: carLeft, top: carTop } = document
        .getElementById('shop-car')
        .getBoundingClientRect();
      // 设置小球移动的位移 // 搜索页面飞入购物车有问题，这里就不做处理了，两个动画的逻辑还不一样。
      Velocity(el, {
        opacity: 1, translateX: carLeft - left, translateY: carTop - top, scaleX: 0.1, scaleY: 0.1,
      }, { duration: 1000 });
      Velocity(el, { opacity: 0 }, {
        complete: () => {
          this.showMoveDot.shift();
          done();
        },
      });
    },
    leave() {

    },
  },
};
</script>

<style lang="less" scoped>
.card {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    height: 100px;
    display: flex;
    .card-img {
      width: 90px;
      img {
        width: 90px;
        height: 90px;
      }
    }
    .card-content {
      position: relative;
      flex: 1;
      >div {
        width: 190px;
        font-size: 12px;
      }
      .title {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: 400;
      }
      .desc {
        color: #aaa;
        margin-bottom: 3px;
      }
      .tags {
        display: flex;
        margin-bottom: 3px;
        >div {
          border: 1px solid #aaa;
          padding: 1px;
          color: #aaa;
          border-radius: 3px;
        }

      }
      .prices{
        display: flex;
        align-items: center;
        .price-off {
          font-size: 14px;
          color: pink;
          font-weight: 600;
          margin-right: 5px;
        }
        .price {
          font-size: 12px;
          color: #aaa;
          text-decoration: line-through;
        }
      }
    }
    .counter {
      display: flex;
      position: absolute;
      bottom: 5px;
      right: 15px;
      justify-content: flex-end;
      > div:not(.num) {
        font-size: 22px;
        width: 22px;
        height: 22px;
        line-height: 19px;
        border-radius: 11px;
        color: white;
        font-weight: 700;
        background: lime;
        text-align: center;
      }
      .num {
        padding:0 5px;
        height: 22px;
        line-height: 22px;
      }
    }
     .move-dot {
        position: absolute;
        z-index: 500;
        left: 5px;
        top: 5px;
        height: 90px;
        width: 90px;
        background: lime;
        border-radius: 50%;
      }

  }
  .overflow-hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
