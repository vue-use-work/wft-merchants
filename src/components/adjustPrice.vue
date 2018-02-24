<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/home.css";
  section.adjustPrice{display: flex; flex-direction: column }
  .adjustPrice p{border-bottom:1px solid #ddd; display: flex;}
  .adjustPrice p:last-child{border: none; }
  .adjustPrice p em{flex: 1; font: 0.23rem/1rem '宋体'; text-align: right;color: #333}
  .adjustPrice p input[type='text'],.adjustPrice p span{flex: 3.5; font:bold 0.23rem/0.6rem '宋体'; text-align: left; padding-left: 10px; border: none; color: #666}
  .adjustPrice p span{display: flex; flex-direction: row-reverse;align-items: center; padding-right: 20px;}
  .adjustPrice p span input[type='radio']{width: 0.5rem; height: 0.5rem; font-size: 0.5rem; margin: 0.2rem 0.5rem 0 0 }
  .adjustPrice p span input.active{color: #0fc179}
  .adjustPrice p a{flex: 3.5; font: bold 0.27rem/0.8rem '宋体'; text-align: left; background: #e76207; color: #fff; border-radius: 3px; margin: 20px; text-align: center;}
</style>

<template>
<div class="ss">
  <section class="adjustPrice">
    <p><em>菜品名称:</em><input type="text" v-model="params.product_name" /></p>
    <p><em>分类:</em><input type="text"  v-model="params.category_name" /></p>
    <p><em>单价:</em><input style="-webkit-user-select:auto; " type="text" v-model="params.product_supply_price" /></p>
    <!--<p><em>重量:</em><input type="text"  v-model="params.product_unit"></p>-->
    <p>
      <em>是否上架:</em>
      <span class="radio">
        <!--<input name="shelf" type="radio" v-model="params.on_shelf" class="iconfont icon-radio" :class="{active: params.on_shelf == 1}">-->
        <!--<yd-switch slot="right" v-model="shelfSwitch"></yd-switch>-->
        <mt-switch v-model="shelfSwitch"></mt-switch>
      </span>
    </p>
    <p><a href="javascript:;" @click="adjustPrice">提交</a></p>

  </section>

</div>
</template>

<script>
import md5 from 'md5'
import axios from '../http/axios'
import { Switch } from 'mint-ui'
export default {
  name: 'HelloWorld',
  data () {
    return {
      params: JSON.parse(this.$route.query.params),
      shelfSwitch: true
    }
  },
  created() {
    if(localStorage.token == '' || localStorage.token == undefined){
      this.$router.push({ path: 'noToken'})
    }
    if(this.params.on_shelf == 1){
      this.shelfSwitch = true
    }else {
      this.shelfSwitch = false
    }

  },
  methods: {
    adjustPrice: async function () {
      if(this.shelfSwitch == true){
        this.shelfSwitch = 1
      }else {
        this.shelfSwitch = 0
      }
      let apiCode = 'web.shopUser.updateProductApply'
      let token = md5('apiKey=wft_web&' + apiCode + '&098f6bcd4621d373cade4e832627b4f6')
      let testData = {
        "web.shopUser.updateProductApply": {
          token: token,
          apiKey: "wft_web",
          auth_token: localStorage.getItem("token"),

          product_code: this.params.product_code,
          supply_price: this.params.product_supply_price,
          on_shelf: this.shelfSwitch
        }
      }
      let datasss = "data=" + JSON.stringify(testData);
      const resDataPost = await axios.post('/apicenter/' + apiCode + '/' + token, datasss)
      if (resDataPost['web.shopUser.updateProductApply'].isSuccess == true){
        this.$router.push({ path: 'category'})
      }
    },


  }
}
</script>
