<template>
<div>
  <el-card>
    <h3>{{this.groupName}}</h3>
    <div style="margin-top: 40px;">
      <h3>基本信息</h3>
      <el-row>
        <el-col :span="2"><label class="font-small">组名称：</label></el-col>
        <el-col :span="10">{{this.groupName}}</el-col>
        <el-col :span="2"><label class="font-small">创建时间：</label></el-col>
        <el-col :span="10">{{this.createTime}}</el-col>
      </el-row>
      <el-row style="margin-top:10px">
        <el-col :span="2"><label class="font-small">显示名称：</label></el-col>
        <el-col :span="10">{{this.showName}}</el-col>
      </el-row>
    </div>
  </el-card>
  <div style="margin-top: 30px;">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="组成员" name="first">
          <el-button>添加组成员</el-button>
          <el-button  @click="handleMultipleDeleteUser()">移出组成员</el-button>
          <el-table :data="userList" style="width: 100%" @selection-change="handleSelectionChangeUser" :highlight-current-row="true">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="userName" label="用户名称" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="joinTime" label="加入组时间" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <label class="clickLabel" @click="handleDeleteUser(scope.$index, scope.row)">移出</label>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="权限" name="second">
          <el-button  >关联策略</el-button>
          <el-button  @click="handleMultipleDeletePermission()" >解除策略</el-button>
          <el-table :data="permissionList" style="width: 100%" @selection-change="handleSelectionChangePermission" :highlight-current-row="true">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="permissionName" label="策略名称" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="permissionType" label="策略类型" header-align="center" align="center" :filters="[{text: '系统策略', value: '系统策略'}, {text: '用户策略', value: '用户策略'}]" :filter-method="permissionFilterHandler" :filter-multiple="false">
            </el-table-column>
            <el-table-column prop="description" label="描述" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <label class="clickLabel" @click="handleDeletePermission(scope.$index, scope.row)">解除</label>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      groupName: "啦啦啦啦了",
      createTime: "2019-00-00",
      showName: "哈哈哈哈哈哈",
      activeName: 'second',
      userList: [{
        userName: "user1",
        joinTime: "2019-10-11"
      }, {
        userName: "user2",
        joinTime: "2017-09-01"
      }, {
        userName: "user3",
        joinTime: "2011-09-01"
      }, {
        userName: "user4",
        joinTime: "2015-09-01"
      }, {
        userName: "user5",
        joinTime: "2010-09-21"
      }],
      permissionList: [{
        permissionName: "rule1",
        permissionType: "系统策略",
        description: "哈哈哈哈哈哈哈"
      }, {
        permissionName: "rule2",
        permissionType: "系统策略",
        description: "哈哈哈哈哈哈哈"
      }, {
        permissionName: "rule3",
        permissionType: "系统策略",
        description: "哈哈哈哈哈哈哈"
      }, {
        permissionName: "rule4",
        permissionType: "系统策略",
        description: "哈哈哈哈哈哈哈"
      }, {
        permissionName: "rule5",
        permissionType: "系统策略",
        description: "哈哈哈哈哈哈哈"
      }],
      multipleSelectionUser: [],
      multipleSelectionPermission: []
    }
  },

  methods: {
    handleSelectionChangeUser(val) {
      this.multipleSelectionUser = val;
    },
    handleSelectionChangePermission(val) {
      this.multipleSelectionPermission = val;
    },
    handleDeleteUser(index, row) {
      this.$confirm('是否确认将所选用户移出组，移出后用户将不再拥有随组策略，您后续可以再将用户添加进任意组', '用户删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.userList.splice(index, 1);
      });
    },
    handleDeletePermission(index, row) {
      this.$confirm('是否确认解除所选策略，解除后用户组内成员将不再拥有策略，您后续可以再将策略关联任意组', '策略删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.permissionList.splice(index, 1);
      });
    },
    handleMultipleDeleteUser() {
      let str = "<ul>";
      this.multipleSelectionUser.forEach(user => {
        str += "<li>"+user.userName+"</li>";
      })
      str += "</ul>";
      this.$confirm('是否确认将所选用户移出组，移出后用户将不再拥有随组策略，您后续可以再将用户添加进任意组</Br>' +
      '<strong>目前所删除用户如下:</strong>' + str, '用户删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: 'true'
      }).then(() => {
        this.$message({
            type: 'success',
            message: '删除成功'
          });
          for (let index in this.multipleSelectionUser) {
            for (let user in this.userList) {
              if (this.multipleSelectionUser[index].userName == this.userList[user].userName) {
                this.userList.splice(user, 1);
              }
            }
          }
      });
    },
    handleMultipleDeletePermission() {
      let str = "<ul>";
      this.multipleSelectionPermission.forEach(user => {
        str += "<li>"+user.permissionName+"</li>";
      })
      str += "</ul>";
      this.$confirm('是否确认解除所选策略，解除后用户组内成员将不再拥有策略，您后续可以再将策略关联任意组</Br>' +
      '<strong>目前所删除用户如下:</strong>' + str, '策略删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: 'true'
      }).then(() => {
        this.$message({
            type: 'success',
            message: '删除成功'
          });
          for (let index in this.multipleSelectionPermission) {
            for (let permission in this.permissionList) {
              if (this.multipleSelectionPermission[index].permissionName == this.permissionList[permission].permissionName) {
                this.permissionList.splice(permission, 1);
              }
            }
          }
      });
    },
    permissionFilterHandler(value, row, column) {
      // alert(value);
      const property = column['property'];
      return row[property] === value;
    }
  }
}
</script>

<style>
.font-small {
  font-size: small;
  color: #808080;
}
</style>
