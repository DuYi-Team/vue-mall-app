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
        <div @click="$emit('changeHandler', id, 1)">+</div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  props: ['price', 'priceOff', 'title', 'tags', 'desc', 'num', 'thumb', 'id'],
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
  }
  .overflow-hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
