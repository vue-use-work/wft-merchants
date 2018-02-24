
<template>
<div style="width: 100%; height: 100%;">
  <!--<section class="add-adress">-->
    <!--<input type="text" v-model="userName" >-->
    <!--<input type="text" v-model="password" >-->
  <!--</section>-->
  <p class="adressA"><img style="width:50px; margin-top: 100px;" src="../assets/image/loading.gif" alt=""></p>
</div>
</template>

<script>
import md5 from 'md5'
import axios from '../http/axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      userName: 'hey',
      password: '123456',
      auth_token: this.$route.query.auth_token
    }
  },
  created() {
    this.login();
    console.log(axios.commonApi)
  },
  methods: {
    login: async function () {
      let apiCode = 'web.shopUser.loginForAuthToken'
      let token = md5('apiKey=wft_web&' + apiCode + '&098f6bcd4621d373cade4e832627b4f6')
      let testData = {
        "web.shopUser.loginForAuthToken": {
          auth_token: this.auth_token
        }
      }
      let datasss = "data=" + JSON.stringify(testData);
      const resDataPost = await axios.post('/apicenter/' + apiCode + '/' + token, datasss)

      if(resDataPost['web.shopUser.loginForAuthToken'].isSuccess == true){
        localStorage.setItem("token", resDataPost['web.shopUser.loginForAuthToken'].results.auth_token)
        localStorage.setItem("shop_name", resDataPost['web.shopUser.loginForAuthToken'].results.shop_name)
        localStorage.setItem("shop_pic_url", resDataPost['web.shopUser.loginForAuthToken'].results.shop_pic_url)
        this.$router.push({ path: '/'})
      }else{
        this.$router.push({ path: 'error',query:{'msg' : resDataPost['web.shopUser.loginForAuthToken'].msg}})
      }
    },


  }
}
</script>
