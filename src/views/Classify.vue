<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" to="/search" tag="div">
      <van-icon name="search" />
      <div class="search-value">{{place}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      place: '荔枝水果9.99',
    };
  },
  methods: {
    bindToSearch() {

    },
  },
};
</script>

<style lang="less" scoped>
// @import "../tools/tools.less";
.classify-wrapper {
  width: 100%;
  height: 100vh;
  background: rgb(238, 238, 238);
  // overflow: hidden;
  .search-btn {
    height: 31.5px;
    line-height: 31.5px;
    width: 355px;
    position: relative;
    top: 10.76px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    color: rgb(161, 161, 161);
    >* {
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
