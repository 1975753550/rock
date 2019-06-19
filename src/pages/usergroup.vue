<template>
<div>
  <el-steps :active="active" align-center>
    <el-step title="设置用户组"></el-step>
    <el-step title="设置权限"></el-step>
    <el-step title="信息审核"></el-step>
    <el-step title="完成"></el-step>
  </el-steps>
  <div v-if='active==0' class="xcard">
    <h3 class="inline">设置用户组名</h3>&nbsp;&nbsp;&nbsp;<span class="font-small">组名创建成功后不可修改，请谨慎命名</span>
    <div class="xcard">
      <span class="font-small">用户组名</span>
    </div>
    <div style="margin-top: 10px">
      <el-input v-model="inputGroupName" style="width:300px" maxlength="128"></el-input>
    </div>
  </div>
  <div v-if='active==1' class="xcard">
    <h3>附加策略（可选）</h3>
    <div style="margin:20px">
      <el-button @click="toCreatePermission">创建策略</el-button>&nbsp;&nbsp;&nbsp;
      <el-input v-model="inputPremissionName" placeholder="策略名称 或 策略描述" style="width:300px">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchByPermissionName(inputPremissionName)"></i>
      </el-input>
      <h4 class="inline">策略类型</h4>
      <el-select v-model="PremissionValue" placeholder="请选择" @change="selectChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table ref="permissionTable" :data="permissionList" style="width: 100%" :highlight-current-row="true" @selection-change="handleSelectionChangePermission" border>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="permissionName" label="策略名称" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="permissionType" label="策略类型" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" header-align="center" align="center">
      </el-table-column>
    </el-table>
  </div>
  <div v-if='active==2' class="xcard">
    <el-card>
      <h3 class="inline">用户组信息</h3><span style="float:right; color:#226DDD" @click="toGroupName">编辑</span></Br>
      <div class="xcard" style="margin-bottom: 40px">
        用户组名*<span style="margin-left:80px">{{inputGroupName}}</span>
      </div>
      <div class='xcard' style="margin-bottom: 30px">
        <h3 class="inline">权限信息</h3> &nbsp;&nbsp;&nbsp;&nbsp;<span class="font-small">以下策略将附加到用户组上</span>
        <span style="float:right; color:#226DDD" @click="toPermission">编辑</span></Br>
      </div>
      <el-table :data="multipleSelectionPermission" style="width: 100%" :highlight-current-row="true" border>
        <el-table-column prop="permissionName" label="策略名称" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="permissionType" label="策略类型" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="description" label="描述" header-align="center" align="center">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <div v-if='active==3' class="xcard">
    <h4>创建完成</h4>
    <el-card style="margin-left:40px">
      <h3 style="color: #226DDD">创建用户组完成</h3>
      <div class="font-small" style="margin-top: 20px; margin-bottom:20px">您已经成功创建用户组，可将IAM用户添加至组以便管理</div>
      <el-button @click="togroupList">返回组</el-button>
    </el-card>
  </div>
  <!-- </el-row>
  <el-row> -->
  <div v-if='active!=3'>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
  <!-- </el-row> -->
</div>
</template>

<script>
// import setGroupName from '@/pages/group/setGroupName'
export default {
  name: 'usergroup',
  data() {
    return {
      active: 0,
      inputGroupName: "",
      inputPremissionName: "",
      PremissionValue: "",
      options: [{
        value: '全部类型',
        label: '全部类型'
      }, {
        value: '系统策略',
        label: '系统策略'
      }, {
        value: '自定义策略',
        label: '自定义策略'
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
        permissionType: "自定义策略",
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
      permissionListBackup: [],
      multipleSelectionPermission: [],
      searchResult: [],
      screenResult: []
    };
  },

  methods: {
    next() {
      if (this.active == 0 && this.inputGroupName == "") {
        this.$alert('请输入用户组名', '用户组名输入错误', {
          confirmButtonText: '我知道了'
        });
        return;
      }
      if(this.active == 0) {
        if(this.groupNameCheck() != -1) {
          return;
        }
      }

      if (this.active++ > 2) this.active = 0;
    },
    toPermission() {
      this.active = 1;
    },
    toGroupName() {
      this.active = 0;
    },
    togroupList() {
      this.$router.push({
        path: '/usergrouplist'
      });
    },
    getJsonLength(json) {
      let sum = 0;
      for(let x in json) {
        sum++;
      }
      return sum;
    },
    selectChange(item) {
      let col = "permissionType";
      let filter = [item];
      if(this.getJsonLength(this.permissionListBackup) == 0) {
        this.permissionListBackup = this.permissionList;
        this.searchResult = this.permissionList;
        this.screenResult = this.permissionList;
      }else {
        this.permissionList = this.permissionListBackup;
      }
      if(item == "全部类型") {
        if(this.getJsonLength(this.searchResult) != 0) {
          this.permissionList = this.searchResult;
          this.screenResult = this.permissionListBackup;
          return;
        }
        if(this.getJsonLength(this.permissionListBackup) != 0) {
          this.permissionList = this.permissionListBackup;
          this.screenResult = this.permissionListBackup;
          return;
        }
      }
      let survivor = new Array();
      for(let i in this.permissionList) {
        for(let f in filter) {
          if(this.permissionList[i][col] == filter[f]) {
            survivor.push(i);
          }
        }
      }
      this.permissionList = [];
      this.screenResult = [];
      for(let x in survivor) {
        this.screenResult.push(this.permissionListBackup[survivor[x]]);
      }
      this.screenResult.forEach(screen => {
        this.searchResult.forEach(search => {
          if(screen.permissionName == search.permissionName) {
            this.permissionList.push(screen);
          }
        });
      });
    },
    groupNameCheck() {
      let check = this.inputGroupName.search(/[^a-zA-Z0-9\/\_\-\,\.\+\=\@]/i);
      if(check != -1) {
        this.$alert('用户组名只能包含字母、数字或以下字符/_-,.+=@', '用户组名输入错误', {
          confirmButtonText: '我知道了'
        });
      }
      return check;
    },
    handleSelectionChangePermission(val) {
      this.multipleSelectionPermission = val;
    },
    toCreatePermission() {
      this.$router.push({
        path: '/createPermission'
      });
    },
    searchByPermissionName(permissionName) {
      let array = new Array();
      if(this.getJsonLength(this.permissionListBackup) == 0) {
        this.permissionListBackup = this.permissionList;
        this.searchResult = this.permissionList;
        this.screenResult = this.permissionList;
      }else {
        this.permissionList = this.permissionListBackup;
      }
      if(permissionName=="") {
        if(this.getJsonLength(this.screenResult) != 0) {
          this.permissionList = this.screenResult;
          this.searchResult = this.permissionListBackup;
          return;
        }
        if(this.getJsonLength(this.permissionListBackup) != 0) {
          this.permissionList = this.permissionListBackup;
          this.searchResult = this.permissionListBackup;
          return;
        }
      }
      for(let index in this.permissionList) {
        if(this.permissionList[index].permissionName.indexOf(permissionName)!=-1) {
          array.push(index);
        }
      }
      this.permissionList = [];
      this.searchResult = [];
      array.forEach(i => {
        this.searchResult.push(this.permissionListBackup[i]);
      });
      this.searchResult.forEach(search => {
        this.screenResult.forEach(sceen => {
          if(search.permissionName == sceen.permissionName) {
            this.permissionList.push(search);
          }
        });
      });
    }
  },
  updated() {
    if(this.active == 1) {
      let array = new Array();
      for(let index in this.multipleSelectionPermission) {
        for(let i in this.permissionList) {
          if(this.multipleSelectionPermission[index].permissionName == this.permissionList[i].permissionName) {
            array.push(i);
          }
        }
      }
      this.$nextTick(function () {
        array.forEach(i => {
          this.$refs.permissionTable.toggleRowSelection(this.permissionList[i], true);
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inline {
  display: inline;
}

.xcard {
  margin-top: 30px;
}

.font-small {
  font-size: small;
  color: #808080;
}
</style>
