<style scoped>
@import "../assets/css/home.css";
.user-center ul{margin: 10px;}
.user-center ul li{padding-left: 10px; display: flex; align-items: center; border-bottom: 1px #ddd solid;font: bold 0.25rem/1rem '宋体';}
.user-center ul li img{height: 1.5rem; width: 1.5rem;  border-radius: 1.5rem; margin-right: 20px;}
.user-center ul li.head{padding: 10px 0;}
.user-center ul li a{width: 100%; display: block; text-align: left;}
.user-center ul li i{float: right; margin-right: 20px; color: #999}
</style>
<template>
  <div  style="height: 100%;">
    <section class="user-center">
      <div class="header"></div>
      <ul class="list">

        <li class="head"><img :src="shop_pic_url" class="face mui-tv-img">{{shop_name}}</li>
        <li>
          <router-link :to="{ path: 'category'}">申请调价<i class="iconfont icon-arrow"></i></router-link>
        </li>
        <li>
          <router-link :to="{ path: 'recordsPrice'}">调价申请记录<i class="iconfont icon-arrow"></i></router-link>
        </li>
        <li>
          <router-link :to="{ path: 'recordsSettlement'}">美团结算记录<i class="iconfont icon-arrow"></i></router-link>
        </li>
      </ul>
    </section>
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

<script>
  import md5 from 'md5'
  import axios from '../http/axios'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        shop_name: localStorage.shop_name || undefined,
        shop_pic_url:  localStorage.shop_pic_url || undefined,
      }
    },
    created() {
      if(localStorage.token == '' || localStorage.token == undefined){
        this.$router.push({ path: 'noToken'})
      }
    },
  }
</script>
