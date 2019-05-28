<template>
    <el-menu
      mode="vertical"
      router
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/" >
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("app.homepage") }}</span>
      </el-menu-item>
      <el-menu-item index="/upload">
        <i class="el-icon-upload"></i>
        <span slot="title">{{ $t("app.uploadpage") }}</span>
      </el-menu-item>
      <el-menu-item index="/fragment">
        <i class="el-icon-picture"></i>
        <span slot="title">{{ $t("app.fragmentpage") }}</span>
      </el-menu-item>
      <el-menu-item index="/async">
        <i class="el-icon-download"></i>
        <span slot="title">{{ $t("app.asyncpage") }}</span>
      </el-menu-item>
      <el-menu-item index="/ajax">
        <i class="el-icon-sort"></i>
        <span slot="title">{{ $t("app.ajaxpage") }}</span>
      </el-menu-item>
      <el-menu-item index="/profile">
        <i class="el-icon-info"></i>
        <span slot="title">{{ $t("app.profilepage") }}</span>
      </el-menu-item>
      <el-menu-item index="/usergroup">
        <i class="el-icon-info"></i>
        <span slot="title">{{ $t("app.usergroup") }}</span>
      </el-menu-item>

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
