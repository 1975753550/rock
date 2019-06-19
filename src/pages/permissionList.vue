<template>
  <div>
    <el-card>
    <div style="margin-bottom:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>访问控制</el-breadcrumb-item>
        <el-breadcrumb-item>策略</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-button @click="toCreatePermission">新建策略</el-button>
    <el-button @click="handleMultipleDeletePermission(multipleSelectionPermission)">删除策略</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
    <el-input v-model="selectPermissionName" placeholder="策略名称/描述" style="width:300px">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="searchByPermissionName(selectPermissionName)"></i>
    </el-input>
    <div style="margin-top: 30px">
      <el-table :data="permissionList" :highlight-current-row="true" :default-sort = "{prop: 'permissionName', order: 'ascending'}" @selection-change="handleSelectionChangePermission" @cell-click="cellClick" border style="border: 1px solid #FFFFFF">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="permissionName" label="策略名称" header-align="center" align="center" sortable :sort-method="sortByPermissionName" width="120">
        </el-table-column>
        <el-table-column prop="referNum" label="被引用数" header-align="center" align="center" sortable :sort-method="sortByReferNum" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" sortable :sort-method="sortByCreateTime" width="120">
        </el-table-column>
        <el-table-column prop="updateTime" label="最近修改时间" header-align="center" align="center" sortable :sort-method="sortByUpdateTime" width="130">
        </el-table-column>
        <el-table-column prop="description" label="描述" header-align="center" align="center" width="100">
        </el-table-column>
        <el-table-column prop="serviceType" header-align="center" align="center" label="服务类型" width="120"
          :filter-multiple="false"
          :filter-method="filterHandler"
          :filters="[{text: 'OOS', 'value': 'OOS'}, {text: 'Management', 'value': 'Management'}, {text: 'IAM', 'value': 'IAM'}, {text: 'CloudTrail', 'value': 'CloudTrail'}]">
        </el-table-column>
        <el-table-column prop="operation" label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <label class="clickLabel">关联用户</label>
            <label class="clickLabel">关联用户组</label>
            <label @click="handleDelete(scope.$index, scope.row)" class="clickLabel">删除</label>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  </div>
</template>

<script>
    import {getPinYinFirstCharacter} from '../utils/usergroup';
    export default {
      data() {
        return {
          serviceTypeHeader: [{
            prop: 'oos',
            label: 'oos'
          }, {
            prop: 'Management',
            label: 'Management'
          }, {
            prop: 'IAM',
            label: 'IAM'
          }, {
            prop: 'CloudTrail',
            label: 'CloudTrail'
          }],
          permissionList: [{
            permissionName: 'rule1',
            referNum: '22',
            createTime: '2099-10-22',
            updateTime: '2222-01-11',
            description: '哈哈哈',
            serviceType: 'OOS'
          }, {
            permissionName: 'rule2',
            referNum: '22',
            createTime: '2099-10-22',
            updateTime: '2222-01-11',
            description: '哈哈哈',
            serviceType: 'OOS'
          }, {
            permissionName: 'rule3',
            referNum: '22',
            createTime: '2099-10-22',
            updateTime: '2222-01-11',
            description: '哈哈哈',
            serviceType: 'OOS'
          }, {
            permissionName: 'rule4',
            referNum: '22',
            createTime: '2099-10-22',
            updateTime: '2222-01-11',
            description: '哈哈哈',
            serviceType: 'OOS'
          }, {
            permissionName: 'rule5',
            referNum: '22',
            createTime: '2099-10-22',
            updateTime: '2222-01-11',
            description: '哈哈哈',
            serviceType: 'OOS'
          }, {
            permissionName: 'rule6',
            referNum: '22',
            createTime: '2099-10-22',
            updateTime: '2222-01-11',
            description: '哈哈哈',
            serviceType: 'OOS'
          }],
          permissionListBackup: [],
          selectPermissionName: '',
          multipleSelectionPermission: [],
          serviceType: 'OOS'
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
        },
        sortByReferNum(obj1, obj2) {
          let val1 = Number(obj1.referNum);
          let val2 = Number(obj2.referNum);
          if(val1>val2)
            return 1;
          if(val1<val2)
            return -1;
          if(val1==val2)
            return this.sortByPermissionName(obj1, obj2);
        },
        sortByCreateTime(obj1, obj2) {
          let val1 = new Date(obj1.createTime);
          let val2 = new Date(obj2.createTime);
          if(val1.getTime()>val2.getTime()) {
            return 1;
          }
          if(val1.getTime()<val2.getTime()) {
            return -1;
          }
          if(val1.getTime()==val2.getTime()) {
            return this.sortByPermissionName(obj1, obj2);
          }
        },
        sortByUpdateTime(obj1, obj2) {
          let val1 = new Date(obj1.updateTime);
          let val2 = new Date(obj2.updateTime);
          if(val1.getTime()>val2.getTime()) {
            return 1;
          }
          if(val1.getTime()<val2.getTime()) {
            return -1;
          }
          if(val1.getTime()==val2.getTime()) {
            return this.sortByPermissionName(obj1, obj2);
          }
        },
        handleDelete(index, row) {
          let permissionName = this.permissionList[index].permissionName;
          this.permissionList.splice(index, 1);
          for(let i in this.permissionListBackup) {
            if(this.permissionListBackup[i].permissionName == permissionName) {
              this.permissionListBackup.splice(i, 1);
              break;
            }
          }
        },
        handleMultipleDeletePermission(permissionList) {
          let permissionNameList = [];
          for (let index in this.multipleSelectionPermission) {
            for (let permission in this.permissionList) {
              if (this.multipleSelectionPermission[index].permissionName == this.permissionList[permission].permissionName) {
                permissionNameList.push(this.permissionList[permission].permissionName);
                this.permissionList.splice(permission, 1);
              }
            }
          }
          permissionNameList.forEach(permissionName => {
            for(let i in this.permissionListBackup) {
              if(this.permissionListBackup[i].permissionName == permissionName) {
                this.permissionListBackup.splice(i, 1);
              }
            }
          });
        },
        searchByPermissionName(permissionName) {
          let array = new Array();
          if(this.getJsonLength(this.permissionListBackup) == 0) {
            this.permissionListBackup = this.permissionList.slice(0);
          }else {
            this.permissionList = this.permissionListBackup.slice(0);
          }
          if(permissionName == "") {
            if(this.getJsonLength(this.permissionListBackup) != 0) {
              this.permissionList = this.permissionListBackup.slice(0);
            }
            return;
          }
          for(let index in this.permissionList) {
            if(this.permissionList[index].permissionName.indexOf(permissionName) != -1){
              array.push(index);
            }
          }
          this.permissionList = [];
          array.forEach(index => {
            this.permissionList.push(this.permissionListBackup[index]);
          });
        },

        getJsonLength(json) {
          let sum = 0;
          for(let x in json) {
            sum++;
          }
          return sum;
        },
        handleSelectionChangePermission(val) {
          this.multipleSelectionPermission = val;
        },
        toCreatePermission() {
          this.$router.push({path: "/createPermission"});
        },
        cellClick(row, column, cell, event) {
          if (column.label == "策略名称") {
            this.toPermissionDetail(row.permissionName);
          }
        },
        toPermissionDetail(permissionName) {
          this.$router.push({path: "/permissionDetail", query: {'permissionName': permissionName}});
        },
        filterHandler(value, row, column) {
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
