<template>
    <el-container>
        <el-header>
          <RockHeader />
        </el-header>
        <el-container>
            <el-aside>
              <Sidebar />
            </el-aside>
            <el-main>
              <router-view/>
            </el-main>
        </el-container>
        <el-footer height="30px">
          <RockFooter />
        </el-footer>
    </el-container>
</template>

<script>
import Sidebar from './Sidebar'

export default {
  name: 'Container'
}
</script>

<style scoped>
.el-container {
    min-height: 100%;
}
.el-header {
    padding: 0;
    box-sizing: border-box;
}
.el-aside {
    width: 100px;
}
.el-main {
    background-color: #eee;
}
</style>


