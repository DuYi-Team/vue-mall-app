<template>
  <div class="shopping">
    <div class="top-nav">
      <van-nav-bar
      title="购物车"
      right-text="删除"
      @click-right="del"
    />
    </div>
    <div class="card-list" v-if="this.list.length !== 0">
      <van-checkbox-group v-model="result"  ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <Card
          :id="item.id"
          :title="item.title"
          :desc="item.desc"
          :priceOff="item.priceOff"
          :price="item.price"
          :thumb="item.img"
          :num="counterMap[item.id]"
          :tags="item.tags"
          @changeHandler="addCounter"></Card>
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-list" v-else>啥也米有</div>
    <van-submit-bar :price="allMoney" :button-text="`去结算(${totalNum})`" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from '../components/card.vue';

export default {
  data() {
    return {
      checked: false,
      result: [],
      list: [
        {
          id: 0,
          img: 'http://img.doutula.com/production/uploads/image/2020/05/12/20200512281863_hNPXgv.jpg',
          title: '据说苹果很好吃 木大木大木大大',
          price: 99.9,
          priceOff: 33.3,
          desc: '据说苹果很好吃 木大木大木大大',
          tags: ['24小时发货'],
          sale: 10000,
        },
        {
          id: 1,
          img: 'http://img.doutula.com/production/uploads/image/2020/05/12/20200512281863_hNPXgv.jpg',
          title: '据说苹果很好吃 木大木大木大大',
          price: 99.9,
          priceOff: 33.3,
          desc: '据说苹果很好吃 木大木大木大大',
          tags: ['24小时发货'],
          sale: 10000,
        },
        {
          id: 2,
          img: 'http://img.doutula.com/production/uploads/image/2020/05/12/20200512281863_hNPXgv.jpg',
          title: '据说苹果很好吃 木大木大木大大',
          price: 99.9,
          priceOff: 33.3,
          desc: '据说苹果很好吃 木大木大木大大',
          tags: ['24小时发货'],
          sale: 10000,
        },
        {
          id: 3,
          img: 'http://img.doutula.com/production/uploads/image/2020/05/12/20200512281863_hNPXgv.jpg',
          title: '据说苹果很好吃 木大木大木大大',
          price: 99.9,
          priceOff: 33.3,
          desc: '据说苹果很好吃 木大木大木大大',
          tags: ['24小时发货'],
          sale: 10000,
        },
        {
          id: 4,
          img: 'http://img.doutula.com/production/uploads/image/2020/05/12/20200512281863_hNPXgv.jpg',
          title: '据说苹果很好吃 木大木大木大大',
          price: 99.9,
          priceOff: 33.3,
          desc: '据说苹果很好吃 木大木大木大大',
          tags: ['24小时发货'],
          sale: 10000,
        },
        {
          id: 5,
          img: 'http://img.doutula.com/production/uploads/image/2020/05/12/20200512281863_hNPXgv.jpg',
          title: '据说苹果很好吃 木大木大木大大',
          price: 99.9,
          priceOff: 33.3,
          desc: '据说苹果很好吃 木大木大木大大',
          tags: ['24小时发货'],
          sale: 10000,
        },
        {
          id: 6,
          img: 'http://img.doutula.com/production/uploads/image/2020/05/12/20200512281863_hNPXgv.jpg',
          title: '据说苹果很好吃 木大木大木大大',
          price: 99.9,
          priceOff: 33.3,
          desc: '据说苹果很好吃 木大木大木大大',
          tags: ['24小时发货'],
          sale: 10000,
        },
        {
          id: 7,
          img: 'http://img.doutula.com/production/uploads/image/2020/05/12/20200512281863_hNPXgv.jpg',
          title: '据说苹果很好吃 木大木大木大大',
          price: 99.9,
          priceOff: 33.3,
          desc: '据说苹果很好吃 木大木大木大大',
          tags: ['24小时发货'],
          sale: 10000,
        },
      ],
    };
  },
  components: {
    Card,
  },
  methods: {
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    addCounter(id, value) {
      if (this.counterMap[id]) {
        this.$set(this.counterMap, id, this.counterMap[id] + value);
      } else {
        this.$set(this.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(this.counterMap));
    },
    del() {
    },
    onSubmit() {
    },
    getAllData() {
      const result = Object.entries(this.counterMap);
      const arr = result.map(([key]) => new Promise((resolve) => {
        resolve(key);
      }));
      Promise.all(arr).then((data) => {
        this.list = data;
      });
    },
  },
  watch: {
    counterMap() {
      // this.getAllData();
    },
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    totalNum() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce((prev, next) => prev + this.counterMap[next.id] || 0, 0);
      return res;
    },
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => Math.round(
        (this.counterMap[next.id] || 0) * next.priceOff * 100,
      ) + prev, 0);
    },
  },
  mounted() {
    this.$refs.checkboxGroup.toggleAll(true);
  },
};
</script>
<style lang="less" scoped>
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .shopping {
    background: #eee;
    min-height: 100vh;
  }
  .card-list {
    width: 330px;
    margin: 50px auto 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .card-box {
    display: flex;
    justify-content: center;
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
    }
  }
</style>

<style>
.shopping > .van-submit-bar {
  bottom: 50px;
}
</style>
