<template>
  <div class="tab-wrapper" ref="scroll"
  @touchend="scrollTo"
  @touchstart="move = false"
  @touchmove="move = true">
   <div class="tab-item"
   v-for="(item, i) in menuList"
   :key="item.title"
   :class="{'active': i == index}"
   :data-id="i">
     <div class="img-box">
       <img :src="item.imgURL">
     </div>
     <div class="title-box">{{item.title}}</div>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '粮油调味',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '某手美食',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '个人护理',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '美妆护肤',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '图书玩具',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'http://img.doutula.com/production/uploads/image/2020/05/06/20200506726142_SUbHxC.jpg',
        },
      ],
    };
  },
  methods: {
    scrollTo(e) {
      if (this.move) return;
      if (e.target.dataset.id) {
        this.index = e.target.dataset.id;
      } else if (e.target.parentElement.dataset.id) {
        this.index = e.target.parentElement.dataset.id;
      } else {
        this.index = e.target.parentElement.parentElement.dataset.id;
      }
      this.$emit('handlerChange', this.menuList[this.index].title);
      const itemOL = e.target.getBoundingClientRect().left;
      const itemOW = e.target.offsetWidth;
      const wrapperWidth = this.$refs.scroll.clientWidth;
      const changeDisX = itemOL - wrapperWidth / 2 + itemOW / 2;
      this.moveScroll(this.$refs.scroll.scrollLeft, changeDisX);
    },
    moveScroll(start, end) {
      let dis = 0;
      let speed = 5;
      if (end < 0) {
        speed *= -1;
      }
      const t = setInterval(() => {
        dis += speed;
        this.$refs.scroll.scrollLeft = start + dis;
        if (Math.abs(dis) >= Math.abs(end)) {
          this.$refs.scroll.scrollLeft = start + end;
          clearInterval(t);
        }
      }, 2);
    },
  },
};
</script>

<style lang="less" scoped>
  .tab-wrapper {
    display: flex;
    height: 92.5px;
    overflow-x: auto;
    overflow-y: visible;
    .tab-item {
      flex-shrink: 0;
      width: 50px;
      padding: 10px 5px;
      text-align: center;
      .img-box {
        width: 100%;
        height: 50px;
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        border-radius: 23px;
        img {
          width: 35px;
          height: 35px;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .title-box {
        margin-top: 5px;
        font-size: 12px;
      }
    }
    .active {
      .img-box {
        background: #fff;
        border-color: #d13193;
      }
      .title-box {
        color: #fff;
        background: #d13193;
        font-weight: bold;
        border-radius: 30px;
      }
    }
  }
  .tab-wrapper::-webkit-scrollbar{
    width: 0px;
    background: none;
  }
</style>
