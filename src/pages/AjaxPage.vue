<template>
  <div>
      <div class="price" v-if="price">Bitcoin Price: <b>{{price}}</b></div>
      <br />
      <el-button class="button" icon="el-icon-edit" type="primary" :loading="loading" @click="onClick">请求数据</el-button>
  </div>
</template>

<script>
import fetch from '../utils/fetch.js'

export default {
  name: 'AjaxPage',
  data () {
    return {
      price: null,
      loading: false
    }
  },
  methods: {
    onClick() {
      this.loading = true
      
      fetch.get('https://api.coindesk.com/v1/bpi/currentprice.json').then((resp) => {
        let item = resp.data.bpi.USD
        this.price = `${item.rate} ${item.code}`
        this.$notify.success({
          title: '调用成功',
        });
      }).catch((e) => {
        this.$notify.error({
          title: '调用错误',
        });
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
