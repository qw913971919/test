<template>
  <div class="config-table-container">
    <el-tabs v-model="activeTab" class="config-tabs" @tab-click="handleTabChange">
      <el-tab-pane label="配置列表" name="list">
        <div class="tab-content">
          <el-card class="search-card">
            <vab-search-form :model="currentSearchForm" label-width="90px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="配置项:">
                    <el-input v-model="currentSearchForm.name" placeholder="请输入配置项名称" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="配置值:">
                    <el-input v-model="currentSearchForm.value" placeholder="请输入配置值" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="状态:">
                    <el-select v-model="currentSearchForm.status" placeholder="请选择状态" style="width: 100%">
                      <el-option label="启用" value="enabled" />
                      <el-option label="禁用" value="disabled" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建时间:">
                    <el-date-picker v-model="currentSearchForm.date" type="date" placeholder="请选择日期" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="8" class="button-col actions-col">
                  <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button @click="handleReset">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </vab-search-form>
          </el-card>

          <!-- 操作按钮 -->
          <el-card class="action-card">
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加配置</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button>
          </el-card>

          <!-- 数据表格 -->
          <el-card class="table-card">
            <el-table 
              :data="currentTableData" 
              v-loading="currentLoading" 
              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="id" label="ID" width="100" />
              <el-table-column prop="name" label="配置项名称" min-width="150" />
              <el-table-column prop="value" label="配置值" min-width="150" />
              <el-table-column prop="description" label="描述" min-width="200" />
              <el-table-column prop="updateTime" label="更新时间" width="160" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="{ row }">
                  <el-tag :type="row.status === 'enabled' ? 'success' : 'info'">
                    {{ row.status === 'enabled' ? '启用' : '禁用' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" fixed="right">
                <template #default="{ row }">
                  <el-button type="text" size="small" @click="handleView(row)">查看</el-button>
                  <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
                  <el-button type="text" size="small" style="color: #f56c6c" @click="handleDelete(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="currentPagination.currentPage"
                v-model:page-size="currentPagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="currentPagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-card>
        </div>
      </el-tab-pane>

      <el-tab-pane label="操作历史" name="history">
        <div class="tab-content">
          <!-- 搜索筛选 -->
          <el-card class="search-card">
            <el-form :model="currentSearchForm" label-width="90px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="操作人:">
                    <el-input v-model="currentSearchForm.operator" placeholder="请输入操作人" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="操作类型:">
                    <el-select v-model="currentSearchForm.operationType" placeholder="请选择操作类型" style="width: 100%">
                      <el-option label="新增" value="add" />
                      <el-option label="修改" value="edit" />
                      <el-option label="删除" value="delete" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="操作时间:">
                    <el-date-picker v-model="currentSearchForm.date" type="date" placeholder="请选择日期" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8" :offset="16" class="button-col">
                  <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button @click="handleReset">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>

          <!-- 数据表格 -->
          <el-card class="table-card">
            <el-table :data="currentTableData" v-loading="currentLoading" stripe>
              <el-table-column prop="id" label="ID" width="100" />
              <el-table-column prop="configName" label="配置项" min-width="150" />
              <el-table-column prop="operationType" label="操作类型" width="100">
                <template #default="{ row }">
                  <el-tag :type="getOperationTypeColor(row.operationType)">
                    {{ getOperationTypeText(row.operationType) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="operator" label="操作人" width="120" />
              <el-table-column prop="operationTime" label="操作时间" width="160" />
              <el-table-column prop="description" label="操作描述" min-width="200" />
              <el-table-column label="操作" width="120" fixed="right">
                <template #default="{ row }">
                  <el-button type="text" size="small" @click="handleViewHistory(row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="currentPagination.currentPage"
                v-model:page-size="currentPagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="currentPagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 配置对话框 -->
    <el-dialog 
      :title="dialogTitle" 
      :visible.sync="dialogVisible" 
      width="600px"
      @close="handleDialogClose"
    >
      <el-form :model="formData" :rules="formRules" ref="configForm" label-width="100px">
        <el-form-item label="配置项名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入配置项名称" :disabled="dialogMode === 'view'" />
        </el-form-item>
        <el-form-item label="配置值" prop="value">
          <el-input v-model="formData.value" placeholder="请输入配置值" :disabled="dialogMode === 'view'" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input 
            v-model="formData.description" 
            type="textarea" 
            :rows="3"
            placeholder="请输入描述" 
            :disabled="dialogMode === 'view'" 
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status" :disabled="dialogMode === 'view'">
            <el-radio label="enabled">启用</el-radio>
            <el-radio label="disabled">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-if="dialogMode !== 'view'" type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VabSearchForm from '@/components/VabSearchForm'
export default {
  name: 'ConfigTable',
  components: { VabSearchForm },
  props: {
    // 配置类型
    configType: {
      type: String,
      default: 'permission',
    },
    // 初始数据
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeTab: 'list',
      
      // 对话框配置
      dialogVisible: false,
      dialogMode: 'add', // add, edit, view
      formData: {
        name: '',
        value: '',
        description: '',
        status: 'enabled',
      },
      formRules: {
        name: [
          { required: true, message: '请输入配置项名称', trigger: 'blur' },
        ],
        value: [
          { required: true, message: '请输入配置值', trigger: 'blur' },
        ],
      },
      
      // 选中的行
      selectedRows: [],
      
      // 统一的数据源配置
      tabsData: {
        list: {
          searchForm: { name: '', value: '', status: '', date: '' },
          pagination: { currentPage: 1, pageSize: 10, total: 0 },
          loading: false,
          tableData: [],
        },
        history: {
          searchForm: { operator: '', operationType: '', date: '' },
          pagination: { currentPage: 1, pageSize: 10, total: 0 },
          loading: false,
          tableData: [],
        },
      },
    }
  },
  computed: {
    dialogTitle() {
      const titleMap = {
        add: '添加配置',
        edit: '编辑配置',
        view: '查看配置',
      }
      return titleMap[this.dialogMode] || '配置'
    },
    currentTabData() {
      return this.tabsData[this.activeTab]
    },
    currentSearchForm() {
      return this.currentTabData.searchForm
    },
    currentPagination() {
      return this.currentTabData.pagination
    },
    currentLoading() {
      return this.currentTabData.loading
    },
    currentTableData() {
      return this.currentTabData.tableData
    },
  },
  methods: {
    // 标签页切换
    handleTabChange() {
      console.log('切换到标签页:', this.activeTab)
      this.loadData()
    },

    // 搜索
    handleSearch() {
      this.currentPagination.currentPage = 1
      this.loadData()
    },

    // 重置
    handleReset() {
      Object.keys(this.currentSearchForm).forEach((key) => {
        this.currentSearchForm[key] = ''
      })
      this.handleSearch()
    },

    // 添加
    handleAdd() {
      this.dialogMode = 'add'
      this.formData = {
        name: '',
        value: '',
        description: '',
        status: 'enabled',
      }
      this.dialogVisible = true
    },

    // 查看
    handleView(row) {
      this.dialogMode = 'view'
      this.formData = { ...row }
      this.dialogVisible = true
    },

    // 编辑
    handleEdit(row) {
      this.dialogMode = 'edit'
      this.formData = { ...row }
      this.dialogVisible = true
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确定要删除这条配置吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message.success('删除成功')
        this.loadData()
      }).catch(() => {})
    },

    // 批量删除
    handleBatchDelete() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择要删除的数据')
        return
      }
      this.$confirm(`确定要删除选中的 ${this.selectedRows.length} 条配置吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message.success('删除成功')
        this.loadData()
      }).catch(() => {})
    },

    // 表格选择变化
    handleSelectionChange(selection) {
      this.selectedRows = selection
    },

    // 查看历史详情
    handleViewHistory(row) {
      this.$message.info('查看历史详情功能')
    },

    // 对话框关闭
    handleDialogClose() {
      if (this.$refs.configForm) {
        this.$refs.configForm.resetFields()
      }
    },

    // 提交表单
    handleSubmit() {
      this.$refs.configForm.validate((valid) => {
        if (valid) {
          const message = this.dialogMode === 'add' ? '添加成功' : '修改成功'
          this.$message.success(message)
          this.dialogVisible = false
          this.loadData()
        }
      })
    },

    // 获取操作类型颜色
    getOperationTypeColor(type) {
      const colorMap = {
        add: 'success',
        edit: 'warning',
        delete: 'danger',
      }
      return colorMap[type] || 'info'
    },

    // 获取操作类型文本
    getOperationTypeText(type) {
      const textMap = {
        add: '新增',
        edit: '修改',
        delete: '删除',
      }
      return textMap[type] || '未知'
    },

    // 分页处理
    handleSizeChange(val) {
      this.currentPagination.pageSize = val
      this.loadData()
    },

    handleCurrentChange(val) {
      this.currentPagination.currentPage = val
      this.loadData()
    },

    // 加载数据
    loadData() {
      this.currentTabData.loading = true
      setTimeout(() => {
        this.currentTabData.loading = false
      }, 500)
      this.$emit('load-data', {
        tab: this.activeTab,
        pagination: this.currentPagination,
        searchForm: this.currentSearchForm,
      })
    },

    // 设置表格数据
    setTableData(tab, data) {
      if (this.tabsData[tab]) {
        this.tabsData[tab].tableData = data
        this.tabsData[tab].pagination.total = data.length
      }
    },
  },
  created() {
    // 初始化数据
    if (this.initialData && Object.keys(this.initialData).length > 0) {
      Object.keys(this.initialData).forEach((key) => {
        if (this.tabsData[key] && this.initialData[key].tableData) {
          this.tabsData[key].tableData = this.initialData[key].tableData
          this.tabsData[key].pagination.total = this.initialData[key].tableData.length
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.config-table-container {
  padding: 30px;
  
  .config-tabs {
    .tab-content {
      .search-card {
        margin-bottom: 20px;
        // 搜索样式已统一到 VabSearchForm
        
        // 按钮列样式 - 让按钮靠右对齐
        .button-col {
          .el-form-item {
            margin-left: auto;
            
            ::v-deep .el-form-item__content {
              display: flex;
              justify-content: flex-end;
              margin-left: 0 !important;
            }
          }
        }
      }

      .action-card {
        margin-bottom: 20px;
      }

      .table-card {
        .pagination-wrapper {
          margin-top: 20px;
          text-align: right;
        }
      }
    }
  }

  :deep(.el-tabs__header) {
    margin-bottom: 20px;
  }

  :deep(.el-tabs__nav-wrap::after) {
    background-color: #e4e7ed;
  }

  :deep(.el-tabs__item.is-active) {
    color: #409eff;
    font-weight: 500;
  }

  :deep(.el-tabs__active-bar) {
    background-color: #409eff;
  }
}
</style>

