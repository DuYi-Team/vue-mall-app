<template>
  <div class="card van-hairline--bottom">
    <div class="card-img">
      <img :src="thumb" ref="img">
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
      <div class="counter" v-if="!sellOut">
        <div v-if="num" @click="$emit('changeHandler', id, -1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
        </div>
        <div v-if="num" class="num">{{num}}</div>
        <div @click="add">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
        </div>
      </div>
      <div class="smaller" v-else >找相似</div>
    </div>
  </div>
</template>

<script>
import Animate from '@/tools/animate';

export default {
  data() {
    return {
      showMoveDot: [],
      elLeft: 0,
      elTop: 0,
      x: 0,
      y: 0,
    };
  },
  props: ['price', 'priceOff', 'title', 'tags', 'desc', 'num', 'thumb', 'id', 'fly', 'sellOut'],
  methods: {
    add() {
      if (this.fly) {
        this.showMoveDot = [...this.showMoveDot, true];
      }
      this.$emit('changeHandler', this.id, 1);
      const { top, left } = this.$refs.img.getBoundingClientRect();
      const { left: endX, top: endY } = document
        .getElementById('shop-car')
        .getBoundingClientRect();
      const { width, height } = getComputedStyle(this.$refs.img, null);
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.img.src,
        width,
        height,
      });
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
      >div:not(.smaller) {
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
      bottom: 12px;
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
    .smaller {
      text-align: right;
      justify-content: flex-end;
      position: absolute;
      bottom: 9px;
      right: 15px;
      border: 1px solid #ff1a90;
      border-radius: 4px;
      padding: 2px;
      width: 38px;
      color: #ff1a90;
      font-size: 12px;
    }
     .move-dot {
        position: relative;
        z-index: 500;
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
