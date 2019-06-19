<template>
<div>
  <el-card>
    <el-card>
      <div style="margin-bottom:20px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item>访问控制</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/permission' }">策略</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.query.permissionName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="title">基本信息</div>
      <el-row>
        <el-col :span="4">策略名称：</el-col>
        <el-col :span="8">{{this.$route.query.permissionName}}</el-col>
        <el-col :span="4">策略类型：</el-col>
        <el-col :span="8">预设策略</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">创建时间：</el-col>
        <el-col :span="8">2018-01-12 09:00:00</el-col>
        <el-col :span="4">最近修改时间：</el-col>
        <el-col :span="8">2018-01-20 09:00:00</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">描述：</el-col>
        <el-col :span="8"><span style="display:table-cell;vertical-align: middle;">该策略允许您管理账户内所有用户及其权限、财务相关的信息、云服务资产。</span></el-col>
        <el-col :span="4">版本号：</el-col>
        <el-col :span="8">1.0</el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:30px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="策略内容" name="first">
          <json-editor ref="jsonEditor" v-model="json" :isRead="true"/>
        </el-tab-pane>
        <el-tab-pane label="关联用户/组" name="second">
          <el-row style="margin-bottom:20px">
            <el-button type="primary" style="float:left;">关联用户组</el-button>
            <el-button type="primary" style="float:left;">解除用户组</el-button>
          </el-row>
          <el-table :data="connectionList">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="connection" label="关联用户/组" header-align="center" align="center" sortable :sort-method="sortByPermissionName">
            </el-table-column>
            <el-table-column prop="type" label="类型" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <label style="color:#1E90FF;">解除关联</label>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-card>
</div>
</template>

<script>
import JsonEditor from './components/editArea';
export default {
  components: {
   JsonEditor
  },
  data() {
    return {
      json: {"Version": "2012-10-17", "statement": [{"Effect": "Allow", "Action": [], "Resource": [], "Condition": {}}]},
      connectionList: [{
        connection: 'oooo',
        type: '用户'
      }],
      activeName: 'first'
    }
  },
  methods: {
    getSortValue(char) {
      if(char == '_') {
        return 1;
      }
      if(char == '-') {
        return 2;
      }
      if(char == ',') {
        return 3;
      }
      if(char == '.') {
        return 4;
      }
      if(char == '+') {
        return 5;
      }
      if(char == '=') {
        return 6;
      }
      if(char == '@') {
        return 7;
      }
    },
    sortByPermissionName(obj1, obj2) {
      let val1 = getPinYinFirstCharacter(obj1.permissionName);
      let val2 = getPinYinFirstCharacter(obj2.permissionName);
      let chArray1 = val1.split("");
      let chArray2 = val2.split("");
      let numChReg = /[a-zA-Z0-9]/;
      for(let i=0; ;i++) {
        if(chArray1[i] === undefined) {
          return -1;
        }
        if(chArray2[i] === undefined) {
          return 1;
        }
        if(chArray1[i] == chArray2[i]) {
          continue;
        }
        if(numChReg.test(chArray1[i])&&!numChReg.test(chArray2[i])) {
          return -1;
        }
        if(!numChReg.test(chArray1[i])&&numChReg.test(chArray2[i])) {
          return 1;
        }
        if(!numChReg.test(chArray1[i])&&!numChReg.test(chArray2[i])) {
          let value1 = this.getSortValue(chArray1[i]);
          let value2 = this.getSortValue(chArray2[i]);
          if(value1>value2) {
            return 1;
          }
          if(value1<value2) {
            return -1;
          }
          if(value1 == value2) {
            continue;
          }
        }
        if(numChReg.test(chArray1[i])&&numChReg.test(chArray2[i])) {
          let value1 = chArray1[i].toUpperCase();
          let value2 = chArray2[i].toUpperCase();
          if(value1>value2)
            return 1;
          if(value1<value2)
            return -1;
          if(value1==value2)
            continue;
        }
      }
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  height: 30px;
  text-Align: center;
  vertical-align:middle;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
