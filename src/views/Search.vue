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
      autofocus>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      place: '芒果10块2斤',
    };
  },
  methods: {
    onSearch() {

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
    }
  }
}
</style>
