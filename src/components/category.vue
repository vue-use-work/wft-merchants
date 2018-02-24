<style scoped>
  @import "../assets/css/home.css";
</style>
<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex=== index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">{{ item.productCategory.category_name }}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.productCategory.category_name }}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="(food,ind) in item.productList" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.product_pic_url"/>
              </div>
              <div class="contente">
                <h2 class="name">{{ food.product_name }}</h2>
                <p class="desc">单价：{{ food.product_supply_price }}元</p>
                <div class="extra"><span class="count">单位：1{{food.product_unit}}</span></div>
                <div class="price">
                  <a @click="modifyPrice(food,$event)" href="javascript:;">调价</a>
                  <a v-show="food.on_shelf == 0" @click="theShelves(food,$event,index,ind)" href="javascript:;">上架</a>
                  <a v-show="food.on_shelf == 1" @click="ofTheShelf(food,$event,index,ind)" href="javascript:;">下架</a>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <footer class="mui-footer">
      <footer class="mui-footer">
        <router-link class="mui-bar-tab-cell" :to="{ path: '/'}">
          <i class="iconfont icon-shouyeicon"></i>
          <p class="tis">首页</p>
        </router-link>
        <a href="javascript:;" class="mui-bar-tab-cell">
          <i class="iconfont icon-zhinanzhen1"></i>
          <p class="tis">发现</p>
        </a>
        <router-link class="mui-bar-tab-cell active" :to="{ path: 'userCenter'}">
          <i class="iconfont icon-user"></i>
          <p class="tis">我的</p>
        </router-link>
      </footer>
    </footer>

  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import md5 from 'md5'
  import axios from '../http/axios'
  import { Toast } from 'mint-ui'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      if(localStorage.token == '' || localStorage.token == undefined){
        this.$router.push({ path: 'noToken'})
      }
      let obj = {apiKey: "api_key_test", check_flag: '8888', phone: '13636508888', 'user.sendValidateCode': ''};
      this.getGoodsInfo();
    },
    methods: {
      getGoodsInfo: async function() {
        let apiCode = 'web.shopUser.productList'
        let token = md5('apiKey=wft_web&'+apiCode+'&098f6bcd4621d373cade4e832627b4f6')
        let testData = {
          "web.shopUser.productList":{
            token:token,
            apiKey:"wft_web",
            auth_token: localStorage.getItem("token")
          }
        }
        let datasss =  "data=" + JSON.stringify(testData);
        const resDataPost = await axios.post('/apicenter/'+apiCode+'/'+token,datasss)
        this.goods = resDataPost['web.shopUser.productList'].results;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      },

      //调价申请
      async modifyPrice(food, event)  {
        console.log(food)
        this.$router.push({ path: 'adjustPrice', query: { params: JSON.stringify(food) }})
      },

      //上架商品申请
      async theShelves(food, event,index,ind) {
        console.log("theShelves")
        let apiCode = 'web.shopUser.onShelfProductApply'
        let token = md5('apiKey=wft_web&'+apiCode+'&098f6bcd4621d373cade4e832627b4f6')
        let testData = {
          "web.shopUser.onShelfProductApply":{
            token:token,
            apiKey:"wft_web",
            auth_token: localStorage.getItem("token"),
            product_code: food.product_code
          }
        }
        let datasss =  "data=" + JSON.stringify(testData);
        const resDataPost = await axios.post('/apicenter/'+apiCode+'/'+token,datasss)
        let response = resDataPost['web.shopUser.onShelfProductApply']
        if(response.isSuccess == true){
          //this.goods[index].productList[ind].on_shelf = 1
          Toast({
            message: response.msg,
            iconClass: 'icon icon-success'
          });

        }else{
          Toast({
            message: response.msg,
            iconClass: 'icon icon-success'
          });
        }
      },

      //下架商品申请
      async ofTheShelf(food, event,index,ind) {
        console.log("ofTheShelf")
        let apiCode = 'web.shopUser.offShelfProductApply'
        let token = md5('apiKey=wft_web&'+apiCode+'&098f6bcd4621d373cade4e832627b4f6')
        let testData = {
          "web.shopUser.offShelfProductApply":{
            token:token,
            apiKey:"wft_web",
            auth_token: localStorage.getItem("token"),
            product_code: food.product_code
          }
        }
        let datasss =  "data=" + JSON.stringify(testData);
        const resDataPost = await axios.post('/apicenter/'+apiCode+'/'+token,datasss)
        let response = resDataPost['web.shopUser.offShelfProductApply']
        if(response.isSuccess == true){
          //this.goods[index].productList[ind].on_shelf = 0
          Toast({
            message: response.msg,
            iconClass: 'icon icon-success'
          });

        }else{
          Toast({
            message: response.msg,
            iconClass: 'icon icon-success'
          });
        }
      },

      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        //console.log(food)
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 体验优化，异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);// -------------
        });
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  };
</script>

<style lang="sass" scoped>
  //@import "../assets/css/elm.css"
  .goods
    display: flex
    position: absolute
    top: 0px
    bottom: 50px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 100px
      width: 100px
      background: #f5f5f5
      .menu-item
        display: table
        height: 55px
        width: 100px
        text-align: center
        line-height: 14px
        color: #666
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: bold
          border-left: #0092ed 3px solid
          color: #333
          .text
            border: none
        .icon-wrapper
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 2px
          vertical-align: top
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-bottom: #ebebeb 1px solid
          font-size: 12px
    .foods-wrapper
      background: #fff
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #ebebeb
      .food-item
        display: flex
        margin: 15px 0 15px 10px
        border-bottom: 1px solid #ddd
        &:last-child
          border: none
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .contente
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            display: flex
            flex-flow: row-reverse
            margin: 0.2rem 0 0.2rem
            a
              padding: 1px 15px
              border: 1px solid #158fda
              color: #158fda
              background: #fff
              border-radius: 3px
              margin-right: 10px
              font: 12px/20px '微软雅黑'
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
