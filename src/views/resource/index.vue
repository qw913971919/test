<template>
  <div class="electronic-screen-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">电子屏列表</h1>
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新建电子屏</el-button>
    </div>

    <!-- 标签页 -->
    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="电子屏建设审批通过" name="approved"></el-tab-pane>
      <el-tab-pane label="电子屏建设审批未完成" name="pending"></el-tab-pane>
    </el-tabs>

    <!-- 搜索筛选区域 -->
    <el-card class="search-card">
      <el-form :model="searchForm" label-width="120px">
        <!-- 电子屏建设审批通过标签页的筛选条件 -->
        <template v-if="activeTab === 'approved'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="LED屏名称:">
                <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="属地管理单位:">
                <el-select v-model="searchForm.managementUnit" placeholder="请选择" style="width: 100%" clearable>
                  <el-option label="渝北区城管委" value="yubei" />
                  <el-option label="江北区城管委" value="jiangbei" />
                  <el-option label="南岸区城管委" value="nanan" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上下线状态:">
                <el-select v-model="searchForm.onlineStatus" placeholder="请选择" style="width: 100%" clearable>
                  <el-option label="上线" value="online" />
                  <el-option label="下线" value="offline" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="运行状态:">
                <el-select v-model="searchForm.operationStatus" placeholder="请选择" style="width: 100%" clearable>
                  <el-option label="正常运行" value="normal" />
                  <el-option label="故障维修" value="fault" />
                  <el-option label="暂停使用" value="suspended" />
                  <el-option label="报废停用" value="scrapped" />
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
        </template>
        
        <!-- 电子屏建设审批未完成标签页的筛选条件 -->
        <template v-else-if="activeTab === 'pending'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="LED屏名称:">
                <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="属地管理单位:">
                <el-select v-model="searchForm.managementUnit" placeholder="请选择" style="width: 100%" clearable>
                  <el-option label="渝北区城管委" value="yubei" />
                  <el-option label="江北区城管委" value="jiangbei" />
                  <el-option label="南岸区城管委" value="nanan" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="新建审批:">
                <el-select v-model="searchForm.approvalStatus" placeholder="请选择" style="width: 100%" clearable>
                  <el-option label="未发起" value="not_initiated" />
                  <el-option label="审批中-初审" value="pending_first" />
                  <el-option label="审批中-终审" value="pending_final" />
                  <el-option label="已驳回" value="rejected" />
                  <el-option label="已作废" value="invalidated" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="button-col">
              <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        
        <!-- 全部标签页的筛选条件（保持原有） -->
        <template v-else>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="LED屏名称:">
                <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="属地管理单位:">
                <el-select v-model="searchForm.managementUnit" placeholder="请选择" style="width: 100%" clearable>
                  <el-option label="渝北区城管委" value="yubei" />
                  <el-option label="江北区城管委" value="jiangbei" />
                  <el-option label="南岸区城管委" value="nanan" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上下线状态:">
                <el-select v-model="searchForm.onlineStatus" placeholder="请选择" style="width: 100%" clearable>
                  <el-option label="上线" value="online" />
                  <el-option label="下线" value="offline" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
    <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="新建审批:">
                <el-select v-model="searchForm.approvalStatus" placeholder="请选择" style="width: 100%" clearable>
                  <el-option label="已通过" value="approved" />
                  <el-option label="审批中" value="pending" />
                  <el-option label="已驳回" value="rejected" />
                  <el-option label="未发起" value="not_initiated" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="运行状态:">
                  <el-select v-model="searchForm.operationStatus" placeholder="请选择" style="width: 100%" clearable>
                    <el-option label="正常运行" value="normal" />
                    <el-option label="故障维修" value="fault" />
                    <el-option label="暂停使用" value="suspended" />
                    <el-option label="报废停用" value="scrapped" />
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
        </template>
      </el-form>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="table-card">
      <el-table :data="filteredTableData" v-loading="loading" stripe>
        <el-table-column prop="name" label="LED屏名称" min-width="150" />
        <el-table-column prop="managementUnit" label="属地管理单位" width="120" />
        <el-table-column prop="location" label="大屏位置" min-width="200" />
        <el-table-column prop="screenTime" label="开关屏时间" width="120" />
        
        <!-- 电子屏建设审批通过标签页 -->
        <el-table-column v-if="activeTab === 'approved'" prop="onlineStatus" label="上下线状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.onlineStatus" :type="getOnlineStatusType(row.onlineStatus)">
              {{ getOnlineStatusText(row.onlineStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="activeTab === 'approved'" prop="operationStatus" label="运行状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.operationStatus" :type="getOperationStatusType(row.operationStatus)">
              {{ getOperationStatusText(row.operationStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        
        <!-- 电子屏建设审批未完成标签页 -->
        <el-table-column v-if="activeTab === 'pending'" prop="approvalStatus" label="新建审批" width="100">
          <template #default="{ row }">
            <el-tag :type="getApprovalStatusType(row.approvalStatus)">
              {{ getApprovalStatusText(row.approvalStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        
        <!-- 全部标签页 -->
        <el-table-column v-if="activeTab === 'all'" prop="onlineStatus" label="上下线状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.onlineStatus" :type="getOnlineStatusType(row.onlineStatus)">
              {{ getOnlineStatusText(row.onlineStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="activeTab === 'all'" prop="operationStatus" label="运行状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.operationStatus" :type="getOperationStatusType(row.operationStatus)">
              {{ getOperationStatusText(row.operationStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="activeTab === 'all'" prop="approvalStatus" label="新建审批" width="100">
          <template #default="{ row }">
            <el-tag :type="getApprovalStatusType(row.approvalStatus)">
              {{ getApprovalStatusText(row.approvalStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        
        <!-- 通用列 -->
        <el-table-column prop="venueOwner" label="场地所有单位" min-width="150" />
        <el-table-column prop="screenOwner" label="大屏权属单位" min-width="150" />
        <el-table-column prop="screenOperator" label="大屏运营单位" min-width="150" />
        
        <!-- 操作列 -->
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <!-- 电子屏建设审批通过标签页的操作按钮 -->
            <template v-if="activeTab === 'approved'">
              <el-button v-if="row.onlineStatus === 'online'" type="text" size="small" @click="handleOffline(row)">申请下线</el-button>
              <el-button v-else-if="row.onlineStatus === 'offline'" type="text" size="small" @click="handleOnline(row)">申请上线</el-button>
              <el-button type="text" size="small" @click="handleView(row)">查看</el-button>
              <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
            </template>
            
            <!-- 电子屏建设审批未完成标签页的操作按钮 -->
            <template v-else-if="activeTab === 'pending'">
              <el-button v-if="row.approvalStatus === 'not_initiated'" type="text" size="small" @click="handleInitiateApproval(row)">发起审批</el-button>
              <el-button v-if="row.approvalStatus === 'rejected'" type="text" size="small" @click="handleResubmit(row)">重新提交</el-button>
              <el-button v-if="row.approvalStatus === 'invalidated'" type="text" size="small" @click="handleResubmit(row)">重新提交</el-button>
              <el-button type="text" size="small" @click="handleView(row)">查看</el-button>
              <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
            </template>
            
            <!-- 全部标签页的操作按钮 -->
            <template v-else>
              <el-button v-if="row.onlineStatus === 'online'" type="text" size="small" @click="handleOffline(row)">申请下线</el-button>
              <el-button v-else-if="row.onlineStatus === 'offline'" type="text" size="small" @click="handleOnline(row)">申请上线</el-button>
              <el-button v-if="row.approvalStatus === 'not_initiated'" type="text" size="small" @click="handleInitiateApproval(row)">发起审批</el-button>
              <el-button v-if="row.approvalStatus === 'rejected'" type="text" size="small" @click="handleResubmit(row)">重新提交</el-button>
              <el-button type="text" size="small" @click="handleView(row)">查看</el-button>
              <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
            />
          </div>
        </el-card>

    <!-- 电子屏详情对话框 -->
    <el-dialog
      :visible.sync="detailDialogVisible"
      width="90%"
      :close-on-click-modal="false"
      class="screen-detail-dialog"
    >
      <ScreenDetail 
        :screen-data="currentScreenData" 
        :default-edit-mode="isEditMode"
        @close="handleCloseDetail"
        @update="handleUpdateScreenData"
        @initiate-application="handleOpenNewApplication"
      />
    </el-dialog>

    <!-- 新建电子屏对话框 -->
    <el-dialog
      :visible.sync="newScreenDialogVisible"
      width="90%"
      :close-on-click-modal="false"
      class="screen-detail-dialog"
    >
      <NewScreen
        @close="handleCloseNewScreen"
        @submit="handleSubmitNewScreen"
      />
    </el-dialog>
    
    <!-- 新建申请对话框 -->
    <el-dialog
      :visible.sync="newApplicationDialogVisible"
      width="90%"
      :close-on-click-modal="false"
      class="screen-detail-dialog"
    >
      <NewApplication
        :initial-data="currentApplicationData"
        @close="handleCloseNewApplication"
        @submit="handleSubmitNewApplication"
      />
    </el-dialog>
  </div>
</template>

<script>
import ScreenDetail from './components/ScreenDetail.vue'
import NewScreen from './components/NewScreen.vue'
import NewApplication from './components/NewApplication.vue'

export default {
  name: 'ElectronicScreen',
  components: {
    ScreenDetail,
    NewScreen,
    NewApplication
  },
  data() {
    return {
      activeTab: 'all',
      loading: false,
      searchForm: {
        name: '',
        managementUnit: '',
        onlineStatus: '',
        approvalStatus: '',
        operationStatus: '',
      },
      tableData: [
        {
          id: '1',
          name: '时代天街LED-01',
          managementUnit: '渝北区城管委',
          location: '重庆市渝北区祥和路新城广场1-4层',
          screenTime: '08:00-22:00',
          onlineStatus: 'online',
          operationStatus: 'normal',
          approvalStatus: 'approved',
          venueOwner: '时代天街有限公司',
          screenOwner: '城市管理委员会',
          screenOperator: '智慧城市科技有限公司',
          // 详细信息
          city: '重庆市',
          district: '渝北区',
          street: '仙桃街道',
          community: '同盛路社区',
          venueContact: '何友蕊',
          venuePhone: '14713923167',
          screenOwnerContact: '钱雅柔',
          screenOwnerPhone: '13676109806',
          screenOperatorContact: '鲁秋翠',
          screenOperatorPhone: '18832496058',
          remarks: '用于展示公益广告、商业广告等。',
        },
        {
          id: '2',
          name: '解放碑LED-01',
          managementUnit: '渝北区城管委',
          location: '重庆市渝北区祥和路新城广场1-4层',
          screenTime: '08:00-22:00',
          onlineStatus: 'offline',
          operationStatus: 'suspended',
          approvalStatus: 'approved',
          venueOwner: '时代天街有限公司',
          screenOwner: '城市管理委员会',
          screenOperator: '智慧城市科技有限公司',
        },
        {
          id: '3',
          name: '时代天街LED-02',
          managementUnit: '渝北区城管委',
          location: '重庆市渝北区祥和路新城广场1-4层',
          screenTime: '08:00-22:00',
          onlineStatus: '',
          operationStatus: '',
          approvalStatus: 'not_initiated',
          venueOwner: '时代天街有限公司',
          screenOwner: '城市管理委员会',
          screenOperator: '智慧城市科技有限公司',
        },
        {
          id: '4',
          name: '解放碑LED-02',
          managementUnit: '渝北区城管委',
          location: '重庆市渝北区祥和路新城广场1-4层',
          screenTime: '08:00-22:00',
          onlineStatus: '',
          operationStatus: '',
          approvalStatus: 'pending_first',
          venueOwner: '时代天街有限公司',
          screenOwner: '城市管理委员会',
          screenOperator: '智慧城市科技有限公司',
        },
        {
          id: '5',
          name: '时代天街LED-03',
          managementUnit: '渝北区城管委',
          location: '重庆市渝北区祥和路新城广场1-4层',
          screenTime: '08:00-22:00',
          onlineStatus: '',
          operationStatus: '',
          approvalStatus: 'pending_final',
          venueOwner: '时代天街有限公司',
          screenOwner: '城市管理委员会',
          screenOperator: '智慧城市科技有限公司',
        },
        {
          id: '7',
          name: '解放碑LED-03',
          managementUnit: '渝北区城管委',
          location: '重庆市渝北区祥和路新城广场1-4层',
          screenTime: '08:00-22:00',
          onlineStatus: '',
          operationStatus: '',
          approvalStatus: 'rejected',
          venueOwner: '时代天街有限公司',
          screenOwner: '城市管理委员会',
          screenOperator: '智慧城市科技有限公司',
        },
        {
          id: '8',
          name: '解放碑LED-04',
          managementUnit: '渝北区城管委',
          location: '重庆市渝北区祥和路新城广场1-4层',
          screenTime: '08:00-22:00',
          onlineStatus: '',
          operationStatus: '',
          approvalStatus: 'invalidated',
          venueOwner: '时代天街有限公司',
          screenOwner: '城市管理委员会',
          screenOperator: '智慧城市科技有限公司',
        },
        {
          id: '6',
          name: '观音桥LED-01',
          managementUnit: '江北区城管委',
          location: '重庆市江北区观音桥步行街',
          screenTime: '09:00-21:00',
          onlineStatus: 'offline',
          operationStatus: 'scrapped',
          approvalStatus: 'approved',
          venueOwner: '观音桥商业管理有限公司',
          screenOwner: '城市管理委员会',
          screenOperator: '智慧城市科技有限公司',
        },
      ],
      pagination: {
        currentPage: 1,
        pageSize: 100,
        total: 8,
      },
      // 详情对话框
      detailDialogVisible: false,
      currentScreenData: {},
      isEditMode: false,
      newScreenDialogVisible: false,
      newApplicationDialogVisible: false,
      currentApplicationData: {},
    }
  },
  computed: {
    // 根据当前标签页过滤表格数据
    filteredTableData() {
      if (this.activeTab === 'approved') {
        // 电子屏建设审批通过：只显示审批状态为已通过的记录
        return this.tableData.filter(item => item.approvalStatus === 'approved')
      } else if (this.activeTab === 'pending') {
        // 电子屏建设审批未完成：显示审批状态为未完成的各种状态
        return this.tableData.filter(item => 
          ['not_initiated', 'pending_first', 'pending_final', 'rejected', 'invalidated'].includes(item.approvalStatus)
        )
      } else {
        // 全部：显示所有记录
        return this.tableData
      }
    }
  },
  methods: {
    // 标签页切换
    handleTabClick(tab) {
      console.log('切换标签页:', tab.name)
      this.loadData()
    },

    // 搜索
    handleSearch() {
      this.pagination.currentPage = 1
      this.loadData()
    },

    // 重置
    handleReset() {
      this.searchForm = {
        name: '',
        managementUnit: '',
        onlineStatus: '',
        approvalStatus: '',
        operationStatus: '',
      }
      this.handleSearch()
    },

    // 新建电子屏
    handleCreate() {
      this.newScreenDialogVisible = true
    },
    
    handleCloseNewScreen() {
      this.newScreenDialogVisible = false
    },
    
    handleCloseNewApplication() {
      this.newApplicationDialogVisible = false
    },
    
    handleOpenNewApplication(applicationData) {
      // 关闭详情对话框，打开新建申请对话框
      console.log('接收到的申请数据:', applicationData)
      this.detailDialogVisible = false
      this.currentApplicationData = applicationData || {}
      this.newApplicationDialogVisible = true
    },
    
    handleSubmitNewApplication(applicationData) {
      console.log('收到新建申请数据:', applicationData)
      // 这里可以调用API提交申请
      this.$message.success('新建申请已提交')
      this.newApplicationDialogVisible = false
    },
    
    handleSubmitNewScreen(screenData) {
      console.log('收到新建电子屏数据:', screenData)
      // 这里可以调用API提交数据
      this.$message.success('新建电子屏成功')
      this.newScreenDialogVisible = false
      // 刷新表格数据
      this.loadData()
    },

    // 申请下线
    handleOffline(row) {
      this.$message.info(`申请下线: ${row.name}`)
    },

    // 申请上线
    handleOnline(row) {
      this.$message.info(`申请上线: ${row.name}`)
    },

    // 发起审批
    handleInitiateApproval(row) {
      this.$message.info(`发起审批: ${row.name}`)
    },

    // 重新提交
    handleResubmit(row) {
      this.$message.info(`重新提交: ${row.name}`)
    },

    // 关闭详情对话框
    handleCloseDetail() {
      this.detailDialogVisible = false
      this.isEditMode = false
    },

    // 更新屏幕数据
    handleUpdateScreenData(updatedData) {
      console.log('Received updated data:', updatedData)
      // 找到对应的数据项并更新
      const index = this.tableData.findIndex(item => item.id === updatedData.id)
      console.log('Found index:', index)
      if (index !== -1) {
        this.$set(this.tableData, index, { ...updatedData })
        this.currentScreenData = { ...updatedData }
        console.log('Updated table data:', this.tableData[index])
      }
    },

    // 查看
    handleView(row) {
      console.log('handleView called with row:', row)
      this.currentScreenData = { ...row }
      this.isEditMode = false
      this.detailDialogVisible = true
      console.log('currentScreenData set to:', this.currentScreenData)
      console.log('detailDialogVisible set to:', this.detailDialogVisible)
    },

    // 编辑
    handleEdit(row) {
      this.currentScreenData = { ...row }
      this.isEditMode = true
      this.detailDialogVisible = true
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确定要删除这个电子屏吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },

    // 分页处理
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.loadData()
    },

    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.loadData()
    },

    // 加载数据
    loadData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },

    // 获取上下线状态类型
    getOnlineStatusType(status) {
      const typeMap = {
        online: 'success',
        offline: 'danger',
      }
      return typeMap[status] || 'info'
    },

    // 获取上下线状态文本
    getOnlineStatusText(status) {
      const textMap = {
        online: '上线',
        offline: '下线',
      }
      return textMap[status] || ''
    },

    // 获取运行状态类型
    getOperationStatusType(status) {
      const typeMap = {
        normal: 'success',
        suspended: 'warning',
        fault: 'danger',
        scrapped: 'info',
      }
      return typeMap[status] || 'info'
    },

    // 获取运行状态文本
    getOperationStatusText(status) {
      const textMap = {
        normal: '正常运行',
        suspended: '暂停使用',
        fault: '故障维修',
        scrapped: '报废停用',
      }
      return textMap[status] || ''
    },

    // 获取审批状态类型
    getApprovalStatusType(status) {
      const typeMap = {
        approved: 'success',
        pending: 'warning',
        pending_first: 'warning',
        pending_final: 'warning',
        rejected: 'danger',
        not_initiated: 'info',
        invalidated: 'info',
      }
      return typeMap[status] || 'info'
    },

    // 获取审批状态文本
    getApprovalStatusText(status) {
      const textMap = {
        approved: '已通过',
        pending: '审批中',
        pending_first: '审批中-初审',
        pending_final: '审批中-终审',
        rejected: '已驳回',
        not_initiated: '未发起',
        invalidated: '已作废',
      }
      return textMap[status] || ''
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style lang="scss" scoped>
.electronic-screen-container {
    padding: 20px;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
      margin: 0;
    }
  }

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

  :deep(.el-tabs__header) {
    margin-bottom: 20px;
  }

  :deep(.el-tabs__nav-wrap::after) {
    background-color: #e4e7ed;
  }

  :deep(.el-tabs__item) {
    font-size: 14px;
    font-weight: 500;
  }

  :deep(.el-tabs__item.is-active) {
    color: #409eff;
  }
}

// 详情对话框样式
::v-deep .screen-detail-dialog {
  .el-dialog {
    margin-top: 5vh !important;
    height: 90vh;
    display: flex;
    flex-direction: column;
  }
  
  .el-dialog__header {
    display: none !important;
  }
  
  .el-dialog__body {
    flex: 1;
    padding: 0;
    overflow: hidden;
  }
}
</style>