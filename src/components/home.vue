<style scoped>
@import "../assets/css/home.css";
</style>
<template>
  <div class="" >
    <section class="mui-body">
      <div class="center-header">
        <div class="center-userinfo">
          <img :src="shop_pic_url" class="face mui-tv-img">
          <p class="mui-label">{{shop_name}}</p>
        </div>
      </div>
      <div class="mui-grids">
        <router-link class="grid" :to="{ path: 'category'}">
          <i class="iconfont icon-42diaojiashoucang"></i>
          <p class="mui-label">申请调价</p>
        </router-link>
        <a href="javascript:;" class="grid">
        <!--<a href="/materials" class="grid">-->
          <i class="iconfont icon-wuliaoxinjian"></i>
          <p class="mui-label">申请物料</p>
        </a>
        <a href="javascript:;" class="grid">
        <!--<a href="/adjustPrice" class="grid">-->
          <i class="iconfont icon-tianjiashangpin"></i>
          <p class="mui-label">申请添加商品</p>
        </a>
        <router-link class="grid" :to="{ path: 'recordsPrice'}">
          <i class="iconfont icon-tiaozhengjiage"></i>
          <p class="mui-label">调价申请记录</p>
        </router-link>
        <a href="javascript:;" class="grid">
          <i class="iconfont icon-materiel"></i>
          <p class="mui-label">物料申请记录</p>
        </a>
        <router-link class="grid" :to="{ path: 'recordsSettlement'}">
          <i class="iconfont icon-meituan"></i>
          <p class="mui-label">美团结算记录</p>
        </router-link>
      </div>

    </section>
    <footer class="mui-footer">
        <router-link class="mui-bar-tab-cell active" :to="{ path: '/'}">
          <i class="iconfont icon-shouyeicon"></i>
          <p class="tis">首页</p>
        </router-link>
        <a href="javascript:;" class="mui-bar-tab-cell">
          <i class="iconfont icon-zhinanzhen1"></i>
          <p class="tis">发现</p>
        </a>
        <router-link class="mui-bar-tab-cell" :to="{ path: 'userCenter'}">
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
