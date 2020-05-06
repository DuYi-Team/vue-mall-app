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
          <div @click="onSearch">搜索</div>
        </template>
         <template #action v-else>
          <div @click="onSearch" class="shop-car"><van-icon name="shopping-cart-o" badge="9"/></div>
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
    <van-card
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    >
    <template #tags>
    <van-tag plain type="danger">标签</van-tag>
    <van-tag plain type="danger">标签</van-tag>
    </template>
    <template #footer>
    <van-button size="mini">+</van-button>
    <span>2</span>
    <van-button size="mini">-</van-button>
  </template>
</van-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      place: '芒果10块2斤',
      likeList: [],
      showList: true,
    };
  },
  methods: {
    onSearch() {
      this.likeList = [];
      if (this.value === '') {
        this.value = this.place;
      }
      this.showList = false;
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
};
</script>

<style lang="less">
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: white;
  .search-head {
    width: 345px;
    margin: 0 auto;
    display: flex;
    align-items: center;
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
}
.like-search {
  margin-left: 30px;
}
</style>
