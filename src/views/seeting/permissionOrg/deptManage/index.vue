<template>
  <div class="dept-manage-page">
    <vab-page-header title="部门管理" :icon="['fas', 'sitemap']" description="组织部门的信息维护与成员管理" />

    <el-card class="search-card" shadow="never">
      <vab-search-form :model="searchForm" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="ID：">
              <el-input v-model="searchForm.id" placeholder="请输入ID" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门名称：">
              <el-input v-model="searchForm.name" placeholder="请输入部门名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="actions-col">
            <el-form-item class="flex-end">
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </vab-search-form>
    </el-card>

    <el-card class="table-card" shadow="never">
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="部门名称" min-width="160" />
        <el-table-column prop="level" label="部门层级" width="100" />
        <el-table-column prop="parent" label="上级部门" min-width="160" />
        <el-table-column prop="quota" label="编制人数" width="100" />
        <el-table-column prop="updatedAt" label="更新时间" width="180" />
        <el-table-column label="操作" width="260" fixed="right">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="handleView(row)">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleViewUsers(row)">查看用户</el-button>
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
  name: 'DeptManage',
  components: { VabPageHeader, VabSearchForm },
  data() {
    return {
      loading: false,
      searchForm: { id: '', name: '' },
      tableData: [
        { id: 'D3012', name: '三级部门', level: 3, parent: '运维部/二部', quota: 25, updatedAt: '2024/05/21 22:08' },
        { id: 'D3013', name: '运维部', level: 1, parent: '-', quota: 78, updatedAt: '2025/11/04 01:53' },
      ],
      pagination: { currentPage: 1, pageSize: 10, total: 2 },
    }
  },
  created() {
    this.$store.dispatch('routes/setMenus', '/seeting')
  },
  methods: {
    handleSearch() { this.loading = true; setTimeout(() => (this.loading = false), 300) },
    handleReset() { this.searchForm = { id: '', name: '' }; this.handleSearch() },
    handleView(row) { this.$message.info(`查看部门：${row.name}`) },
    handleEdit(row) { this.$message.success(`编辑部门：${row.name}`) },
    handleViewUsers(row) { this.$message.info(`查看该部门关联用户：${row.quota} 人`) },
    handleDelete(row) {
      this.$confirm(`确定删除部门【${row.name}】吗？`, '警告', { type: 'warning' }).then(() => {
        this.tableData = this.tableData.filter((x) => x.id !== row.id)
        this.pagination.total = this.tableData.length
        this.$message.success('删除成功')
      })
    },
    handleSizeChange(size) { this.pagination.pageSize = size },
    handleCurrentChange(page) { this.pagination.currentPage = page },
  },
}
</script>

<style lang="scss" scoped>
.dept-manage-page {
  .search-card { margin-bottom: 16px; 
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
    .flex-end{
      display: flex;
      justify-content: flex-end;
    }
  }
  .table-card { .pagination-wrapper { margin-top: 16px; text-align: right; } }
  
}
</style>

