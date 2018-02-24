<style scoped>
@import "../assets/css/home.css";
  .records{
    background:#f9f9f9;
    height: 100%;
    padding: 10px;
  }
  .records ul li{border: 1px solid #e5e1de; border-radius: 3px; margin-top: 10px;}
.records ul li .time{ background: #f1f1f1; padding-left: 10px; font: 0.2rem/0.5rem '宋体'; display: flex}
.records ul li .con{ background: #fbfbf840; padding: 10px; }
.records ul li .con p{font: 0.2rem/0.5rem '宋体'; display: flex; }
.records ul li .con p span{flex: 1; flex-direction: row-reverse; color: #e25945;display: flex;}
</style>
<template>
  <div  style="height: 100%;">
    <section class="records">
      <ul style="margin-bottom: 50px">
        <li v-for="item in goods">
          <span class="time">结算时间: {{item.bill_date}}</span>
          <div class="con">
            <p>店铺名: {{item.shop_name}}</p>
            <p>订单数: {{item.total_order_num}} <span>合计：{{item.total_amount}}元</span></p>
          </div>
        </li>

      </ul>
    </section>
    <footer class="mui-footer">
      <router-link class="mui-bar-tab-cell" :to="{ path: '/',query: {'auth_token': auth_token}}">
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
  </div>

</template>

<script>
import md5 from 'md5'
import axios from '../http/axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      goods:''
    }
  },

  created() {
    if(localStorage.token == '' || localStorage.token == undefined){
      this.$router.push({ path: 'noToken'})
    }
    this.getRecordsSettlement();
  },
  methods: {
    getRecordsSettlement: async function (status) {
      let apiCode = 'web.shopUser.billInfoList'
      let token = md5('apiKey=wft_web&' + apiCode + '&098f6bcd4621d373cade4e832627b4f6')
      let testData = {
        "web.shopUser.billInfoList": {
          token: token,
          apiKey: "wft_web",
          auth_token: localStorage.getItem("token"),
        }
      }
      let datasss = "data=" + JSON.stringify(testData);
      const resDataPost = await axios.post('/apicenter/' + apiCode + '/' + token, datasss)
      this.goods = resDataPost['web.shopUser.billInfoList'].results;
    }

  }
}
</script>
