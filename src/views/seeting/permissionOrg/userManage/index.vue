<template>
  <div class="user-manage-page">
    <vab-page-header title="用户管理" :icon="['fas', 'users']" description="用户信息的查询、维护与权限控制" />

    <el-card class="search-card" shadow="never">
      <vab-search-form :model="searchForm" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="ID：">
              <el-input v-model="searchForm.id" placeholder="请输入ID" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名：">
              <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号：">
              <el-input v-model="searchForm.mobile" placeholder="请输入手机号" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="更新时间：">
              <el-date-picker v-model="searchForm.updateDate" type="date" placeholder="请选择日期" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态：">
              <el-select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 100%">
                <el-option label="启用" value="启用" />
                <el-option label="停用" value="停用" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="actions-col">
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </vab-search-form>
    </el-card>

    <el-card class="table-card" shadow="never">
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="loginAccount" label="登录账号" width="140" />
        <el-table-column prop="mobile" label="手机号码" width="140" />
        <el-table-column prop="department" label="所属部门" width="120" />
        <el-table-column prop="role" label="角色" width="140" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '启用' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" width="180" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="handleView(row)">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleResetPwd(row)">重置密码</el-button>
            <el-button type="text" size="small" @click="handleToggle(row)">{{ row.status === '启用' ? '禁用' : '启用' }}</el-button>
            <el-button type="text" size="small" style="color:#f56c6c" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import VabPageHeader from '@/components/VabPageHeader'
import VabSearchForm from '@/components/VabSearchForm'

export default {
  name: 'UserManage',
  components: { VabPageHeader, VabSearchForm },
  data() {
    return {
      loading: false,
      searchForm: {
        id: '',
        name: '',
        mobile: '',
        department: '',
        role: '',
        status: '',
        updateDate: '',
      },
      tableData: [
        {
          id: '01',
          name: '熊鑫磊',
          loginAccount: '13062023732',
          mobile: '13062023732',
          department: '项目部',
          role: '运营、开发',
          status: '启用',
          updatedAt: '2024/05/21 22:08',
        },
        {
          id: '02',
          name: '葛元安',
          loginAccount: '14906221541',
          mobile: '14906221541',
          department: '项目部',
          role: '项目经理',
          status: '停用',
          updatedAt: '2025/04/07 19:41',
        },
        {
          id: '03',
          name: '严红晓',
          loginAccount: '14709376233',
          mobile: '14709376233',
          department: '项目部',
          role: '负责人',
          status: '启用',
          updatedAt: '2025/11/04 01:53',
        },
      ],
      pagination: { currentPage: 1, pageSize: 10, total: 3 },
    }
  },
  created() {
    this.$store.dispatch('routes/setMenus', '/seeting')
  },
  methods: {
    handleSearch() {
      this.loading = true
      setTimeout(() => (this.loading = false), 300)
    },
    handleReset() {
      this.searchForm = { id: '', name: '', mobile: '', department: '', role: '', status: '', updateDate: '' }
      this.handleSearch()
    },
    handleView(row) {
      this.$message.info(`查看 ${row.name}`)
    },
    handleEdit(row) {
      this.$message.success(`编辑 ${row.name}`)
    },
    handleResetPwd(row) {
      this.$confirm(`确定重置【${row.name}】的密码吗？`, '提示', { type: 'warning' }).then(() => {
        this.$message.success('已重置密码')
      })
    },
    handleToggle(row) {
      row.status = row.status === '启用' ? '停用' : '启用'
      this.$message.success(`${row.name} 已${row.status === '启用' ? '启用' : '禁用'}`)
    },
    handleDelete(row) {
      this.$confirm(`确定删除【${row.name}】吗？`, '警告', { type: 'warning' }).then(() => {
        this.tableData = this.tableData.filter((x) => x.id !== row.id)
        this.pagination.total = this.tableData.length
        this.$message.success('删除成功')
      })
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page
    },
  },
}
</script>

<style lang="scss" scoped>
.user-manage-page {
  .search-card {
    margin-bottom: 16px;
    .actions-col {
      .el-form-item {
        ::v-deep .el-form-item__content {
          display: flex;
          justify-content: flex-end;
          margin-left: 0 !important;
        }
      }
    }
    .flex-end{
      display: flex;
      justify-content: flex-end;
    }
    // 严格对齐审批工作台（ApprovalTable）
    .el-form {
      .el-form-item {
        margin-bottom: 16px;
        width: 100%;

        ::v-deep .el-form-item__label {
          text-align: left !important;
        }

        // 与审批工作台相同：内容区域固定50%宽度
        ::v-deep .el-form-item__content {
          width: 50%;
        }
      }
    }
  }
  .table-card {
    .pagination-wrapper {
      margin-top: 16px;
      text-align: right;
    }
  }
}
</style>

