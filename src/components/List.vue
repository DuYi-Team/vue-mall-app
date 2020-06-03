<template>
  <div class="list-wrapper"
  @touchstart="disB=0"
  @touchmove="up"
  @touchend="end"
  ref="wrapper">
    <div class="list-header">
      <div :class="{active: type === 'all'}" @touchend="changeType('all')">综合</div>
      <div :class="{active: type === 'sale'}" @touchend="changeType('sale')">销量</div>
      <div
      class="price"
      :class="{'price-up': type==='price-up', 'price-down': type === 'price-down'}"
      @touchend="changeType('price')">价格</div>
    </div>
    <div class="list-content"
    v-if="!showLoading" :style="{transform: `translateY(-${this.disB}px)`}" ref="list">
      <van-pull-refresh v-model="isLoad" @refresh="onRefresh" head-height="80">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :finished-text="msg"
        >
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
          :fly="true"
          @changeHandler="addCounter"></Card>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-loading class="center" size="1rem" v-else  vertical color="pink"></van-loading>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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
      disB: 0,
      pageY: 0,
      msg: '上拉查看下一分类',
      nowPage: 1,
    };
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetList', 'sortGoodsList']),
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
      this.nowPage += 1;
      this.getGoodsList({ type: this.goodsType, page: this.nowPage }).then(() => {
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
      this.sortGoodsList(this.type);
      this.showLoading = true;
      this.$nextTick(() => {
        this.finished = false;
        this.isloading = false;
        this.list.sort();
        this.isLoad = false;
        this.showLoading = false;
      });
    },
    onRefresh() {
      this.nowPage = 0;
      this.showLoading = true;
      this.resetList();
      setTimeout(() => {
        this.finished = false;
        this.isloading = false;
        this.isLoad = false;
        this.onLoad();
      }, 300);
    },
    up(e) {
      const { wrapper } = this.$refs;
      let speed = 5;
      if (wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) {
        if (e.touches[0].pageY > this.pageY) {
          speed = -5;
        } else {
          speed = 5;
        }
        this.pageY = e.touches[0].pageY;
        this.disB += speed;
        if (this.disB >= 150) {
          this.disB = 150;
        }
        if (this.disB >= 90) {
          this.msg = '释放查看下一分类';
        } else {
          this.msg = '上拉查看下一分类';
        }
        if (this.disB <= 0) {
          this.disB = 0;
        }
        // list.style.transform = `translateY(-${this.disB}px)`;
      }
    },
    end() {
      const { list } = this.$refs;
      if (!list) {
        return;
      }
      if (this.disB > 100) {
        this.$emit('turnNext');
      }
      this.disB = 0;
      this.msg = '上拉查看下一分类';
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
      this.nowPage = 1;
    },
  },
};
</script>

<style lang="less" scoped>
  .list-wrapper {
    transform: translateY(0);
    transition: all 2s;
    position: fixed;
    border-top: 1px solid #eee;
    top: 135px;
    right: 0;
    width: 296px;
    bottom: 50px;
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
        color: #ff1a90;
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
        border-bottom-color: #ff1a90;
      }
      .price-down::after {
        border-top-color: #ff1a90;
      }
    }
    .list-content {
      position: relative;
      transition: translateY .3s;
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
</style>
