<template>
  <div>
  <el-card>
    <div style="margin-bottom:20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>访问控制</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/permission' }">策略</el-breadcrumb-item>
        <el-breadcrumb-item>新建策略</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <h3>设置策略</h3>
      <div style="margin-bottom:20px">
        <span class="font-small">策略名称 *</span>
      </div>
      <el-input style="width: 300px" v-model="permissionName"></el-input>
      <div style="margin-top:20px; margin-bottom:20px">
        <span class="font-small">描述</span>
      </div>
      <el-input v-model="description" :autosize="{ minRows: 4, maxRows: 10}" type="textarea" style="width: 300px"></el-input>
    </el-card>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="可视化策略编辑" name="first">
          <div class="title" style="margin-top:10px">服务</div>
          <span class="font-small">选择产品/服务</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-select v-model="serviceValue">
            <el-option
            v-for="item in serviceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
          <div class="title">效果</div>
          <span class="font-small">选择效果</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="Effect" label="1">允许</el-radio>
          <el-radio v-model="Effect" label="2">拒绝</el-radio>
          <div class="title">操作</div>
          <span class="font-small">筛选操作</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input v-model="selectOperationName" placeholder="操作名称" style="width:300px;">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div style="margin-top:20px;">
            <span class="font-small" style="float:left; margin-top:5px">访问级别&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <label class="clickLabel" @click="fold" style="float:right; margin-top:5px">&nbsp;&nbsp;全部折叠</label>
            <label class="clickLabel" @click="expand" style="float:right; margin-top:5px">全部展开&nbsp;&nbsp;|</label>
            <el-tree
              :props="props"
              :default-expand-all="expandControl"
              ref="treeX"
              :filter-node-method="filterNode"
              :data="treeList"
              node-key="id"
              show-checkbox
              style="width:300px; float:left;">
            </el-tree>
          </div>
          <div class="clear"></div>
          <div class="title">资源<span class="font-small" style="margin-left:50px">指定策略生效的资源</span></div>
          <div style="margin-left:30px">
            <el-radio v-model="resource" label="1">所有资源</el-radio>
            <el-radio v-model="resource" label="2">特定资源</el-radio>
          </div>
          <div v-if="resource==2">
            <span style="line-height: 40px; color:#1E90FF;">+ 添加存储桶</span>
            <el-table :data="bucketList" style="width: 100%" :highlight-current-row="true">
              <el-table-column prop="bucketName" label="存储桶名称" header-align="center" align="center" width="120">
              </el-table-column>
              <el-table-column prop="" label="前缀（可选）" header-align="center" align="center" width="120">
              </el-table-column>
              <el-table-column prop="URN" label="资源标识" header-align="center" align="center" width="120">
              </el-table-column>
              <el-table-column label="操作" header-align="center" align="center" width="120">
              </el-table-column>
            </el-table>
            <span style="line-height: 40px; color:#1E90FF;">+ 添加对象</span>
            <el-table :data="objectList" style="width: 100%" :highlight-current-row="true">
              <el-table-column prop="objectName" label="对象名称" header-align="center" align="center" width="120">
              </el-table-column>
              <el-table-column prop="URN" label="资源标识" header-align="center" align="center" width="120">
              </el-table-column>
              <el-table-column label="操作" header-align="center" align="center" width="120">
              </el-table-column>
            </el-table>
          </div>
          <div class="title">请求条件(可选)</div>
          <div style="margin-left:30px">
            <div style="margin-bottom:20px; margin-top:20px">
              <el-checkbox v-model="conditions">添加条件</el-checkbox>
            </div>
            <div v-if="conditions" style="margin-left:20px">
              <el-row>
                <el-col :span="2"><label class="font-small">条件键</label></el-col>
                <el-col :span="10">
                  <el-select v-model="conditionKey">
                  <el-option
                  v-for="item in conditionKeys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              </el-row>
              <el-row>
                <el-col :span="2"><label class="font-small">限定词</label></el-col>
                <el-col :span="10">
                  <el-select v-model="limitWord">
                    <el-option
                    v-for="item in limitWords"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2"><label class="font-small">运算符</label></el-col>
                <el-col :span="10">
                  <el-select v-model="operator">
                    <el-option
                    v-for="item in operators"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2"><label class="font-small">值</label></el-col>
                <el-col :span="8"><el-input placeholder='条件值' v-model="conditionValue"></el-input></el-col>
                <el-col :span="8"><span @click="addConditionValue" style="line-height: 40px; color:#1E90FF;">+ 添加新的条件值</span></el-col>
              </el-row>
              <el-row v-for="(conditionValue, index) in conditionValues" :key="index">
                <el-col :span="2"><label class="font-small">值</label></el-col>
                <el-col :span="8"><el-input placeholder='条件值' v-model="conditionValues[index]"></el-input></el-col>
                <el-col :span="2"><i class="el-icon-delete" @click="deleteConditionValue(index)"></i></el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="JSON" name="second">
          <json-editor ref="jsonEditor" v-model="json"/>
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
          permissionName: "",
          description: "",
          activeName: "second",
          serviceOptions: [{
            value: '1',
            label: 'OOS'
          }, {
            value: '2',
            label: 'CloudTrail'
          }, {
            value: '3',
            label: 'Management'
          }, {
            value: '4',
            label: 'IAM'
          }],
          serviceValue: '1',
          Effect: '1',
          selectOperationName: '',
          props: {
            label: 'name',
            children: 'zones',
            isLeaf: 'leaf'
          },
          MFA: false,
          IP: false,
          conditions: false,
          conditionKey: '0',
          conditionKeys: [{
            value: '0',
            label: '选择条件键'
          }, {
            value: '1',
            label: 'CurrentTime'
          }, {
            value: '2',
            label: 'SourceIP'
          }, {
            value: '3',
            label: 'UserID'
          }, {
            value: '4',
            label: 'UserName'
          }],
          limitWord: '0',
          limitWords: [{
            value: '0',
            label: '默认'
          }, {
            value: '1',
            label: '请求中的任何值'
          }, {
            value: '2',
            label: '请求中的所有值'
          }],
          operator: '0',
          operators: [{
            value: '0',
            label: '选择运算符'
          }, {
            value: '1',
            label: 'IPAddress'
          }, {
            value: '2',
            label: 'NotIPAddress'
          }, {
            value: '3',
            label: 'StringEquals'
          }, {
            value: '4',
            label: 'StringNotEquals'
          }, {
            value: '5',
            label: 'StringEqualsIgnoreCase'
          }, {
            value: '6',
            label: 'StringNotEqualsIgnoreCase'
          }, {
            value: '7',
            label: 'StringLike'
          }, {
            value: '8',
            label: 'StringNotLike'
          }, {
            value: '9',
            label: 'DateEquals'
          }, {
            value: '10',
            label: 'DateNotEquals'
          }, {
            value: '11',
            label: 'DateLessThan'
          }, {
            value: '12',
            label: 'DateLessThanEquals'
          }, {
            value: '13',
            label: 'DateGreaterThan'
          }, {
            value: '14',
            label: 'DateGreaterTanEquals'
          }, {
            value: '15',
            label: 'UrnEquals'
          }, {
            value: '16',
            label: 'UrnNotEquals'
          }, {
            value: '17',
            label: 'UrnLike'
          }, {
            value: '18',
            label: 'UrnNotLike'
          }],
          conditionValues: [],
          conditionValue: '',
          resource: '1',
          expandControl: false,
          treeList:[{
          id: 0,
          name: '所有操作',
          zones: [{
            id: 1,
            name: '列表',
            zones: [{
              id: 5,
              name: 'hhhhhh'
            }, {
              id: 9,
              name: 'ppppp'
            }]
          }, {
            id: 2,
            name: '读取',
            zones: [{
              id: 6,
              name: 'llllll'
            }]
          }, {
            id: 3,
            name: '写入',
            zones: [{
              id: 7,
              name: 'wwwww'
            }]
          }, {
            id: 4,
            name: '权限管理',
            zones: [{
              id: 8,
              name: 'mmmmm'
            }]
          }]}],
          json: {"Version": "2012-10-17", "statement": [{"Effect": "Allow", "Action": [], "Resource": [], "Condition": {}}]}
        }
      },
      methods: {
        addConditionValue() {
          this.conditionValues.push('');
        },
        deleteConditionValue(index) {
          this.conditionValues.splice(index, 1);
        },
        expand() {
          for(var i=0;i<this.$refs.treeX.store._getAllNodes().length;i++) {
　　　　　　　　this.$refs.treeX.store._getAllNodes()[i].expanded=true;
　　　　　　}
        },
        fold() {
          for(var i=0;i<this.$refs.treeX.store._getAllNodes().length;i++) {
　　　　　　　　this.$refs.treeX.store._getAllNodes()[i].expanded=false;
　　　　　　}
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
        },
        handleClick(tab, event) {
          if(tab.name == "second") {
            let checkedNode = this.$refs.treeX.getCheckedNodes();
            let i = 0;
            this.json.statement[0].Action = [];
            checkedNode.forEach(node => {
              if(!node.zones) {
                this.json.statement[0].Action[i] = node.name;
                i++;
              }
            });
            let condition = {};
            let operator = this.operator;
            if(this.conditionKey != 0&&operator != 0&&this.conditionValue != 0) {
              condition[operator] = this.conditionKey+":"+this.conditionValue;
            }
            this.json.statement[0].Condition = condition;
          }
        }
      },
      watch: {
        selectOperationName(val) {
          this.$refs.treeX.filter(val);
        },
        Effect(val) {
          if(val == 1) {
            this.json.statement[0].Effect = 'Allow';
          }else {
            this.json.statement[0].Effect = 'Deny';
          }
        }
      }
    }
</script>
<style>
.font-small {
  font-size: small;
  color: #808080;
}
.el-input {
  width: 300px;
}
.el-row {
  margin-bottom: 20px;
  line-height: 40px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
