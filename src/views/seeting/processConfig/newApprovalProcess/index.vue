<template>
  <div class="new-approval-process-page">
    <vab-page-header title="新建审批流程配置"></vab-page-header>

    <el-card class="form-card">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="180px">
        <el-form-item label="启用初审节点:" prop="enableInitialReview">
          <el-radio-group v-model="form.enableInitialReview">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="初审节点审批人类型:" prop="initialApproverType">
          <el-radio-group v-model="form.initialApproverType">
            <el-radio label="role">指定角色</el-radio>
            <el-radio label="department">指定部门</el-radio>
            <el-radio label="user">指定用户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择角色:" prop="selectedRole">
          <el-select v-model="form.selectedRole" placeholder="请选择角色" style="width: 200px;">
            <el-option label="初审人" value="initialApprover"></el-option>
            <el-option label="部门经理" value="departmentManager"></el-option>
            <el-option label="系统管理员" value="systemAdmin"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="终审节点审批人类型:" prop="finalApproverType">
          <el-radio-group v-model="form.finalApproverType">
            <el-radio label="role">指定角色</el-radio>
            <el-radio label="department">指定部门</el-radio>
            <el-radio label="user">指定用户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择部门:" prop="selectedDepartment">
          <el-select v-model="form.selectedDepartment" placeholder="请选择部门" style="width: 200px;">
            <el-option label="部门A" value="departmentA"></el-option>
            <el-option label="部门B" value="departmentB"></el-option>
            <el-option label="运营部" value="operationDept"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="抄送人类型:" prop="ccType">
          <el-radio-group v-model="form.ccType">
            <el-radio label="role">指定角色</el-radio>
            <el-radio label="department">指定部门</el-radio>
            <el-radio label="user">指定用户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择用户:" prop="selectedUser">
          <el-select v-model="form.selectedUser" placeholder="请选择用户" style="width: 200px;">
            <el-option label="张三" value="zhangsan"></el-option>
            <el-option label="李四" value="lisi"></el-option>
            <el-option label="王五" value="wangwu"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="form-actions">
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import VabPageHeader from '@/components/VabPageHeader'

export default {
  name: 'NewApprovalProcess',
  components: {
    VabPageHeader,
  },
  data() {
    return {
      form: {
        enableInitialReview: true,
        initialApproverType: 'role',
        selectedRole: 'initialApprover',
        finalApproverType: 'department',
        selectedDepartment: 'departmentA',
        ccType: 'role',
        selectedUser: 'zhangsan',
      },
      rules: {
        enableInitialReview: [
          { required: true, message: '请选择是否启用初审节点', trigger: 'change' }
        ],
        initialApproverType: [
          { required: true, message: '请选择初审节点审批人类型', trigger: 'change' }
        ],
        finalApproverType: [
          { required: true, message: '请选择终审节点审批人类型', trigger: 'change' }
        ],
        ccType: [
          { required: true, message: '请选择抄送人类型', trigger: 'change' }
        ],
      },
    }
  },
  methods: {
    handleSave() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$message.success('保存成功')
          console.log('表单数据:', this.form)
        } else {
          this.$message.error('请完善表单信息')
        }
      })
    },
    handleCancel() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.new-approval-process-page {
  .form-card {
    margin-top: 16px;
    
    .el-form {
      .el-form-item {
        margin-bottom: 24px;
        
        ::v-deep .el-form-item__label {
          font-weight: 500;
          text-align: left !important;
        }
        
        ::v-deep .el-radio-group {
          .el-radio {
            margin-right: 20px;
          }
        }
      }
    }
    
    .form-actions {
      display: flex;
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px solid #e4e7ed;
      
      .el-button {
        margin-right: 12px;
      }
    }
  }
}
</style>