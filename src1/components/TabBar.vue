<template>
  <van-tabbar route fixed>
    <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item name="search" icon="apps-o" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item name="friends" icon="cart-o" to="/home/shopping"
    id="shop-car" :badge="badge">购物车</van-tabbar-item>
    <van-tabbar-item name="setting" icon="user-circle-o" to="/other">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      active: 'home',
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const l = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (l > 99) {
        return '99+';
      }
      return l;
    },
  },
};
</script>

<style lang="less" scoped></style>
