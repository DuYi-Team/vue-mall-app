<template>
  <div id="app">
    <transition :name="transitionName" :mode="$router.back ? 'out-in' : 'in-out'">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      transitionName: 'slide-left',
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.back = false;
    },
  },
};
</script>

<style>
  .view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all .3s linear;
}
.slide-left-enter {
  transform: translate(100%, 0);
}

.slide-right-leave-to {
  transform: translate(100%, 0);
}

/* .slide-left-leave-active {
  transform: translate(-100%, 0);
} */
</style>
