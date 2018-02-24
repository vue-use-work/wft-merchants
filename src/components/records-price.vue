<style scoped>
@import "../assets/css/home.css";
.records-price-price{ background:#f9f9f9; height: 100%; padding: 10px; margin-bottom: 50px }
.records-price ul {padding: 0 10px 50px;}
.records-price ul li{border: 1px solid #e5e1de; border-radius: 3px; margin-top: 10px;}
.records-price ul li .tit{ background: #f1f1f1; padding:0 10px; font: 0.2rem/0.7rem '宋体'; display: flex}
.records-price ul li .tit span{flex: 1}
.records-price ul li .con{ background: #fff; padding: 10px; display: flex}
.records-price ul li .con .productImg{width: 2rem; height: 2rem;}
.records-price ul li .con .productImg img{width: 2rem; height: 2rem;}
.records-price ul li .dis{flex: 3; padding-left: 0.3rem;}
.records-price ul li .dis dt{font: bold 0.23rem/0.5rem '宋体'; color: #333; text-align: left;}
.records-price ul li .dis dd span{font: 0.2rem/0.5rem '宋体'; color: #666; display: flex}
.records-price ul li .con p{font: 0.2rem/0.5rem '宋体'; display: flex; }
.records-price ul li .con p span{flex: 1; flex-direction: row-reverse; color: #e25945;display: flex;}
.records-price ul li .delete{flex: 1; display: flex; justify-content:  center; align-items: center;font-size:14px; color: #333}
.records-price ul li .delete .iconfont{font-size: 24px}
.records-price .red{color: red!important;}
.mint-switch-input:checked .mint-switch-core{
  border-color: #e76207!important;
  background-color: #e76207!important;
}

.mui-tabs {
  overflow: hidden;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #ddd;
  background: #fff;
}
.mui-tab {
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  display: box;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
}
.mui-tab-cell {
  box-flex: 1;
  -webkit-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  height: 1.0rem;
  width: 100%;
  line-height: 1.0rem;
  font: 0.3rem/1rem '宋体';
  text-align: center;
  position: relative;

}
.mui-tab-cell.active:after {
  width: 100%;
  height: 3px;
  position: absolute;
  top: 0.95rem;
  left: 0;
  z-index: 9;
  background: red;
  content: "";
  display: block;
}
/*.mui-line-right:after, .mui-screen-cell:after, .mui-tab-cell:after {*/
  /*width: 100%;*/
  /*height: 1px;*/
  /*content: "";*/
  /*position: absolute;*/
  /*z-index: 9;*/
  /*display: block;*/
  /*pointer-events: none;*/
  /*width: 1px;*/
  /*height: 100%;*/
  /*top: 0;*/
  /*right: 0;*/
  /*background-size: 1px 50px;*/
/*}*/



</style>
<template>
  <div  style="height: 100%;">

    <div class="mui-tabs mui-margin-20-0">
      <ul class="mui-tab">
        <li class="mui-tab-cell" :class="{active: status == 'all'}" @click="getEditPriceRecords('all')">
          全部
        </li>
        <li class="mui-tab-cell" :class="{active: status == 'published'}" @click="getEditPriceRecords('published')">
          申请成功
        </li>
        <li class="mui-tab-cell" :class="{active: status == 'rejected'}" @click="getEditPriceRecords('rejected')">
          申请失败
        </li>
      </ul>
      <div class="mui-tab-line mui-grid-3"></div>
    </div>
    <section class="records-price">
      <ul>
        <li v-for="(item,index) in goods">
          <h3 class="tit">
            <span class="time">时间: {{item.update_time}}</span>
            <span class="num">编号:{{item.product_code}}</span>
          </h3>
          <div class="con">
            <div class="productImg"><img :src="item.product_pic_url" alt=""></div>
            <div class="dis">
              <dl>
                <dt>{{item.product_name}}</dt>
                <dd>
                  <span>分类:{{item.operate_type_desc}}</span>
                  <span>单价:{{item.supply_price}}元</span>
                  <span v-if="item.on_shelf == 1">上下架 :上架</span>
                  <span v-else>上下架 :下架</span>
                  <span class="red" v-if="item.check_failed_reason != null" >原因：{{item.check_failed_reason}}</span>
                </dd>
              </dl>
            </div>
            <a v-if="item.check_status == 'unpublished'" @click="deleteRecords(item.product_check_id,index)" href="javascript:;" class="delete"><i class="iconfont icon-delete"></i></a>
          </div>
        </li>

      </ul>
    </section>
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
  </div>

</template>

<script>
import md5 from 'md5'
import axios from '../http/axios'
import { Toast } from 'mint-ui'
export default {
  name: '',
  data() {
    return {
      recordsPricegoods: [],
      goods: [],
      status: 'all'
    }
  },
  created() {
    if(localStorage.token == '' || localStorage.token == undefined){
      this.$router.push({ path: 'noToken'})
    }
    this.getEditPriceRecords('all');
  },
  methods: {
    getEditPriceRecords: async function (status) {
      this.status = status
      let apiCode = 'web.shopUser.productCheckList'
      let token = md5('apiKey=wft_web&' + apiCode + '&098f6bcd4621d373cade4e832627b4f6')
      if(this.status == 'all'){
        var testData = {
          "web.shopUser.productCheckList": {
            token: token,
            apiKey: "wft_web",
            auth_token: localStorage.getItem("token"),
            check_status: ''
          }
        }
      }else {
        var testData = {
          "web.shopUser.productCheckList": {
            token: token,
            apiKey: "wft_web",
            auth_token: localStorage.getItem("token"),
            check_status: this.status
          }
        }
      }
      let datasss = "data=" + JSON.stringify(testData);
      const resDataPost = await axios.post('/apicenter/' + apiCode + '/' + token, datasss)
      this.goods = resDataPost['web.shopUser.productCheckList'].results;
    },

    deleteRecords: async function (id,index) {
      let apiCode = 'web.shopUser.deleteProductCheck'
      let token = md5('apiKey=wft_web&' + apiCode + '&098f6bcd4621d373cade4e832627b4f6')
      let testData = {
        "web.shopUser.deleteProductCheck": {
          token: token,
          apiKey: "wft_web",
          auth_token: localStorage.getItem("token"),
          product_check_id: id
        }
      }
      let datasss = "data=" + JSON.stringify(testData);
      const resDataPost = await axios.post('/apicenter/' + apiCode + '/' + token, datasss)

      let response = resDataPost['web.shopUser.deleteProductCheck']
      if(response.isSuccess == true){
        this.goods.splice(index, 1);
        Toast({
          message: '删除成功',
          iconClass: 'icon icon-success'
        });
      }else if(response.isSuccess == false){
        Toast({
          message: response.msg,
          iconClass: 'icon icon-success'
        });
      }


    },

  }
}
</script>
