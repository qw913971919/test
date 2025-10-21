<template>
  <div class="equipment-security-section">
    <h3>设备物理安全资料</h3>
    
    <!-- 查看模式 -->
    <div v-if="!isEditing" class="equipment-info-list">
      <div class="equipment-item">
        <div class="equipment-label">营业执照:</div>
        <div class="equipment-content">
          <div class="file-info">
            <span class="file-name">{{ equipmentData.businessLicense.fileName }}</span>
            <span class="file-size">{{ equipmentData.businessLicense.fileSize }}</span>
          </div>
          <div class="file-actions">
            <el-button type="text" class="action-link">查看</el-button>
            <el-button type="text" class="action-link">下载</el-button>
          </div>
        </div>
      </div>
      
      <div class="equipment-item">
        <div class="equipment-label">广告经营许可证:</div>
        <div class="equipment-content">
          <div class="file-info">
            <span class="file-name">{{ equipmentData.advertisingLicense.fileName }}</span>
            <span class="file-size">{{ equipmentData.advertisingLicense.fileSize }}</span>
          </div>
          <div class="file-actions">
            <el-button type="text" class="action-link">查看</el-button>
            <el-button type="text" class="action-link">下载</el-button>
          </div>
        </div>
      </div>
      
      <div class="equipment-item">
        <div class="equipment-label">建筑规划许可:</div>
        <div class="equipment-content">
          <div class="file-info">
            <span class="file-name">{{ equipmentData.buildingPermit.fileName }}</span>
            <span class="file-size">{{ equipmentData.buildingPermit.fileSize }}</span>
          </div>
          <div class="file-actions">
            <el-button type="text" class="action-link">查看</el-button>
            <el-button type="text" class="action-link">下载</el-button>
          </div>
        </div>
      </div>
      
      <div class="equipment-item">
        <div class="equipment-label">安全性能检测报告:</div>
        <div class="equipment-content">
          <div class="file-info">
            <span class="file-name">{{ equipmentData.safetyTestReport.fileName }}</span>
            <span class="file-size">{{ equipmentData.safetyTestReport.fileSize }}</span>
          </div>
          <div class="file-actions">
            <el-button type="text" class="action-link">查看</el-button>
            <el-button type="text" class="action-link">下载</el-button>
          </div>
        </div>
      </div>
      
      <div class="equipment-item">
        <div class="equipment-label">设备安全年检报告:</div>
        <div class="equipment-content">
          <div class="file-info">
            <span class="file-name">{{ equipmentData.annualInspectionReport.fileName }}</span>
            <span class="file-size">{{ equipmentData.annualInspectionReport.fileSize }}</span>
          </div>
          <div class="file-actions">
            <el-button type="text" class="action-link">查看</el-button>
            <el-button type="text" class="action-link">下载</el-button>
          </div>
        </div>
      </div>
      
      <div class="equipment-item">
        <div class="equipment-label">最后年检日期:</div>
        <div class="equipment-content">
          <span class="date-value">{{ equipmentData.lastInspectionDate || '未设置' }}</span>
        </div>
      </div>
      
      <div class="equipment-item">
        <div class="equipment-label">年检有效期至:</div>
        <div class="equipment-content">
          <span class="date-value">{{ equipmentData.inspectionExpiryDate || '未设置' }}</span>
        </div>
      </div>
    </div>
    
    <!-- 编辑模式 -->
    <div v-else class="equipment-edit-form">
      <el-form :model="equipmentData" label-width="140px">
        <el-form-item label="营业执照:">
          <div class="file-upload-section">
            <div class="file-info" v-if="equipmentData.businessLicense.fileName">
              <span class="file-name">{{ equipmentData.businessLicense.fileName }}</span>
              <span class="file-size">{{ equipmentData.businessLicense.fileSize }}</span>
            </div>
            <div class="file-actions" v-if="equipmentData.businessLicense.fileName">
              <el-button type="text" class="action-link">查看</el-button>
              <el-button type="text" class="action-link">下载</el-button>
              <el-button type="text" class="action-link delete-link" @click="handleDeleteFile('businessLicense')">删除</el-button>
            </div>
            <el-button type="primary" class="upload-btn">
              <i class="el-icon-upload"></i>
              上传文件
            </el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="广告经营许可证:">
          <div class="file-upload-section">
            <div class="file-info" v-if="equipmentData.advertisingLicense.fileName">
              <span class="file-name">{{ equipmentData.advertisingLicense.fileName }}</span>
              <span class="file-size">{{ equipmentData.advertisingLicense.fileSize }}</span>
            </div>
            <div class="file-actions" v-if="equipmentData.advertisingLicense.fileName">
              <el-button type="text" class="action-link">查看</el-button>
              <el-button type="text" class="action-link">下载</el-button>
              <el-button type="text" class="action-link delete-link" @click="handleDeleteFile('advertisingLicense')">删除</el-button>
            </div>
            <el-button type="primary" class="upload-btn">
              <i class="el-icon-upload"></i>
              上传文件
            </el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="建筑规划许可:">
          <div class="file-upload-section">
            <div class="file-info" v-if="equipmentData.buildingPermit.fileName">
              <span class="file-name">{{ equipmentData.buildingPermit.fileName }}</span>
              <span class="file-size">{{ equipmentData.buildingPermit.fileSize }}</span>
            </div>
            <div class="file-actions" v-if="equipmentData.buildingPermit.fileName">
              <el-button type="text" class="action-link">查看</el-button>
              <el-button type="text" class="action-link">下载</el-button>
              <el-button type="text" class="action-link delete-link" @click="handleDeleteFile('buildingPermit')">删除</el-button>
            </div>
            <el-button type="primary" class="upload-btn">
              <i class="el-icon-upload"></i>
              上传文件
            </el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="安全性能检测报告:">
          <div class="file-upload-section">
            <div class="file-info" v-if="equipmentData.safetyTestReport.fileName">
              <span class="file-name">{{ equipmentData.safetyTestReport.fileName }}</span>
              <span class="file-size">{{ equipmentData.safetyTestReport.fileSize }}</span>
            </div>
            <div class="file-actions" v-if="equipmentData.safetyTestReport.fileName">
              <el-button type="text" class="action-link">查看</el-button>
              <el-button type="text" class="action-link">下载</el-button>
              <el-button type="text" class="action-link delete-link" @click="handleDeleteFile('safetyTestReport')">删除</el-button>
            </div>
            <el-button type="primary" class="upload-btn">
              <i class="el-icon-upload"></i>
              上传文件
            </el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="设备安全年检报告:">
          <div class="file-upload-section">
            <div class="file-info" v-if="equipmentData.annualInspectionReport.fileName">
              <span class="file-name">{{ equipmentData.annualInspectionReport.fileName }}</span>
              <span class="file-size">{{ equipmentData.annualInspectionReport.fileSize }}</span>
            </div>
            <div class="file-actions" v-if="equipmentData.annualInspectionReport.fileName">
              <el-button type="text" class="action-link">查看</el-button>
              <el-button type="text" class="action-link">下载</el-button>
              <el-button type="text" class="action-link delete-link" @click="handleDeleteFile('annualInspectionReport')">删除</el-button>
            </div>
            <el-button type="primary" class="upload-btn">
              <i class="el-icon-upload"></i>
              上传文件
            </el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="最后年检日期:">
          <el-date-picker
            v-model="equipmentData.lastInspectionDate"
            type="date"
            placeholder="请选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            class="date-picker"
          />
        </el-form-item>
        
        <el-form-item label="年检有效期至:">
          <el-date-picker
            v-model="equipmentData.inspectionExpiryDate"
            type="date"
            placeholder="请选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            class="date-picker"
          />
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 操作按钮 -->
    <div class="action-buttons" v-if="!hideActions">
      <template v-if="!isEditing">
        <el-button type="primary" class="action-btn primary" @click="handleEdit">编辑</el-button>
        <el-button v-if="onlineStatus === 'online'" class="action-btn secondary">申请下线</el-button>
        <el-button v-else-if="onlineStatus === 'offline'" class="action-btn secondary">申请上线</el-button>
        <el-button class="action-btn secondary">修改运行状态</el-button>
      </template>
      <template v-else>
        <el-button type="primary" class="action-btn primary" @click="handleSave">保存</el-button>
        <el-button class="action-btn secondary" @click="handleCancel">取消</el-button>
        <el-button type="primary" class="action-btn primary" @click="handleInitiateApplication">发起新建申请</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquipmentSecurity',
  props: {
    equipmentData: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    hideActions: {
      type: Boolean,
      default: false
    },
    onlineStatus: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleEdit() {
      this.$emit('edit')
    },
    
    handleSave() {
      this.$emit('save')
    },
    
    handleCancel() {
      this.$emit('cancel')
    },
    
    handleDeleteFile(fileType) {
      this.$confirm('确定要删除该文件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.equipmentData[fileType] = {
          fileName: '',
          fileSize: '',
          fileUrl: ''
        }
        this.$message.success('文件删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    
    handleInitiateApplication() {
      this.$emit('initiate-application')
    }
  }
}
</script>

<style lang="scss" scoped>
.equipment-security-section {
  padding: 20px;
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.equipment-info-list {
  margin-bottom: 20px;
}

.equipment-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.equipment-item:last-child {
  border-bottom: none;
}

.equipment-label {
  width: 140px;
  font-weight: 500;
  color: #333;
  flex-shrink: 0;
}

.equipment-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.file-name {
  color: #333;
  font-weight: 500;
}

.file-size {
  color: #999;
  font-size: 12px;
}

.file-actions {
  display: flex;
  gap: 8px;
}

.action-link {
  color: #409eff;
  padding: 0;
  font-size: 14px;
}

.action-link:hover {
  color: #66b1ff;
}

.delete-link {
  color: #f56c6c !important;
}

.delete-link:hover {
  color: #f78989 !important;
}

.date-value {
  color: #333;
  font-weight: 500;
}

.equipment-edit-form {
  margin-bottom: 20px;
  
  ::v-deep .el-form-item {
    margin-bottom: 18px;
  }
  
  ::v-deep .el-input__inner,
  ::v-deep .el-textarea__inner {
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    
    &:focus {
      border-color: #1890ff;
    }
  }
}

.file-upload-section {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.file-upload-section .file-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
}

.file-upload-section .file-actions {
  display: flex;
  gap: 8px;
  margin-right: 16px;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}

.upload-btn i {
  font-size: 14px;
}

.date-picker {
  width: 200px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.action-btn {
  min-width: 100px;
  height: 36px;
  border-radius: 4px;
  font-size: 14px;
}

.action-btn.primary {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.action-btn.primary:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.action-btn.secondary {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  color: #666;
}

.action-btn.secondary:hover {
  background-color: #e6e6e6;
  border-color: #bfbfbf;
}
</style>
