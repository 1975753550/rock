<template>
<div>
  <el-row>
    <el-button :center="true" @click="toCreateGroup">{{$t('usergroup.new')}}</el-button>&nbsp;&nbsp;&nbsp;
    <el-input v-model="selectGroupName" :placeholder="$t('usergroup.groupName')" style="width:300px">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="searchByGroupName(selectGroupName)"></i>
    </el-input>
  </el-row>
  <div style="margin-top:20px">
    <el-table :data="groupList" style="width: 100%; font-size: 10px;" :highlight-current-row="true" :default-sort = "{prop: 'groupName', order: 'ascending'}" border>
      <el-table-column prop="groupName" :label="$t('usergroup.groupName')" header-align="center" align="center" sortable :sort-method="sortByGroupName" width="150">
      </el-table-column>
      <el-table-column prop="userNumber" :label="$t('usergroup.userNumber')" header-align="center" align="center" sortable width="120" :sort-method="sortByUserNumber">
      </el-table-column>
      <el-table-column prop="permission" :label="$t('usergroup.permission')" header-align="center" align="center" sortable width="100" :sort-method="sortByPermissionNumber">
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('usergroup.createTime')" header-align="center" align="center" sortable width="160" :sort-method="sortByCreateTime">
      </el-table-column>
      <el-table-column prop="updateTime" :label="$t('usergroup.updateTime')" header-align="center" align="center" sortable width="160" :sort-method="sortByUpdateTime">
      </el-table-column>
      <el-table-column :label="$t('usergroup.operation')" header-align="center" align="center">
        <template slot-scope="scope">
          <label class="clickLabel">{{$t('usergroup.addPermission')}}</label>
          <label class="clickLabel">{{$t('usergroup.addUser')}}</label>
          <label class="clickLabel" @click="handleDelete(scope.$index, scope.row)">{{$t('usergroup.delete')}}</label>
          <label class="clickLabel" @click="toGroupDetail">{{$t('usergroup.manage')}}</label>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
    import {getPinYinFirstCharacter} from '../utils/usergroup';
    export default {
      data() {
        return {
          groupList: [{
            groupName: "9王朝",
            userNumber: "3",
            permission: "5",
            createTime: "2019-05-29 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }, {
            groupName: ".哈哈哈哈",
            userNumber: "4",
            permission: "6",
            createTime: "2019-05-20 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }, {
            groupName: "_啦啦啦啦",
            userNumber: "5",
            permission: "7",
            createTime: "2019-05-30 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }, {
            groupName: "-耶耶耶恶业与",
            userNumber: "6",
            permission: "8",
            createTime: "2019-06-29 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }, {
            groupName: ",踩踩踩踩猜猜猜",
            userNumber: "7",
            permission: "9",
            createTime: "2017-05-29 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }, {
            groupName: "+Admin",
            userNumber: "1000",
            permission: "222",
            createTime: "222-09-11 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }, {
            groupName: "=Admin",
            userNumber: "1000",
            permission: "222",
            createTime: "222-09-11 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }, {
            groupName: "@Admin",
            userNumber: "1000",
            permission: "222",
            createTime: "222-09-11 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }, {
            groupName: "@Adman",
            userNumber: "1000",
            permission: "222",
            createTime: "222-09-11 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }, {
            groupName: "@admbn",
            userNumber: "1000",
            permission: "222",
            createTime: "222-09-11 00:01:02",
            updateTime: "2019-05-29 00:01:02"
          }],
          groupListBackup: [],
          selectGroupName: "",
        }
      },
      methods: {
        searchByGroupName(groupName) {
          let array = new Array();
          if(this.getJsonLength(this.groupListBackup) == 0) {
            this.groupListBackup = this.groupList.slice(0);
          }else {
            this.groupList = this.groupListBackup.slice(0);
          }
          if(groupName == "") {
            if(this.getJsonLength(this.groupListBackup) != 0) {
              this.groupList = this.groupListBackup.slice(0);
            }
            return;
          }
          for(let index in this.groupList) {
            if(this.groupList[index].groupName.indexOf(groupName) != -1){
              array.push(index);
            }
          }
          this.groupList = [];
          array.forEach(index => {
            this.groupList.push(this.groupListBackup[index]);
          });
        },

        getJsonLength(json) {
          let sum = 0;
          for(let x in json) {
            sum++;
          }
          return sum;
        },

        toCreateGroup() {
          this.$router.push({path: "/createusergroup"});
        },

        toGroupDetail() {
          this.$router.push({path: "/usergroupdetail"});
        },

        handleDelete(index, row) {
          let groupName = this.groupList[index].groupName;
          this.groupList.splice(index, 1);
          for(let i in this.groupListBackup) {
            if(this.groupListBackup[i].groupName == groupName) {
              this.groupListBackup.splice(i, 1);
              break;
            }
          }
        },

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

        sortByGroupName(obj1, obj2) {
          let val1 = getPinYinFirstCharacter(obj1.groupName);
          let val2 = getPinYinFirstCharacter(obj2.groupName);
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
        sortByUserNumber(obj1, obj2) {
          let val1 = Number(obj1.userNumber);
          let val2 = Number(obj2.userNumber);
          if(val1>val2)
            return 1;
          if(val1<val2)
            return -1;
          if(val1==val2)
            return this.sortByGroupName(obj1, obj2);
        },
        sortByPermissionNumber(obj1, obj2) {
          let val1 = Number(obj1.permission);
          let val2 = Number(obj2.permission);
          if(val1>val2)
            return 1;
          if(val1<val2)
            return -1;
          if(val1==val2)
            return this.sortByGroupName(obj1, obj2);
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
            return this.sortByGroupName(obj1, obj2);
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
            return this.sortByGroupName(obj1, obj2);
          }
        }
      }
    }
  </script>
