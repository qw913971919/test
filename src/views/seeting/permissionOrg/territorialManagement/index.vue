<template>
  <div class="territorial-manage-page">
    <vab-page-header title="属地管理单位管理" :icon="['fas', 'landmark']" description="属地管理单位的信息维护与管理" />

    <el-card class="search-card" shadow="never">
      <vab-search-form :model="searchForm" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="ID：">
              <el-input v-model="searchForm.id" placeholder="请输入ID" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="属地管理单位名称：">
              <el-input v-model="searchForm.name" placeholder="请输入属地管理单位名称" clearable />
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
        <el-table-column prop="name" label="属地管理单位名称" min-width="220" />
        <el-table-column prop="updatedAt" label="更新时间" width="180" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="handleView(row)">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
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
  name: 'TerritorialManagement',
  components: { VabPageHeader, VabSearchForm },
  data() {
    return {
      loading: false,
      searchForm: { id: '', name: '' },
      tableData: [
        { id: 'D0012', name: '观音桥管委', updatedAt: '2024/05/21 22:08' },
        { id: 'D0013', name: '观音桥街道', updatedAt: '2025/11/04 01:53' },
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
    handleView(row) { this.$message.info(`查看单位：${row.name}`) },
    handleEdit(row) { this.$message.success(`编辑单位：${row.name}`) },
    handleDelete(row) {
      this.$confirm(`确定删除【${row.name}】吗？`, '警告', { type: 'warning' }).then(() => {
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
.territorial-manage-page {
  .search-card { margin-bottom: 16px;
    .el-form {
      .el-form-item {
        margin-bottom: 16px;
        width: 100%;

        ::v-deep .el-form-item__label {
          text-align: left !important;
          white-space: nowrap; // 文本不换行，保证与输入框同一行
        }

        // 与审批工作台相同：内容区域固定50%宽度，且与标签同一行
        ::v-deep .el-form-item__content {
          width: 50%;
          display: inline-flex;
          align-items: center;
        }
      }
    }
    .flex-end{
      display: flex;
      justify-content: flex-end;
    } }
  .table-card { .pagination-wrapper { margin-top: 16px; text-align: right; } }
}
</style>

