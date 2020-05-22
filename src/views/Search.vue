<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()"></van-icon>
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
        autofocus
      >
        <template #action v-if="showList">
          <div @click="onSearch(value)">搜索</div>
        </template>
         <template #action v-else>
          <router-link tag="div" class="shop-car" id="shop-car" to="/home/shopping">
            <van-icon name="shopping-cart-o" :badge="badge"/>
          </router-link>
        </template>
      </van-search>
    </div>
    <div class="like-search" v-if="likeList.length && showList">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" :title="item" @click="onSearch(item)" >
          <template #title>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-card" v-if="!showList">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <Card v-for="(item, i) in list" :key="i"
        :id="item.id"
        :title="item.title"
        :desc="item.desc"
        :priceOff="item.priceOff"
        :price="item.price"
        :thumb="item.img"
        :num="counterMap[item.id]"
        :tags="item.tags"
        @changeHandler="addCounter"></Card>
    </van-list>
    </div>
    <div class="history">
       <History :searchList="searchList" @search="onSearch"></History>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from '../components/card.vue';
import History from '../components/history.vue';

export default {
  components: {
    Card,
    History,
  },
  data() {
    return {
      searchList: [],
      loading: false,
      finished: false,
      value: '',
      length: 0,
      place: '芒果10块2斤',
      likeList: [],
      showList: true,
      list: [],
    };
  },
  methods: {
    addCounter(id, value) {
      if (this.counterMap[id]) {
        this.$set(this.counterMap, id, this.counterMap[id] + value);
      } else {
        this.$set(this.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(this.counterMap));
    },
    onSearch(val) {
      if (val) {
        this.value = val;
      }
      this.likeList = [];
      if (this.value === '') {
        this.value = this.place;
      }
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.$api.Search(this.value).then((data) => {
        this.length = data.data.total;
        this.list = [...this.list, ...data.data.list];
        this.showList = false;
      });
    },
    onLoad() {
      this.$api.Search(this.value).then((data) => {
        this.length = data.data.total;
        this.list = [...this.list, ...data.data.list];
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= this.length) {
          this.finished = true;
        }
      });
    },
    input() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      this.$api.likeSearch(this.value).then((data) => {
        this.likeList = data.data.result;
      });
    },
    formatHTML(value) {
      const reg = new RegExp(this.value, 'g');
      return value.replace(reg, this.value.fontcolor('red'));
    },
    focus() {
      this.showList = true;
    },
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const l = Object.values(this.counterMap).reduce((prev, next) => prev + next);
      if (l > 99) {
        return '99+';
      }
      return l;
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
};
</script>

<style lang="less">
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    left: 15px;
    top: 0;
    z-index: 100;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car {
        font-size: 25px;
      }
    }
  }
  .like-search {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    background: #fff;
    z-index: 10;
  }
  .goods-card {
    position: relative;
    width: 345px;
    margin: 43px auto 0;
    z-index: 10;
    background: #fff;
  }
  .history {
    width: 350px;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}

</style>
