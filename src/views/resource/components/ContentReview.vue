<template>
  <div class="content-review-section">
    <h3>内容审核、发布</h3>
    
    <!-- 查看模式 -->
    <div v-if="!isEditing" class="simple-info-list">
      <!-- 内容审核制度 -->
      <div class="simple-info-item">
        <span class="simple-label">内容审核制度:</span>
        <span class="simple-value">{{ contentData.reviewSystem.hasSystem ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.reviewSystem.remarks || '无' }}</span>
      </div>
      
      <!-- 内容发布制度 -->
      <div class="simple-info-item">
        <span class="simple-label">内容发布制度:</span>
        <span class="simple-value">{{ contentData.publishSystem.hasSystem ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.publishSystem.remarks || '无' }}</span>
      </div>
      
      <!-- 内容审核人员 -->
      <div class="simple-info-item">
        <span class="simple-label">内容审核人员:</span>
        <span class="simple-value">{{ contentData.reviewPersonnel.contact || '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">联系电话:</span>
        <span class="simple-value">{{ contentData.reviewPersonnel.phone || '无' }}</span>
      </div>
      
      <!-- 内容发布人员 -->
      <div class="simple-info-item">
        <span class="simple-label">内容发布人员:</span>
        <span class="simple-value">{{ contentData.publishPersonnel.contact || '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">联系电话:</span>
        <span class="simple-value">{{ contentData.publishPersonnel.phone || '无' }}</span>
      </div>
      
      <!-- 内容审核流程 -->
      <div class="simple-info-item">
        <span class="simple-label">内容审核流程:</span>
        <span class="simple-value">{{ contentData.reviewProcess.hasProcess ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.reviewProcess.remarks || '无' }}</span>
      </div>
      
      <!-- 内容发布流程 -->
      <div class="simple-info-item">
        <span class="simple-label">内容发布流程:</span>
        <span class="simple-value">{{ contentData.publishProcess.hasProcess ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.publishProcess.remarks || '无' }}</span>
      </div>
      
      <!-- 内容审核标准 -->
      <div class="simple-info-item">
        <span class="simple-label">内容审核标准:</span>
        <span class="simple-value">{{ contentData.reviewStandard.hasStandard ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.reviewStandard.remarks || '无' }}</span>
      </div>
      
      <!-- 内容发布标准 -->
      <div class="simple-info-item">
        <span class="simple-label">内容发布标准:</span>
        <span class="simple-value">{{ contentData.publishStandard.hasStandard ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.publishStandard.remarks || '无' }}</span>
      </div>
      
      <!-- 内容审核记录 -->
      <div class="simple-info-item">
        <span class="simple-label">内容审核记录:</span>
        <span class="simple-value">{{ contentData.reviewRecord.hasRecord ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.reviewRecord.remarks || '无' }}</span>
      </div>
      
      <!-- 内容发布记录 -->
      <div class="simple-info-item">
        <span class="simple-label">内容发布记录:</span>
        <span class="simple-value">{{ contentData.publishRecord.hasRecord ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.publishRecord.remarks || '无' }}</span>
      </div>
      
      <!-- 内容审核周期 -->
      <div class="simple-info-item">
        <span class="simple-label">内容审核周期:</span>
        <span class="simple-value">{{ contentData.reviewCycle.hasCycle ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.reviewCycle.remarks || '无' }}</span>
      </div>
      
      <!-- 内容发布周期 -->
      <div class="simple-info-item">
        <span class="simple-label">内容发布周期:</span>
        <span class="simple-value">{{ contentData.publishCycle.hasCycle ? '有' : '无' }}</span>
      </div>
      <div class="simple-info-item">
        <span class="simple-label">备注:</span>
        <span class="simple-value">{{ contentData.publishCycle.remarks || '无' }}</span>
      </div>
    </div>
    
    <!-- 编辑模式 -->
    <div v-else class="edit-form">
      <el-form :model="contentData" label-width="140px">
        <!-- 内容审核制度 -->
        <el-form-item label="内容审核制度:">
          <div class="form-row">
            <el-radio-group v-model="contentData.reviewSystem.hasSystem">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.reviewSystem.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 内容发布制度 -->
        <el-form-item label="内容发布制度:">
          <div class="form-row">
            <el-radio-group v-model="contentData.publishSystem.hasSystem">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.publishSystem.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 内容审核人员 -->
        <el-form-item label="内容审核人员:">
          <div class="personnel-section">
            <div class="contact-row">
              <span class="contact-label">联系人:</span>
              <el-input 
                v-model="contentData.reviewPersonnel.contact" 
                placeholder="请输入联系人" 
                class="contact-input"
              />
            </div>
            <div class="contact-row">
              <span class="contact-label">联系电话:</span>
              <el-input 
                v-model="contentData.reviewPersonnel.phone" 
                placeholder="请输入联系电话" 
                class="contact-input"
              />
            </div>
          </div>
        </el-form-item>
        
        <!-- 内容发布人员 -->
        <el-form-item label="内容发布人员:">
          <div class="personnel-section">
            <div class="contact-row">
              <span class="contact-label">联系人:</span>
              <el-input 
                v-model="contentData.publishPersonnel.contact" 
                placeholder="请输入联系人" 
                class="contact-input"
              />
            </div>
            <div class="contact-row">
              <span class="contact-label">联系电话:</span>
              <el-input 
                v-model="contentData.publishPersonnel.phone" 
                placeholder="请输入联系电话" 
                class="contact-input"
              />
            </div>
          </div>
        </el-form-item>
        
        <!-- 内容审核流程 -->
        <el-form-item label="内容审核流程:">
          <div class="form-row">
            <el-radio-group v-model="contentData.reviewProcess.hasProcess">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.reviewProcess.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 内容发布流程 -->
        <el-form-item label="内容发布流程:">
          <div class="form-row">
            <el-radio-group v-model="contentData.publishProcess.hasProcess">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.publishProcess.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 内容审核标准 -->
        <el-form-item label="内容审核标准:">
          <div class="form-row">
            <el-radio-group v-model="contentData.reviewStandard.hasStandard">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.reviewStandard.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 内容发布标准 -->
        <el-form-item label="内容发布标准:">
          <div class="form-row">
            <el-radio-group v-model="contentData.publishStandard.hasStandard">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.publishStandard.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 内容审核记录 -->
        <el-form-item label="内容审核记录:">
          <div class="form-row">
            <el-radio-group v-model="contentData.reviewRecord.hasRecord">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.reviewRecord.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 内容发布记录 -->
        <el-form-item label="内容发布记录:">
          <div class="form-row">
            <el-radio-group v-model="contentData.publishRecord.hasRecord">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.publishRecord.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 内容审核周期 -->
        <el-form-item label="内容审核周期:">
          <div class="form-row">
            <el-radio-group v-model="contentData.reviewCycle.hasCycle">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.reviewCycle.remarks" 
              placeholder="请输入备注" 
              class="remark-input"
            />
          </div>
        </el-form-item>
        
        <!-- 内容发布周期 -->
        <el-form-item label="内容发布周期:">
          <div class="form-row">
            <el-radio-group v-model="contentData.publishCycle.hasCycle">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
            <span class="remark-label">备注:</span>
            <el-input 
              v-model="contentData.publishCycle.remarks" 
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
  name: 'ContentReview',
  props: {
    contentData: {
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
.content-review-section {
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
  width: 140px;
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
