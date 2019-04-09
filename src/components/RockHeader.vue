<template>
  <el-row>
    <el-col :span="4">
      <div class="logoContainer" >
        <img class="logo" src="../assets/logo.png"><h2>{{ $t("app.name") }}</h2>
      </div>
    </el-col>
    <el-col :span="4" :offset="12">
      <b class="username">{{ $t("app.welcome") }}[{{ $store.state.user.username }}]</b>
    </el-col>
    <el-col :span="4" >
      <div class="langContainer" >
              <el-select v-model="$i18n.locale" @change="handleChange">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
      </div>            
    </el-col>
  </el-row>
</template>

<script>
import Cookies from "js-cookie"
import store from '@/store'
import { mapGetters, mapState } from 'vuex'

export default {
  name: "RockHeader",
  data() {
    return {
      username: '',
      options: [
        {
          value: "en",
          label: "English"
        },
        {
          value: "zh-cn",
          label: "简体中文"
        }
      ]
    };
  },
  created() {
    let lang = Cookies.get('lang')
    if (lang) {
      this.$i18n.locale = lang
    }
  },
  methods: {
    handleChange(lang) {
      Cookies.set('lang', lang)
      return
    }
  }
};
</script>

<style scoped>
.el-row {
  color: white;
  background-color: #67C23A;
  cursor: default;
  height: 100%;
}
.el-col {
  height: 100%;
}
.logoContainer {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  height: 40px;
  margin-right: 10px;
}
.langContainer {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.username {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;  
}
</style>


