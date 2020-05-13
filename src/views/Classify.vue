<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" to="/search" tag="div">
      <van-icon name="search" />
      <div class="search-value">{{place}}</div>
    </router-link>
    <!-- 水平滚动 -->
   <Tabs></Tabs>
   <div class="classify-content">
     <side-bar ref="sb"></side-bar>
     <List></List>
   </div>
  </div>
</template>

<script>
import Tabs from '../components/Tab.vue';
import sideBar from '../components/sideBar.vue';
import List from '../components/List.vue';

export default {
  data() {
    return {
      value: '',
      place: '荔枝水果9.99',
      activeKey: '',
      tabList: [
        {
          title: '时令水果',
          imgURL: 'http://img.doutula.com/production/uploads/image/2019/01/06/20190106741096_PBvKXO.jpg',
        },
        {
          title: '时令水果',
          imgURL: 'http://img.doutula.com/production/uploads/image/2019/01/06/20190106741096_PBvKXO.jpg',
        },
        {
          title: '时令水果',
          imgURL: 'http://img.doutula.com/production/uploads/image/2019/01/06/20190106741096_PBvKXO.jpg',
        },
        {
          title: '时令水果',
          imgURL: 'http://img.doutula.com/production/uploads/image/2019/01/06/20190106741096_PBvKXO.jpg',
        },
      ],
    };
  },
  components: {
    Tabs,
    sideBar,
    List,
  },
  methods: {
    bindToSearch() {

    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.sb.sb();
    }, 3000);
  },
};
</script>

<style lang="less" scoped>
// @import "../tools/tools.less";
.classify-wrapper {
  width: 100%;
  min-height: 100vh;
  position: absolute;
  font-size: 14px;
  // overflow: hidden;
  .search-btn {
    height: 31.5px;
    line-height: 31.5px;
    width: 355px;
    margin: 10.76px auto 0;
    background: #eee;
    border-radius: 10px;
    text-align: center;
    color: #a1a1a1;
    >* {
      vertical-align: middle;
      display: inline-block;
    }
  }
}
.tabs-wrapper {
  display: flex;
  height: 67.5px;
  margin: 11px 0 10px;
}

</style>

<style>

</style>
