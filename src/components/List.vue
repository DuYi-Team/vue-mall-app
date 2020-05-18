<template>
  <div class="list-wrapper">
    <div class="list-header">
      <div :class="{active: type === 'all'}" @touchend="changeType('all')">综合</div>
      <div :class="{active: type === 'sale'}" @touchend="changeType('sale')">销量</div>
      <div
      class="price"
      :class="{'price-up': type==='price-up', 'price-down': type === 'price-down'}"
      @touchend="changeType('price')">价格</div>
    </div>
    <div class="list-content" v-if="!showLoading" @touchmove="up">
      <van-pull-refresh v-model="isLoad" @refresh="onRefresh" head-height="80">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <!-- <div class="card van-hairline--bottom" v-for="(item,i) in list" :key="i">
             <div class="card-img">
               <img :src="item.img" alt="">
             </div>
             <div class="card-content">
               <div class="overflow-hidden title">{{item.title}}</div>
               <div class="overflow-hidden desc">{{item.desc}}</div>
               <div class="overflow-hidden tags">
                 <div v-for="i in item.tags" :key="i">{{i}}</div>
               </div>
               <div class="overflow-hidden prices">
                 <div class="price-off">{{item.priceOff}}</div>
                 <div class="price">{{item.price}}</div>
               </div>
               <div class="counter">
                 <div v-if="counterMap[item.id]" @click="addCounter(item.id, -1)">-</div>
                 <div v-if="counterMap[item.id]" class="num">{{counterMap[item.id]}}</div>
                 <div @click="addCounter(item.id,1)">+</div>
               </div>
             </div>
          </div> -->
          <Card
          v-for="(item,i) in list"
          :key="i"
          :id="item.id"
          :title="item.title"
          :desc="item.desc"
          :priceOff="item.priceOff"
          :price="item.price"
          :thumb="item.img"
          :num="counterMap[item.id]"
          :tags="item.tags"
          @changeHandler="addCounter"></Card>
          <div class="pullup" v-if="finished">下拉刷新</div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-loading class="center" size="1rem" v-else  vertical color="pink"></van-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Card from './card.vue';
// n 测试数据
export default {
  components: {
    Card,
  },
  data() {
    return {
      showLoading: false,
      type: 'all',
      isLoad: false,
      finished: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions(['getGoodsList']),
    addCounter(id, value) {
      if (this.counterMap[id]) {
        this.$set(this.counterMap, id, this.counterMap[id] + value);
      } else {
        this.$set(this.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(this.counterMap));
    },
    onLoad() {
      if (this.finished) {
        return;
      }
      this.getGoodsList().then(() => {
        this.loading = false;
        this.showLoading = false;
        if (this.list.length >= this.total) {
          this.finished = true;
        }
      });
    },
    changeType(val) {
      if (val === 'price') {
        if (this.type === 'price-up') {
          this.type = 'price-down';
        } else {
          this.type = 'price-up';
        }
      } else {
        this.type = val;
      }
      this.showLoading = true;
      setTimeout(() => {
        this.finished = false;
        this.isloading = false;
        this.list.sort();
        this.isLoad = false;
        this.showLoading = false;
      }, 300);
    },
    onRefresh() {
      this.showLoading = true;
      setTimeout(() => {
        this.finished = false;
        this.isloading = false;
        this.isLoad = false;
        this.onLoad();
      }, 300);
    },
    up() {
    },
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
      list: (state) => state.goodsList,
      total: (state) => state.goodsTotal,
      goodsType: (state) => state.goodsType,
    }),
  },
  watch: {
    goodsType() {
      this.finished = false;
    },
  },
};
</script>

<style lang="less" scoped>
  .list-wrapper {
    position: fixed;
    border-top: 1px solid #eee;
    top: 135px;
    right: 0;
    width: 296px;
    bottom: 1.33333rem;
    overflow: auto;
    .list-header {
      position: sticky;
      top: 0;
      height: 25px;
      width: 280px;
      padding: 0 8px;
      margin: 0 auto;
      border-bottom: 1px solid #eee;
      display: flex;
      font-size: 12px;
      justify-content: flex-end;
      z-index: 100;
      background: #fff;
      > div {
        height: 25px;
        line-height: 25px;
        width: 50px;
        text-align: center;
        color: #aaa;
        position: relative;
      }
      .active, .price-up, .price-down {
        color: #d13193;
        font-weight: bold;
      }
      .price::after {
        content: '';
        border: 4px solid transparent;
        border-top-color: #aaa;
        position: absolute;
        bottom: 4px;
        right: 0;
      }
      .price::before {
        content: '';
        border: 4px solid transparent;
        border-bottom-color: #aaa;
        position: absolute;
        top: 4px;
        right: 0;
      }
      .price-up::before {
        border-bottom-color: #d13193;
      }
      .price-down::after {
        border-top-color: #d13193;
      }
    }
    .list-content {
      height: 300px;
      position: relative;
      .list-item {
        background: red;
        border-bottom: 1px solid white;
      }
    }
  }
  .list::-webkit-scrollbar{
    width: 0px;
    background: none;
  }
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
  .van-pull-refresh {
    overflow: unset;
  }

  .overflow-hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pullup {
    width: 100%;
    height: 100px;
    background: lime;
    display: none;
  }
</style>
