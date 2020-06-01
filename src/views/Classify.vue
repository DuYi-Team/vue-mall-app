<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" to="/search" tag="div">
      <van-icon name="search" />
      <div class="search-value">{{place}}</div>
    </router-link>
    <!-- 水平滚动 -->
   <Tabs @handlerChange="getSide"></Tabs>
   <div class="classify-content" v-if="show">
     <side-bar ref="nb" :menuList="sideList" ></side-bar>
     <List @turnNext="nextSibling" v-if="listShow"></List>
   </div>
   <van-loading class="center" size="1.3rem" color="pink" v-else />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Tabs from '../components/Tab.vue';
import sideBar from '../components/sideBar.vue';
import List from '../components/List.vue';

export default {
  async created() {
    await this.getSideList(this.value);
    this.listShow = true;
  },
  data() {
    return {
      value: '时令水果',
      listShow: false,
      show: true,
      place: '荔枝水果9.99',
      activeKey: '',
    };
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  components: {
    Tabs,
    sideBar,
    List,
  },
  methods: {
    ...mapActions(['getSideList']),
    getSide(value) {
      this.show = false;
      this.getSideList(value)
        .then(() => {
          setTimeout(() => {
            this.show = true;
          }, 500);
        });
    },
    nextSibling() {
      this.$refs.nb.nb();
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.$refs.sb.sb();
    // }, 3000);
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
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
