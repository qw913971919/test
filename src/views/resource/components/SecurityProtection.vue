<template>
  <div class="security-protection-section">
    <h3>安全防护</h3>
    
    <!-- 查看模式 -->
    <div v-if="!isEditing" class="simple-info-list">
      <!-- 有无独立刊播机房 -->
      <div class="simple-info-item">
        <span class="simple-label">有无独立刊播机房:</span>
        <span class="simple-value">{{ securityData.independentRoom.hasRoom ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.independentRoom.remarks || '无' }}</span>
      </div>
      
      <!-- 有无机房监控设备 -->
      <div class="simple-info-item">
        <span class="simple-label">有无机房监控设备:</span>
        <span class="simple-value">{{ securityData.monitoringEquipment.hasEquipment ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.monitoringEquipment.remarks || '无' }}</span>
      </div>
      
      <!-- 有无24小时值班值守 -->
      <div class="simple-info-item">
        <span class="simple-label">有无24小时值班值守:</span>
        <span class="simple-value">{{ securityData.dutyPersonnel.hasPersonnel ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.dutyPersonnel.remarks || '无' }}</span>
      </div>
      
      <!-- 有无病毒软件 -->
      <div class="simple-info-item">
        <span class="simple-label">有无病毒软件:</span>
        <span class="simple-value">{{ securityData.antivirusSoftware.hasSoftware ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.antivirusSoftware.remarks || '无' }}</span>
      </div>
      
      <!-- 有无防攻击防篡改措施 -->
      <div class="simple-info-item">
        <span class="simple-label">有无防攻击防篡改措施:</span>
        <span class="simple-value">{{ securityData.antiAttackMeasures.hasMeasures ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.antiAttackMeasures.remarks || '无' }}</span>
      </div>
      
      <!-- 有无安全审计 -->
      <div class="simple-info-item">
        <span class="simple-label">有无安全审计:</span>
        <span class="simple-value">{{ securityData.securityAudit.hasAudit ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.securityAudit.remarks || '无' }}</span>
      </div>
      
      <!-- 有无日志记录 -->
      <div class="simple-info-item">
        <span class="simple-label">有无日志记录:</span>
        <span class="simple-value">{{ securityData.logRecords.hasRecords ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.logRecords.remarks || '无' }}</span>
      </div>
      
      <!-- 有无网络安全等级保护制度 -->
      <div class="simple-info-item">
        <span class="simple-label">有无网络安全等级保护制度:</span>
        <span class="simple-value">{{ securityData.securityLevelProtection.hasProtection ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.securityLevelProtection.remarks || '无' }}</span>
      </div>
      
      <!-- 有无漏洞扫描补丁修复 -->
      <div class="simple-info-item">
        <span class="simple-label">有无漏洞扫描补丁修复:</span>
        <span class="simple-value">{{ securityData.vulnerabilityScanning.hasScanning ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.vulnerabilityScanning.remarks || '无' }}</span>
      </div>
      
      <!-- 有无外界存储介质杀毒 -->
      <div class="simple-info-item">
        <span class="simple-label">有无外界存储介质杀毒:</span>
        <span class="simple-value">{{ securityData.storageMediaAntivirus.hasAntivirus ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.storageMediaAntivirus.remarks || '无' }}</span>
      </div>
      
      <!-- 有无突发网络安全事件应急处置预案 -->
      <div class="simple-info-item">
        <span class="simple-label">有无突发网络安全事件应急处置预案:</span>
        <span class="simple-value">{{ securityData.emergencyResponsePlan.hasPlan ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.emergencyResponsePlan.remarks || '无' }}</span>
      </div>
      
      <!-- 应急演练 -->
      <div class="simple-info-item">
        <span class="simple-label">应急演练:</span>
        <span class="simple-value">{{ securityData.emergencyDrills.hasDrills ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ securityData.emergencyDrills.remarks || '无' }}</span>
      </div>
    </div>
    
    <!-- 编辑模式 -->
    <div v-else class="edit-form">
      <el-form :model="securityData" label-width="200px">
        <!-- 有无独立刊播机房 -->
        <el-form-item label="有无独立刊播机房:">
          <div class="form-row">
            <el-radio-group v-model="securityData.independentRoom.hasRoom">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.independentRoom.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无机房监控设备 -->
        <el-form-item label="有无机房监控设备:">
          <div class="form-row">
            <el-radio-group v-model="securityData.monitoringEquipment.hasEquipment">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.monitoringEquipment.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无24小时值班值守 -->
        <el-form-item label="有无24小时值班值守:">
          <div class="form-row">
            <el-radio-group v-model="securityData.dutyPersonnel.hasPersonnel">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.dutyPersonnel.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无病毒软件 -->
        <el-form-item label="有无病毒软件:">
          <div class="form-row">
            <el-radio-group v-model="securityData.antivirusSoftware.hasSoftware">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.antivirusSoftware.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无防攻击防篡改措施 -->
        <el-form-item label="有无防攻击防篡改措施:">
          <div class="form-row">
            <el-radio-group v-model="securityData.antiAttackMeasures.hasMeasures">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.antiAttackMeasures.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无安全审计 -->
        <el-form-item label="有无安全审计:">
          <div class="form-row">
            <el-radio-group v-model="securityData.securityAudit.hasAudit">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.securityAudit.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无日志记录 -->
        <el-form-item label="有无日志记录:">
          <div class="form-row">
            <el-radio-group v-model="securityData.logRecords.hasRecords">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.logRecords.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无网络安全等级保护制度 -->
        <el-form-item label="有无网络安全等级保护制度:">
          <div class="form-row">
            <el-radio-group v-model="securityData.securityLevelProtection.hasProtection">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.securityLevelProtection.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无漏洞扫描补丁修复 -->
        <el-form-item label="有无漏洞扫描补丁修复:">
          <div class="form-row">
            <el-radio-group v-model="securityData.vulnerabilityScanning.hasScanning">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.vulnerabilityScanning.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无外界存储介质杀毒 -->
        <el-form-item label="有无外界存储介质杀毒:">
          <div class="form-row">
            <el-radio-group v-model="securityData.storageMediaAntivirus.hasAntivirus">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.storageMediaAntivirus.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 有无突发网络安全事件应急处置预案 -->
        <el-form-item label="有无突发网络安全事件应急处置预案:">
          <div class="form-row">
            <el-radio-group v-model="securityData.emergencyResponsePlan.hasPlan">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.emergencyResponsePlan.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 应急演练 -->
        <el-form-item label="应急演练:">
          <div class="form-row">
            <el-radio-group v-model="securityData.emergencyDrills.hasDrills">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="securityData.emergencyDrills.remarks" 
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
  name: 'SecurityProtection',
  props: {
    securityData: {
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
.security-protection-section {
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
  width: 200px;
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
