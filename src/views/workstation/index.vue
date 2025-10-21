<template>
  <div class="workstation-container">
    <vab-page-header description="审批工作台管理页面" :icon="['fas', 'tasks']" title="审批工作台" />
    
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="workstation-content">
            <h3>审批工作台</h3>
            <p>这里是审批工作台的主要内容区域，左侧导航栏正常显示。</p>
            <el-divider />
            <el-alert
              title="提示"
              description="当前页面显示左侧导航栏，提供完整的菜单导航功能。"
              type="success"
              :closable="false"
              show-icon
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VabPageHeader from '@/components/VabPageHeader'

export default {
  name: 'Workstation',
  components: {
    VabPageHeader,
  },
  data() {
    return {}
  },
  created() {
    // 审批工作台页面需要显示侧边栏菜单
    this.$store.dispatch('routes/setMenus', '/workstation')
  },
}
</script>

<style lang="scss" scoped>
.workstation-container {
  .workstation-content {
    padding: 20px;
    text-align: center;
    
    h3 {
      color: #67c23a;
      margin-bottom: 16px;
    }
    
    p {
      color: #606266;
      font-size: 14px;
      line-height: 1.6;
    }
  }
}
</style>
