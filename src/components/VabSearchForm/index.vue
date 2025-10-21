<template>
  <div class="vab-search-form">
    <el-form :model="model" :label-width="labelWidth">
      <slot />
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'VabSearchForm',
  props: {
    model: {
      type: Object,
      required: true,
    },
    labelWidth: {
      type: String,
      default: '90px',
    },
  },
}
</script>

<style lang="scss" scoped>
.vab-search-form {
  // 对齐审批工作台的查询区样式
  :deep(.el-form) {
    .el-form-item {
      margin-bottom: 16px;
      width: 100%;

      .el-form-item__label {
        text-align: left !important;
        white-space: nowrap;
      }

      .el-form-item__content {
        width: 50%;
      }

      .el-input,
      .el-select,
      .el-date-editor {
        width: 100%;
      }
    }
  }

  // 查询按钮列右对齐的辅助类
  .actions-col {
    .el-form-item {
      :deep(.el-form-item__content) {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>



