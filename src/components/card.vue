<template>
  <div class="card van-hairline--bottom">
    <div class="card-img">
      <img :src="thumb">
    </div>
    <div class="card-content">
      <div class="overflow-hidden title">{{title}}</div>
      <div class="overflow-hidden desc">{{desc}}</div>
      <div class="overflow-hidden tags">
        <div v-for="i in tags" :key="i" >{{i}}</div>
      </div>
      <div class="overflow-hidden prices">
        <div class="price-off">￥{{priceOff || price}}</div>
        <div class="price" v-if="priceOff">￥{{price}}</div>
      </div>
      <div class="counter">
        <div v-if="num" @click="$emit('changeHandler', id, -1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
        </div>
        <div v-if="num" class="num">{{num}}</div>
        <div @click="add">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
        </div>
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
      el.style.opacity = 1;
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
        opacity: 0.5,
        translateX: carLeft - left,
        translateY: carTop - top,
        scaleX: 0.1,
        scaleY: 0.1,
      }, {
        duration: 1000,
        complete: () => {
          this.showMoveDot.shift();
          done();
        },
      });
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
    height: 100px;
    display: flex;
    padding: 5px;
    .card-img {
      width: 90px;
      margin-right: 20px;
      img {
        width: 90px;
        height: 90px;
      }
    }
    .card-content {
      position: relative;
      flex: 1;
      >div {
        width: 170px;
      }
      .title {
        font-size: 13px;
        color: #1a1a1a;
        margin-top: 5px;
      }
      .desc {
        color: #aaa;
        font-size: 11px;
        margin-top: 5px;
      }
      .tags {
        display: flex;
        margin-top: 4px;
        >div {
          font-size: 10px;
          border: 1px solid #aaa;
          padding: 1px 2px 2px 2px;
          color: #aaa;
          border-radius: 3px;
          margin-right: 5px;
        }

      }
      .prices{
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        .price-off {
          font-size: 14px;
          color: #ff1a90;
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
      bottom: 0px;
      right: 15px;
      justify-content: flex-end;
      align-items: center;
      > div:not(.num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
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
        img {
          width: 100%;
          border-radius: 50%;
        }
      }

  }
  .overflow-hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
