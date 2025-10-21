<template>
  <div class="approval-table-container">
    <el-tabs v-model="activeTab" class="approval-tabs" @tab-click="handleTabChange">
      <el-tab-pane label="待我审批" name="pending">
        <div class="tab-content">
          <!-- 搜索筛选 -->
          <el-card class="search-card">
            <el-form :model="currentSearchForm" label-width="90px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="ID:">
                    <el-input v-model="currentSearchForm.id" placeholder="请输入ID" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请标题:">
                    <el-input v-model="currentSearchForm.title" placeholder="请输入申请标题" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人:">
                    <el-input v-model="currentSearchForm.applicant" placeholder="请输入申请人姓名" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="申请时间:">
                    <el-date-picker v-model="currentSearchForm.date" type="date" placeholder="请选择日期" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="当前状态:">
                    <el-select v-model="currentSearchForm.status" placeholder="请选择状态" style="width: 100%">
                      <el-option label="审批中-初审" value="first_review" />
                      <el-option label="审批中-终审" value="final_review" />
                      <el-option label="已驳回-初审" value="rejected_first" />
                      <el-option label="已驳回-终审" value="rejected_final" />
                      <el-option label="已通过" value="approved" />
                      <el-option label="已作废" value="cancelled" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" class="button-col">
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
              <el-table-column prop="id" label="ID" width="150" />
              <el-table-column prop="title" label="申请标题" min-width="200" />
              <el-table-column prop="applicant" label="申请人" width="120" />
              <el-table-column prop="managementUnit" label="属地管理单位" min-width="180" />
              <el-table-column prop="applicationTime" label="申请时间" width="160" />
              <el-table-column prop="status" label="当前状态" width="120">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">
                    {{ getStatusText(row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150" fixed="right">
                <template #default="{ row }">
                  <el-button type="text" size="small" @click="handleViewOnly(row)">查看</el-button>
                  <el-button type="text" size="small" @click="handleProcess(row)">处理</el-button>
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

      <el-tab-pane label="我发起的" name="initiated">
        <div class="tab-content">
          <!-- 搜索筛选 -->
          <el-card class="search-card">
            <el-form :model="currentSearchForm" label-width="90px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="ID:">
                    <el-input v-model="currentSearchForm.id" placeholder="请输入ID" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请标题:">
                    <el-input v-model="currentSearchForm.title" placeholder="请输入申请标题" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请时间:">
                    <el-date-picker v-model="currentSearchForm.date" type="date" placeholder="请选择日期" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="当前状态:">
                    <el-select v-model="currentSearchForm.status" placeholder="请选择状态" style="width: 100%">
                      <el-option label="审批中-初审" value="first_review" />
                      <el-option label="审批中-终审" value="final_review" />
                      <el-option label="已通过" value="approved" />
                      <el-option label="已驳回-初审" value="rejected_first" />
                      <el-option label="已驳回-终审" value="rejected_final" />
                      <el-option label="已作废" value="cancelled" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="8" class="button-col">
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
              <el-table-column prop="id" label="ID" width="150" />
              <el-table-column prop="title" label="申请标题" min-width="200" />
              <el-table-column prop="managementUnit" label="属地管理单位" min-width="180" />
              <el-table-column prop="applicationTime" label="申请时间" width="160" />
              <el-table-column prop="status" label="当前状态" width="120">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">
                    {{ getStatusText(row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" fixed="right">
                <template #default="{ row }">
                  <el-button type="primary" size="small" @click="handleView(row)">查看</el-button>
                  <el-button 
                    v-if="row.status === 'rejected_first' || row.status === 'rejected_final'" 
                    type="success" 
                    size="small" 
                    @click="handleResubmit(row)"
                  >
                    重新提交
                  </el-button>
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

      <el-tab-pane label="已处理的" name="processed">
        <div class="tab-content">
          <!-- 搜索筛选 -->
          <el-card class="search-card">
            <el-form :model="currentSearchForm" label-width="90px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="ID:">
                    <el-input v-model="currentSearchForm.id" placeholder="请输入ID" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请标题:">
                    <el-input v-model="currentSearchForm.title" placeholder="请输入申请标题" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人:">
                    <el-input v-model="currentSearchForm.applicant" placeholder="请输入申请人姓名" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="申请时间:">
                    <el-date-picker v-model="currentSearchForm.date" type="date" placeholder="请选择日期" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="当前状态:">
                    <el-select v-model="currentSearchForm.status" placeholder="请选择状态" style="width: 100%">
                      <el-option label="审批中-初审" value="first_review" />
                      <el-option label="审批中-终审" value="final_review" />
                      <el-option label="已通过" value="approved" />
                      <el-option label="已驳回-初审" value="rejected_first" />
                      <el-option label="已驳回-终审" value="rejected_final" />
                      <el-option label="已作废" value="cancelled" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" class="button-col">
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
              <el-table-column prop="id" label="ID" width="150" />
              <el-table-column prop="title" label="申请标题" min-width="200" />
              <el-table-column prop="applicant" label="申请人" width="120" />
              <el-table-column prop="managementUnit" label="属地管理单位" min-width="180" />
              <el-table-column prop="submissionTime" label="提交时间" width="160" />
              <el-table-column prop="status" label="当前状态" width="120">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">
                    {{ getStatusText(row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" fixed="right">
                <template #default="{ row }">
                  <el-button type="primary" size="small" @click="handleView(row)">查看</el-button>
                  <el-button 
                    v-if="row.status === 'first_review' || row.status === 'final_review'" 
                    type="warning" 
                    size="small" 
                    @click="handleRecall(row)"
                  >
                    撤回
                  </el-button>
                  <el-button 
                    v-if="row.status === 'approved'" 
                    type="danger" 
                    size="small" 
                    @click="handleInvalidate(row)"
                  >
                    作废
                  </el-button>
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

      <el-tab-pane label="抄送我的" name="cc">
        <div class="tab-content">
          <!-- 搜索筛选 -->
          <el-card class="search-card">
            <el-form :model="currentSearchForm" label-width="90px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="ID:">
                    <el-input v-model="currentSearchForm.id" placeholder="请输入ID" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请标题:">
                    <el-input v-model="currentSearchForm.title" placeholder="请输入申请标题" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人:">
                    <el-input v-model="currentSearchForm.applicant" placeholder="请输入申请人姓名" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="申请时间:">
                    <el-date-picker v-model="currentSearchForm.date" type="date" placeholder="请选择日期" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="当前状态:">
                    <el-select v-model="currentSearchForm.status" placeholder="请选择状态" style="width: 100%">
                      <el-option label="审批中-初审" value="first_review" />
                      <el-option label="审批中-终审" value="final_review" />
                      <el-option label="已通过" value="approved" />
                      <el-option label="已驳回-初审" value="rejected_first" />
                      <el-option label="已驳回-终审" value="rejected_final" />
                      <el-option label="已作废" value="cancelled" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="当前审批人:">
                    <el-input v-model="currentSearchForm.approver" placeholder="请输入审批人姓名或部门名称" clearable />
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
              <el-table-column prop="id" label="ID" width="150" />
              <el-table-column prop="title" label="申请标题" min-width="200" />
              <el-table-column prop="applicant" label="申请人" width="120" />
              <el-table-column prop="managementUnit" label="属地管理单位" min-width="180" />
              <el-table-column prop="applicationTime" label="申请时间" width="160" />
              <el-table-column prop="currentApprover" label="当前审批人" width="120" />
              <el-table-column prop="status" label="当前状态" width="120">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">
                    {{ getStatusText(row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" fixed="right">
                <template #default="{ row }">
                  <el-button type="primary" size="small" @click="handleView(row)">查看</el-button>
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

    <!-- 审批对话框 -->
    <approval-dialog
      :dialog-visible.sync="approvalDialog.visible"
      :mode="approvalDialog.mode"
      :approval-data="approvalDialog.data"
      @submit="handleApprovalSubmit"
    />
  </div>
</template>

<script>
import ApprovalDialog from './ApprovalDialog.vue'

export default {
  name: 'ApprovalTable',
  components: {
    ApprovalDialog,
  },
  props: {
    // 审批类型：create-新建, online-上线, offline-下线
    approvalType: {
      type: String,
      default: 'create',
    },
    // 初始数据
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeTab: 'pending',
      
      // 审批对话框配置
      approvalDialog: {
        visible: false,
        mode: 'view',
        data: {},
      },
      
      // 统一的数据源配置
      tabsData: {
        pending: {
          searchForm: { id: '', title: '', applicant: '', date: '', status: '' },
          pagination: { currentPage: 1, pageSize: 100, total: 0 },
          loading: false,
          tableData: [],
        },
        initiated: {
          searchForm: { id: '', title: '', date: '', status: '' },
          pagination: { currentPage: 1, pageSize: 100, total: 0 },
          loading: false,
          tableData: [],
        },
        processed: {
          searchForm: { id: '', title: '', applicant: '', date: '', status: '' },
          pagination: { currentPage: 1, pageSize: 100, total: 0 },
          loading: false,
          tableData: [],
        },
        cc: {
          searchForm: { id: '', title: '', applicant: '', date: '', status: '', approver: '' },
          pagination: { currentPage: 1, pageSize: 100, total: 0 },
          loading: false,
          tableData: [],
        },
      },
    }
  },
  computed: {
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
      this.$emit('tab-change', this.activeTab)
    },

    // 获取状态类型
    getStatusType(status) {
      const statusMap = {
        first_review: 'warning',
        final_review: 'primary',
        approved: 'success',
        rejected_first: 'danger',
        rejected_final: 'danger',
        cancelled: 'info',
      }
      return statusMap[status] || 'info'
    },

    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        first_review: '审批中-初审',
        final_review: '审批中-终审',
        approved: '已通过',
        rejected_first: '已驳回-初审',
        rejected_final: '已驳回-终审',
        cancelled: '已作废',
      }
      return statusMap[status] || '未知'
    },

    // 搜索
    handleSearch() {
      this.currentPagination.currentPage = 1
      this.loadData()
      this.$emit('search', {
        tab: this.activeTab,
        searchForm: this.currentSearchForm,
      })
    },

    // 重置
    handleReset() {
      const defaultForm = {
        id: '',
        title: '',
        applicant: '',
        date: '',
        status: '',
        approver: '',
      }
      Object.assign(this.currentSearchForm, defaultForm)
      this.handleSearch()
    },

    // 仅查看
    handleViewOnly(row) {
      this.openApprovalDialog('view', row)
    },

    // 处理审批
    handleProcess(row) {
      this.openApprovalDialog('handle', row)
    },

    // 查看
    handleView(row) {
      const mode = this.activeTab === 'pending' ? 'handle' : 'view'
      this.openApprovalDialog(mode, row)
    },

    // 重新提交
    handleResubmit(row) {
      this.$message.info('重新提交功能')
    },

    // 撤回
    handleRecall(row) {
      this.$message.info('撤回功能')
    },

    // 作废
    handleInvalidate(row) {
      this.openApprovalDialog('cancel', row)
    },

    // 打开审批对话框
    openApprovalDialog(mode, row) {
      // 模拟审批数据
      this.approvalDialog.data = {
        id: row.id,
        title: row.title,
        attachment: [
          {
            name: '申请材料.jpg',
            size: '2.5MB',
            url: 'https://picsum.photos/400/300?random=1'
          },
          {
            name: '身份证扫描件.png',
            size: '1.8MB',
            url: 'https://picsum.photos/400/300?random=2'
          },
          {
            name: '营业执照.pdf',
            size: '3.2MB',
            url: 'https://via.placeholder.com/400x300/409eff/ffffff?text=PDF+Document'
          }
        ],
        firstReviewTime: '2025/04/23 15:16:46',
        firstReviewer: '王明',
        firstResult: '通过',
        firstOpinion: '上传资料全部符合规定，黄双效审核。',
        firstAttachment: [
          {
            name: '初审意见截图.jpg',
            size: '1.2MB',
            url: 'https://picsum.photos/400/300?random=3'
          }
        ],
        finalResult: row.status === 'approved' ? '通过' : '',
        finalOpinion: row.status === 'approved' ? '上传资料全部符合规定，黄双效审核。' : '',
        finalAttachments: row.status === 'approved' ? [
          {
            name: '终审通过证明.jpg',
            size: '1.5MB',
            url: 'https://picsum.photos/400/300?random=4'
          },
          {
            name: '审批文件.pdf',
            size: '2.1MB',
            url: 'https://via.placeholder.com/400x300/67c23a/ffffff?text=Approval+Document'
          }
        ] : [],
      }
      this.approvalDialog.mode = mode
      this.approvalDialog.visible = true
    },

    // 审批提交回调
    handleApprovalSubmit(data) {
      console.log('审批提交数据:', data)
      
      const messages = {
        view: '查看完成',
        handle: data.result === 'pass' ? '审批通过' : '审批驳回',
        cancel: '作废成功',
      }
      
      this.$message.success(messages[data.mode] || '操作成功')
      
      // 刷新当前标签页数据
      this.loadData()
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
      this.currentTabData.pagination.total = this.currentTableData.length
      this.currentTabData.loading = true
      setTimeout(() => {
        this.currentTabData.loading = false
      }, 500)
      this.$emit('load-data', {
        tab: this.activeTab,
        pagination: this.currentPagination,
      })
    },

    // 设置表格数据
    setTableData(tab, data) {
      if (this.tabsData[tab]) {
        this.tabsData[tab].tableData = data
        this.tabsData[tab].pagination.total = data.length
      }
    },

    // 获取表格数据
    getTableData(tab) {
      return this.tabsData[tab]?.tableData || []
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
.approval-table-container {
  padding:30px;
  .approval-tabs {
    .tab-content {
      .search-card {
        margin-bottom: 20px;

        .el-form {
          .el-form-item {
            margin-bottom: 16px;
            width: 100%;
            
            ::v-deep .el-form-item__label {
              text-align: left !important;
            }
            
            ::v-deep .el-form-item__content {
              width: 50%;
            }
          }
        }
        
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

