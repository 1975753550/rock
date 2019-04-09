<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>修改用户资料</span>
    </div>
    <el-form :model="profileForm" ref="profileForm" label-width="100px" class="profileForm">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="profileForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>  
</template>

<script>
export default {
  name: 'ProfilePage',
  data () {
    return {
      profileForm: {
        username: this.$store.state.user.username
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('user/changeUsername', this.profileForm.username)

      this.$notify.success({
        title: '修改成功',
        position: 'bottom-right',
      });      
    },
    resetForm() {
      this.$refs['profileForm'].resetFields();
      this.profileForm.username = this.$store.state.user.username
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
