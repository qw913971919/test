<template>
  <div class="new-screen-application">
    <!-- 关闭按钮 -->
    <div class="close-button">
      <el-button type="text" @click="handleClose" class="close-btn">
        <i class="el-icon-close"></i>
      </el-button>
    </div>

    <!-- 顶部标题 -->
    <div class="application-header">
      <h2>新建大屏申请单</h2>
    </div>

    <div class="application-content">
      <!-- 左侧步骤导航 -->
      <div class="left-steps">
        <div class="step-group">
          <div 
            class="step-item" 
            :class="{ active: currentStep === 1, completed: currentStep > 1 }"
            @click="handleStepClick(1)"
          >
            <div class="step-icon">
              <i class="el-icon-check" v-if="currentStep > 1"></i>
              <span v-else>1</span>
            </div>
            <span class="step-text">基本信息</span>
          </div>
          <div 
            class="step-item" 
            :class="{ active: currentStep === 2, completed: currentStep > 2 }"
            @click="handleStepClick(2)"
          >
            <div class="step-icon">
              <i class="el-icon-check" v-if="currentStep > 2"></i>
              <span v-else>2</span>
            </div>
            <span class="step-text">内部管理信息</span>
          </div>
          <div 
            class="step-item" 
            :class="{ active: currentStep === 3, completed: currentStep > 3 }"
            @click="handleStepClick(3)"
          >
            <div class="step-icon">
              <i class="el-icon-check" v-if="currentStep > 3"></i>
              <span v-else>3</span>
            </div>
            <span class="step-text">内容审核、发布</span>
          </div>
          <div 
            class="step-item" 
            :class="{ active: currentStep === 4, completed: currentStep > 4 }"
            @click="handleStepClick(4)"
          >
            <div class="step-icon">
              <i class="el-icon-check" v-if="currentStep > 4"></i>
              <span v-else>4</span>
            </div>
            <span class="step-text">安全防护</span>
          </div>
          <div 
            class="step-item" 
            :class="{ active: currentStep === 5, completed: currentStep > 5 }"
            @click="handleStepClick(5)"
          >
            <div class="step-icon">
              <i class="el-icon-check" v-if="currentStep > 5"></i>
              <span v-else>5</span>
            </div>
            <span class="step-text">设备物理安全资料</span>
          </div>
          <div 
            class="step-item" 
            :class="{ active: currentStep === 6 }"
            @click="handleStepClick(6)"
          >
            <div class="step-icon">
              <span>6</span>
            </div>
            <span class="step-text">申请详情</span>
          </div>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="right-form">
        <!-- 步骤1: 基本信息 -->
        <div v-if="currentStep === 1" class="step-content">
          <BasicInfo
            :basic-data="basicData"
            :is-editing="true"
            :hide-actions="true"
          />
        </div>

        <!-- 步骤2: 内部管理信息 -->
        <div v-if="currentStep === 2" class="step-content">
          <InternalManagement
            :management-data="internalManagementData"
            :is-editing="true"
            :hide-actions="true"
          />
        </div>

        <!-- 步骤3: 内容审核、发布 -->
        <div v-if="currentStep === 3" class="step-content">
          <ContentReview
            :content-data="contentReviewData"
            :is-editing="true"
            :hide-actions="true"
          />
        </div>

        <!-- 步骤4: 安全防护 -->
        <div v-if="currentStep === 4" class="step-content">
          <SecurityProtection
            :security-data="securityData"
            :is-editing="true"
            :hide-actions="true"
          />
        </div>

        <!-- 步骤5: 设备物理安全资料 -->
        <div v-if="currentStep === 5" class="step-content">
          <EquipmentSecurity
            :equipment-data="equipmentData"
            :is-editing="true"
            :hide-actions="true"
          />
        </div>

        <!-- 步骤6: 申请详情 -->
        <div v-if="currentStep === 6" class="step-content">
          <h3>申请详情</h3>
          <el-form :model="applicationDetail" label-width="100px" class="detail-form">
            <el-form-item label="申请标题:" required>
              <el-input v-model="applicationDetail.title" placeholder="请输入申请标题" />
            </el-form-item>
            
            <el-form-item label="描述:">
              <el-input
                v-model="applicationDetail.description"
                type="textarea"
                :rows="4"
                placeholder="请输入描述"
              />
            </el-form-item>
            
            <el-form-item label="上传附件:">
              <div class="upload-section">
                <div class="file-info" v-if="applicationDetail.attachment.fileName">
                  <span class="file-name">{{ applicationDetail.attachment.fileName }}</span>
                  <span class="file-size">{{ applicationDetail.attachment.fileSize }}</span>
                </div>
                <div class="file-actions" v-if="applicationDetail.attachment.fileName">
                  <el-button type="text" class="action-link">查看</el-button>
                  <el-button type="text" class="action-link">下载</el-button>
                </div>
                <el-button type="primary" class="upload-btn">
                  <i class="el-icon-upload"></i>
                  上传文件
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <!-- 底部操作按钮 -->
        <div class="step-actions">
          <div class="left-buttons">
            <el-button v-if="currentStep > 1" @click="handlePrevStep" class="action-btn">上一步</el-button>
            <el-button v-if="currentStep < 6" type="primary" @click="handleNextStep" class="action-btn">下一步</el-button>
            <el-button v-if="currentStep === 6" type="primary" @click="handleSubmit" class="action-btn">提交申请</el-button>
          </div>
          <div class="right-buttons">
            <el-button type="primary" @click="handleSave" class="action-btn">保存</el-button>
            <el-button @click="handleCancel" class="action-btn">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInfo from './BasicInfo.vue'
import InternalManagement from './InternalManagement.vue'
import ContentReview from './ContentReview.vue'
import SecurityProtection from './SecurityProtection.vue'
import EquipmentSecurity from './EquipmentSecurity.vue'

export default {
  name: 'NewScreenApplication',
  components: {
    BasicInfo,
    InternalManagement,
    ContentReview,
    SecurityProtection,
    EquipmentSecurity
  },
  props: {
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentStep: 1,
      applicationDetail: {
        title: '',
        description: '',
        attachment: {
          fileName: '',
          fileSize: '',
          fileUrl: ''
        }
      },
      basicData: {
        name: '',
        managementUnit: '',
        location: '',
        screenTime: '',
        city: '',
        district: '',
        street: '',
        community: '',
        venueOwner: '',
        venueContact: '',
        venuePhone: '',
        screenOwner: '',
        screenOwnerContact: '',
        screenOwnerPhone: '',
        screenOperator: '',
        screenOperatorContact: '',
        screenOperatorPhone: '',
        remarks: ''
      },
      internalManagementData: {
        managementSystem: {
          hasSystem: true,
          remarks: ''
        },
        dedicatedPersonnel: {
          contact: '',
          phone: ''
        },
        monitoringPersonnel1: {
          contact: '',
          phone: ''
        },
        monitoringPersonnel2: {
          contact: '',
          phone: ''
        },
        monitoringPersonnel3: {
          contact: '',
          phone: ''
        },
        standaloneManagement: {
          isStandalone: true,
          remarks: ''
        },
        internetConnection: {
          hasInternet: true,
          remarks: ''
        },
        dedicatedLine: {
          hasDedicatedLine: true,
          remarks: ''
        },
        dedicatedMachine: {
          hasDedicatedMachine: true,
          remarks: ''
        },
        usernameSystem: {
          hasUsername: true,
          remarks: ''
        },
        passwordManagement: {
          hasPassword: true,
          remarks: ''
        },
        technicalProtection: {
          hasProtection: true,
          remarks: ''
        }
      },
      contentReviewData: {
        reviewSystem: {
          hasSystem: true,
          remarks: ''
        },
        publishSystem: {
          hasSystem: true,
          remarks: ''
        },
        reviewPersonnel: {
          contact: '',
          phone: ''
        },
        publishPersonnel: {
          contact: '',
          phone: ''
        },
        reviewProcess: {
          hasProcess: true,
          remarks: ''
        },
        publishProcess: {
          hasProcess: true,
          remarks: ''
        },
        reviewStandard: {
          hasStandard: true,
          remarks: ''
        },
        publishStandard: {
          hasStandard: true,
          remarks: ''
        },
        reviewRecord: {
          hasRecord: true,
          remarks: ''
        },
        publishRecord: {
          hasRecord: true,
          remarks: ''
        },
        reviewCycle: {
          hasCycle: true,
          remarks: ''
        },
        publishCycle: {
          hasCycle: true,
          remarks: ''
        }
      },
      securityData: {
        independentRoom: {
          hasRoom: true,
          remarks: ''
        },
        monitoringEquipment: {
          hasEquipment: true,
          remarks: ''
        },
        dutyPersonnel: {
          hasPersonnel: true,
          remarks: ''
        },
        antivirusSoftware: {
          hasSoftware: true,
          remarks: ''
        },
        antiAttackMeasures: {
          hasMeasures: true,
          remarks: ''
        },
        securityAudit: {
          hasAudit: true,
          remarks: ''
        },
        logRecords: {
          hasRecords: true,
          remarks: ''
        },
        securityLevelProtection: {
          hasProtection: true,
          remarks: ''
        },
        vulnerabilityScanning: {
          hasScanning: true,
          remarks: ''
        },
        storageMediaAntivirus: {
          hasAntivirus: true,
          remarks: ''
        },
        emergencyResponsePlan: {
          hasPlan: true,
          remarks: ''
        },
        emergencyDrills: {
          hasDrills: true,
          remarks: ''
        }
      },
      equipmentData: {
        businessLicense: {
          fileName: '',
          fileSize: '',
          fileUrl: ''
        },
        advertisingLicense: {
          fileName: '',
          fileSize: '',
          fileUrl: ''
        },
        buildingPermit: {
          fileName: '',
          fileSize: '',
          fileUrl: ''
        },
        safetyTestReport: {
          fileName: '',
          fileSize: '',
          fileUrl: ''
        },
        annualInspectionReport: {
          fileName: '',
          fileSize: '',
          fileUrl: ''
        },
        lastInspectionDate: '',
        inspectionExpiryDate: ''
      }
    }
  },
  watch: {
    initialData: {
      immediate: true,
      handler(newVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          // 填充基本信息
          if (newVal.basic) {
            this.basicData = { ...this.basicData, ...newVal.basic }
          }
          // 填充内部管理信息
          if (newVal.internalManagement) {
            this.internalManagementData = { ...this.internalManagementData, ...newVal.internalManagement }
          }
          // 填充内容审核发布
          if (newVal.contentReview) {
            this.contentReviewData = { ...this.contentReviewData, ...newVal.contentReview }
          }
          // 填充安全防护
          if (newVal.security) {
            this.securityData = { ...this.securityData, ...newVal.security }
          }
          // 填充设备资料
          if (newVal.equipment) {
            this.equipmentData = { ...this.equipmentData, ...newVal.equipment }
          }
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    
    handleStepClick(step) {
      // 允许在所有步骤之间自由切换
      this.currentStep = step
    },
    
    handlePrevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    
    handleNextStep() {
      if (this.currentStep < 6) {
        this.currentStep++
      }
    },
    
    handleSave() {
      // 保存当前进度
      this.$message.success('保存成功')
      console.log('保存申请进度:', {
        currentStep: this.currentStep,
        applicationDetail: this.applicationDetail,
        basicData: this.basicData,
        internalManagementData: this.internalManagementData,
        contentReviewData: this.contentReviewData,
        securityData: this.securityData,
        equipmentData: this.equipmentData
      })
    },
    
    handleCancel() {
      this.$confirm('确定要取消申请吗？未保存的数据将丢失。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('close')
      }).catch(() => {})
    },
    
    handleSubmit() {
      // 验证所有必填字段
      if (!this.applicationDetail.title) {
        this.$message.error('请填写申请标题')
        this.currentStep = 6
        return
      }
      
      const applicationData = {
        ...this.applicationDetail,
        basic: this.basicData,
        internalManagement: this.internalManagementData,
        contentReview: this.contentReviewData,
        security: this.securityData,
        equipment: this.equipmentData
      }
      
      console.log('提交新建申请:', applicationData)
      
      this.$message.success('申请提交成功')
      this.$emit('submit', applicationData)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.new-screen-application {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: relative;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
  
  .close-btn {
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    color: #666;
    font-size: 16px;
    
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}

.application-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e8e8e8;
  
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
}

.application-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.left-steps {
  width: 200px;
  background: #fafafa;
  border-right: 1px solid #e8e8e8;
  padding: 24px 0;
  overflow-y: auto;
  flex-shrink: 0;
  
  .step-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 16px;
  }
  
  .step-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    color: #666;
    
    .step-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #e8e8e8;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s;
      flex-shrink: 0;
    }
    
    .step-text {
      font-size: 14px;
      font-weight: 400;
    }
    
    &:hover {
      background: #f0f0f0;
    }
    
    &.active {
      background: #e6f7ff;
      color: #1890ff;
      
      .step-icon {
        background: #1890ff;
        color: #fff;
      }
      
      .step-text {
        font-weight: 500;
      }
    }
    
    &.completed {
      .step-icon {
        background: #52c41a;
        color: #fff;
      }
    }
  }
}

.right-form {
  flex: 1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.step-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 250px);
  
  h3 {
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  
  .detail-form {
    max-width: 800px;
    
    ::v-deep .el-form-item {
      margin-bottom: 20px;
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
  
  .upload-section {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    
    .file-info {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .file-name {
        color: #333;
        font-weight: 500;
      }
      
      .file-size {
        color: #999;
        font-size: 12px;
      }
    }
    
    .file-actions {
      display: flex;
      gap: 8px;
      
      .action-link {
        color: #409eff;
        padding: 0;
        font-size: 14px;
        
        &:hover {
          color: #66b1ff;
        }
      }
    }
    
    .upload-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      
      i {
        font-size: 14px;
      }
    }
  }
}

.step-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-top: 1px solid #e8e8e8;
  background: #fafafa;
  flex-shrink: 0;
  
  .left-buttons {
    display: flex;
    gap: 12px;
    
    &:empty {
      min-width: 0;
    }
  }
  
  .right-buttons {
    display: flex;
    gap: 12px;
  }
  
  .action-btn {
    min-width: 100px;
    height: 36px;
    border-radius: 4px;
    font-size: 14px;
  }
}
</style>
