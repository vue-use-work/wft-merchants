<style scoped>
.error{display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; flex-direction: column}
.error imgWalp{display: flex;}
.error p{display: flex; font: 14px/35px '宋体'}
</style>
<template>
  <div class="error">
    <div class="imgWalp">
      <img src="http://js.888pic.com/revision/img/offshelf.png" alt="未找到相关作品">
    </div>
    <p>{{msg}}</p>
    <p><a href="javascript:;" class="sea-feedback-btn">请联系我们</a>告知错误内容吧</p>
  </div>
</template>

<script>
import md5 from 'md5'
import axios from '../http/axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: this.$route.query.msg
    }
  },
}
</script>
