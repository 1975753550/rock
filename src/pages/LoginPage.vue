<template>
    <el-container>
      <el-header>Header</el-header>
            <el-main>
              <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
                <h3 class="title">系统登录</h3>

                <el-form-item prop="username">
                  <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
                </el-form-item>

                <el-form-item prop="password">
                  <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                    placeholder="密码" />
                </el-form-item>

                <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

              </el-form>                            
            </el-main>

        <el-footer height="30px">
          <RockFooter />
        </el-footer>            
    </el-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    const validateInputLength = (rule, value, callback) => {
      if (value && value.length < 3) {
        callback(new Error("输入长度不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateInputLength }
        ],
        password: [
          { required: true, trigger: "blur", validator: validateInputLength }
        ]
      },
      loading: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          window.location.href = "/";
          return true;
        } else {
          return false;
        }
      });
    }
  },
  beforeCreated() {
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login-form {
  width: 50%;
  margin: auto;
}
</style>
