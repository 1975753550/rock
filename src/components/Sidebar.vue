<template>
<el-menu mode="vertical" router :default-active="activeIndex" class="el-menu-vertical-demo" background-color="#FFFFFF" text-color="#000000" active-text-color="#1E90FF">
  <el-submenu index="1">
    <template slot="title">
      <span>{{ $t("app.name") }}</span>
    </template>
    <el-menu-item index="/overview">
      <span slot="title">{{ $t("app.IAMoverview") }}</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <span>{{ $t("app.user") }}</span>
      </template>
      <el-menu-item index="/user">
        <span slot="title">{{ $t("app.user") }}</span>
      </el-menu-item>
      <el-menu-item index="/usergrouplist">
        <span slot="title">{{ $t("app.usergrouplist") }}</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/permission">
      <span slot="title">{{ $t("app.permission") }}</span>
    </el-menu-item>
    <el-menu-item index="/safesetting">
      <span slot="title">{{ $t("app.safesetting") }}</span>
    </el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
export default {
  name: 'Sidebar',
  data: function() {
    return {
      activeIndex: null,
    }
  },
  created() {
    this.activeIndex = this.$route.path
  }
};
</script>

<style scoped>

</style>
