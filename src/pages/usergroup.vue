<template>
<div>
  <!-- <el-row> -->
  <el-steps :active="active" align-center>
    <el-step title="设置用户组" class="el-step"></el-step>
    <el-step title="设置权限"></el-step>
    <el-step title="信息审核"></el-step>
    <el-step title="完成"></el-step>
  </el-steps>
  <!-- </el-row>
  <el-row> -->
  <div v-if='active==0' class="xcard">
    <h3 class="inline">设置用户组名</h3>&nbsp;&nbsp;&nbsp;<span class="font-small">组名创建成功后不可修改，请谨慎命名</span>
    <div class="xcard">
      <span class="font-small">用户组名</span>
    </div>
    <div style="margin-top: 10px">
      <el-input v-model="inputGroupName" style="width:300px"></el-input>
    </div>
  </div>
  <div v-if='active==1' class="xcard">
    <h3>附加策略（可选）</h3>
    <div style="margin:20px">
      <el-button type="primary">创建策略</el-button>&nbsp;&nbsp;&nbsp;
      <el-input v-model="inputPremissionName" placeholder="策略名称 或 策略描述" style="width:300px"></el-input>
      <h4 class="inline">策略类型</h4>
      <el-select v-model="PremissionValue" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
  <div v-if='active==2' class="xcard">
    <el-card>
      <h3 class="inline">用户组信息</h3><span style="float:right; color:#226DDD" @click="toGroupName">编辑</span></Br>
      <div class="xcard">
        用户组名*&nbsp;&nbsp;&nbsp;&nbsp;<span>{{inputGroupName}}</span>
      </div>
      <div class='xcard'>
        <h3 class="inline">权限信息</h3> &nbsp;&nbsp;&nbsp;&nbsp;<span class="font-small">以下策略将附加到用户组上</span>
        <span style="float:right; color:#226DDD" @click="toPermission">编辑</span></Br>
      </div>
    </el-card>
  </div>
  <div v-if='active==3' class="xcard">
    <h4>创建完成</h4>
    <el-card>
      <h3 style="color: #226DDD">创建用户组完成</h3>
      <div class="font-small" style="margin-top: 20px; margin-bottom:20px">您已经成功创建用户组，可将IAM用户添加至组以便管理</div>
      <el-button type="primary" plain>返回组</el-button>
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
        value: '选项1',
        label: '全部类型'
      }, {
        value: '选项2',
        label: '系统策略'
      }, {
        value: '选项3',
        label: '自定义策略'
      }]
    };
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    toPermission() {
      this.active = 1;
    },
    toGroupName() {
      this.active = 0;
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
