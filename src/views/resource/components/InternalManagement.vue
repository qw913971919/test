<template>
  <div class="internal-management-section">
    <h3>内部管理信息</h3>
    
    <!-- 查看模式 -->
    <div v-if="!isEditing" class="simple-info-list">
      <!-- 管理制度 -->
      <div class="simple-info-item">
        <span class="simple-label">管理制度:</span>
        <span class="simple-value">{{ managementData.managementSystem.hasSystem ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ managementData.managementSystem.remarks || '无' }}</span>
      </div>
      
      <!-- 专管人员 -->
      <div class="simple-info-item">
        <span class="simple-label">专管人员:</span>
        <span class="simple-value">{{ managementData.dedicatedPersonnel.contact || '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">联系电话:</span>
        <span class="simple-value">{{ managementData.dedicatedPersonnel.phone || '无' }}</span>
      </div>
      
      <!-- 监控人员1 -->
      <div class="simple-info-item">
        <span class="simple-label">监控人员1:</span>
        <span class="simple-value">{{ managementData.monitoringPersonnel1.contact || '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">联系电话:</span>
        <span class="simple-value">{{ managementData.monitoringPersonnel1.phone || '无' }}</span>
      </div>
      
      <!-- 监控人员2 -->
      <div class="simple-info-item">
        <span class="simple-label">监控人员2:</span>
        <span class="simple-value">{{ managementData.monitoringPersonnel2.contact || '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">联系电话:</span>
        <span class="simple-value">{{ managementData.monitoringPersonnel2.phone || '无' }}</span>
      </div>
      
      <!-- 监控人员3 -->
      <div class="simple-info-item">
        <span class="simple-label">监控人员3:</span>
        <span class="simple-value">{{ managementData.monitoringPersonnel3.contact || '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">联系电话:</span>
        <span class="simple-value">{{ managementData.monitoringPersonnel3.phone || '无' }}</span>
      </div>
      
      <!-- 独立管理 -->
      <div class="simple-info-item">
        <span class="simple-label">独立管理:</span>
        <span class="simple-value">{{ managementData.standaloneManagement.isStandalone ? '是' : '否' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ managementData.standaloneManagement.remarks || '无' }}</span>
      </div>
      
      <!-- 互联网连接 -->
      <div class="simple-info-item">
        <span class="simple-label">互联网连接:</span>
        <span class="simple-value">{{ managementData.internetConnection.hasInternet ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ managementData.internetConnection.remarks || '无' }}</span>
      </div>
      
      <!-- 专线 -->
      <div class="simple-info-item">
        <span class="simple-label">专线:</span>
        <span class="simple-value">{{ managementData.dedicatedLine.hasDedicatedLine ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ managementData.dedicatedLine.remarks || '无' }}</span>
      </div>
      
      <!-- 专机 -->
      <div class="simple-info-item">
        <span class="simple-label">专机:</span>
        <span class="simple-value">{{ managementData.dedicatedMachine.hasDedicatedMachine ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ managementData.dedicatedMachine.remarks || '无' }}</span>
      </div>
      
      <!-- 用户名 -->
      <div class="simple-info-item">
        <span class="simple-label">用户名:</span>
        <span class="simple-value">{{ managementData.usernameSystem.hasUsername ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ managementData.usernameSystem.remarks || '无' }}</span>
      </div>
      
      <!-- 密码管理 -->
      <div class="simple-info-item">
        <span class="simple-label">密码管理:</span>
        <span class="simple-value">{{ managementData.passwordManagement.hasPassword ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ managementData.passwordManagement.remarks || '无' }}</span>
      </div>
      
      <!-- 技术防护 -->
      <div class="simple-info-item">
        <span class="simple-label">技术防护:</span>
        <span class="simple-value">{{ managementData.technicalProtection.hasProtection ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ managementData.technicalProtection.remarks || '无' }}</span>
      </div>
    </div>
    
    <!-- 编辑模式 -->
    <div v-else class="edit-form">
      <el-form :model="managementData" label-width="120px">
        <!-- 管理制度 -->
        <el-form-item label="管理制度:">
          <div class="form-row">
            <el-radio-group v-model="managementData.managementSystem.hasSystem">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="managementData.managementSystem.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 专管人员 -->
        <el-form-item label="专管人员:">
          <div class="personnel-section">
            <div class="contact-row">
              <span class="contact-label">联系人:</span>
              <el-input 
                v-model="managementData.dedicatedPersonnel.contact" 
                placeholder="请输入联系人" 
                class="contact-input"
              />
            </div>
            <div class="contact-row">
              <span class="contact-label">联系电话:</span>
              <el-input 
                v-model="managementData.dedicatedPersonnel.phone" 
                placeholder="请输入联系电话" 
                class="contact-input"
              />
            </div>
          </div>
        </el-form-item>
        
        <!-- 监控人员1 -->
        <el-form-item label="监控人员1:">
          <div class="personnel-section">
            <div class="contact-row">
              <span class="contact-label">联系人:</span>
              <el-input 
                v-model="managementData.monitoringPersonnel1.contact" 
                placeholder="请输入联系人" 
                class="contact-input"
              />
            </div>
            <div class="contact-row">
              <span class="contact-label">联系电话:</span>
              <el-input 
                v-model="managementData.monitoringPersonnel1.phone" 
                placeholder="请输入联系电话" 
                class="contact-input"
              />
            </div>
          </div>
        </el-form-item>
        
        <!-- 监控人员2 -->
        <el-form-item label="监控人员2:">
          <div class="personnel-section">
            <div class="contact-row">
              <span class="contact-label">联系人:</span>
              <el-input 
                v-model="managementData.monitoringPersonnel2.contact" 
                placeholder="请输入联系人" 
                class="contact-input"
              />
            </div>
            <div class="contact-row">
              <span class="contact-label">联系电话:</span>
              <el-input 
                v-model="managementData.monitoringPersonnel2.phone" 
                placeholder="请输入联系电话" 
                class="contact-input"
              />
            </div>
          </div>
        </el-form-item>
        
        <!-- 监控人员3 -->
        <el-form-item label="监控人员3:">
          <div class="personnel-section">
            <div class="contact-row">
              <span class="contact-label">联系人:</span>
              <el-input 
                v-model="managementData.monitoringPersonnel3.contact" 
                placeholder="请输入联系人" 
                class="contact-input"
              />
            </div>
            <div class="contact-row">
              <span class="contact-label">联系电话:</span>
              <el-input 
                v-model="managementData.monitoringPersonnel3.phone" 
                placeholder="请输入联系电话" 
                class="contact-input"
              />
            </div>
          </div>
        </el-form-item>
        
        <!-- 独立管理 -->
        <el-form-item label="独立管理:">
          <div class="form-row">
            <el-radio-group v-model="managementData.standaloneManagement.isStandalone">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="managementData.standaloneManagement.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 互联网连接 -->
        <el-form-item label="互联网连接:">
          <div class="form-row">
            <el-radio-group v-model="managementData.internetConnection.hasInternet">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="managementData.internetConnection.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 专线 -->
        <el-form-item label="专线:">
          <div class="form-row">
            <el-radio-group v-model="managementData.dedicatedLine.hasDedicatedLine">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="managementData.dedicatedLine.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 专机 -->
        <el-form-item label="专机:">
          <div class="form-row">
            <el-radio-group v-model="managementData.dedicatedMachine.hasDedicatedMachine">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="managementData.dedicatedMachine.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 用户名 -->
        <el-form-item label="用户名:">
          <div class="form-row">
            <el-radio-group v-model="managementData.usernameSystem.hasUsername">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="managementData.usernameSystem.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 密码管理 -->
        <el-form-item label="密码管理:">
          <div class="form-row">
            <el-radio-group v-model="managementData.passwordManagement.hasPassword">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="managementData.passwordManagement.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 技术防护 -->
        <el-form-item label="技术防护:">
          <div class="form-row">
            <el-radio-group v-model="managementData.technicalProtection.hasProtection">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="managementData.technicalProtection.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
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
  name: 'InternalManagement',
  props: {
    managementData: {
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
    
    handleInitiateApplication() {
      this.$emit('initiate-application')
    }
  }
}
</script>

<style lang="scss" scoped>
.internal-management-section {
  padding: 20px;
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.simple-info-list {
  margin-bottom: 20px;
}

.simple-info-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.simple-info-item:last-child {
  border-bottom: none;
}

.simple-label {
  width: 120px;
  font-weight: 500;
  color: #666;
  flex-shrink: 0;
}

.simple-value {
  flex: 1;
  color: #333;
  font-weight: 500;
}

.edit-form {
  margin-bottom: 20px;
  
  ::v-deep .el-form .el-form-item__label {
    text-align: left !important;
  }
  
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
  
  ::v-deep .el-radio-group {
    .el-radio {
      margin-right: 20px;
    }
  }
}

.form-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.remark-label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}

.remark-input {
  width: 300px;
  
  ::v-deep .el-input__inner {
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    
    &:focus {
      border-color: #1890ff;
    }
  }
}

.personnel-section {
  .contact-row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.contact-label {
  font-size: 14px;
  color: #333;
  width: 80px;
  flex-shrink: 0;
}

.contact-input {
  width: 300px;
  
  ::v-deep .el-input__inner {
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    
    &:focus {
      border-color: #1890ff;
    }
  }
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
