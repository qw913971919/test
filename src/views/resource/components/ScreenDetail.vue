<template>
  <div class="screen-detail">
    <!-- 关闭按钮 -->
    <div class="close-button">
      <el-button type="text" @click="handleClose" class="close-btn">
        <i class="el-icon-close"></i>
      </el-button>
    </div>

    <!-- 顶部标签页 -->
    <div class="top-tabs">
      <div class="tab-item active">
        <span>电子屏信息</span>
      </div>
      <div class="tab-item">
        <span>新建大屏审批记录</span>
      </div>
      <div class="tab-item">
        <span>上下线审批记录</span>
      </div>
    </div>

    <div class="detail-content">
      <!-- 左侧导航 -->
      <div class="left-sidebar">
        <div class="nav-group">
          <div 
            class="nav-item" 
            :class="{ active: activeMenu === 'basic' }"
            @click="handleMenuSelect('basic')"
          >
            <i class="el-icon-info"></i>
            <span>基本信息</span>
          </div>
          <div 
            class="nav-item"
            :class="{ active: activeMenu === 'internal' }"
            @click="handleMenuSelect('internal')"
          >
            <i class="el-icon-s-tools"></i>
            <span>内部管理信息</span>
          </div>
          <div 
            class="nav-item"
            :class="{ active: activeMenu === 'content' }"
            @click="handleMenuSelect('content')"
          >
            <i class="el-icon-picture"></i>
            <span>内容审核、发布</span>
          </div>
          <div 
            class="nav-item"
            :class="{ active: activeMenu === 'security' }"
            @click="handleMenuSelect('security')"
          >
            <i class="el-icon-lock"></i>
            <span>安全防护</span>
          </div>
          <div 
            class="nav-item"
            :class="{ active: activeMenu === 'equipment' }"
            @click="handleMenuSelect('equipment')"
          >
            <i class="el-icon-cpu"></i>
            <span>设备物理安全资料</span>
          </div>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="right-content">
        <!-- 基本信息 -->
        <BasicInfo
          v-if="activeMenu === 'basic'"
          :basic-data="isEditing ? editForm : screenData"
          :is-editing="isEditing"
          @edit="handleEdit"
          @save="handleSave"
          @cancel="handleCancel"
          @initiate-application="handleInitiateApplication"
        />

        <!-- 内部管理信息 -->
        <InternalManagement
          v-else-if="activeMenu === 'internal'"
          :management-data="internalManagementData"
          :is-editing="isEditing"
          :online-status="screenData.onlineStatus"
          @edit="handleEdit"
          @save="handleSave"
          @cancel="handleCancel"
          @initiate-application="handleInitiateApplication"
        />

        <!-- 内容审核、发布 -->
        <ContentReview
          v-else-if="activeMenu === 'content'"
          :content-data="contentReviewData"
          :is-editing="isEditing"
          :online-status="screenData.onlineStatus"
          @edit="handleEdit"
          @save="handleSave"
          @cancel="handleCancel"
          @initiate-application="handleInitiateApplication"
        />

        <!-- 安全防护 -->
        <SecurityProtection
          v-else-if="activeMenu === 'security'"
          :security-data="securityData"
          :is-editing="isEditing"
          :online-status="screenData.onlineStatus"
          @edit="handleEdit"
          @save="handleSave"
          @cancel="handleCancel"
          @initiate-application="handleInitiateApplication"
        />

        <!-- 设备物理安全资料 -->
        <EquipmentSecurity
          v-else-if="activeMenu === 'equipment'"
          :equipment-data="equipmentData"
          :is-editing="isEditing"
          :online-status="screenData.onlineStatus"
          @edit="handleEdit"
          @save="handleSave"
          @cancel="handleCancel"
          @initiate-application="handleInitiateApplication"
        />
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
  name: 'ScreenDetail',
  components: {
    BasicInfo,
    InternalManagement,
    ContentReview,
    SecurityProtection,
    EquipmentSecurity
  },
  props: {
    screenData: {
      type: Object,
      required: true
    },
    defaultEditMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeMenu: 'basic',
      isEditing: false,
      editForm: {},
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
          fileName: '文件名.txt',
          fileSize: '40K',
          fileUrl: ''
        },
        advertisingLicense: {
          fileName: '文件名.txt',
          fileSize: '40K',
          fileUrl: ''
        },
        buildingPermit: {
          fileName: '文件名.txt',
          fileSize: '40K',
          fileUrl: ''
        },
        safetyTestReport: {
          fileName: '文件名.txt',
          fileSize: '40K',
          fileUrl: ''
        },
        annualInspectionReport: {
          fileName: '文件名.txt',
          fileSize: '40K',
          fileUrl: ''
        },
        lastInspectionDate: '',
        inspectionExpiryDate: ''
      }
    }
  },
  watch: {
    defaultEditMode: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.isEditing = true
          this.editForm = { ...this.screenData }
        } else {
          this.isEditing = false
          this.editForm = {}
        }
      }
    },
    screenData: {
      immediate: true,
      handler(newVal) {
        // 当screenData改变时，如果不是编辑模式，重置状态
        if (!this.defaultEditMode) {
          this.isEditing = false
          this.editForm = {}
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    
    handleMenuSelect(menu) {
      this.activeMenu = menu
    },
    
    handleEdit() {
      this.isEditing = true
      this.editForm = { ...this.screenData }
    },
    
    handleSave() {
      console.log('保存基本信息:', this.editForm)
      console.log('保存内部管理信息:', this.internalManagementData)
      console.log('保存内容审核发布:', this.contentReviewData)
      console.log('保存安全防护:', this.securityData)
      console.log('保存设备资料:', this.equipmentData)
      
      const updatedData = {
        ...this.editForm,
        internalManagement: this.internalManagementData,
        contentReview: this.contentReviewData,
        security: this.securityData,
        equipment: this.equipmentData
      }
      
      this.$emit('update', updatedData)
      this.isEditing = false
      
      this.$message.success('保存成功')
    },
    
    handleCancel() {
      this.isEditing = false
      this.editForm = {}
      
      // 重置所有数据到初始状态
      this.internalManagementData = {
        managementSystem: { hasSystem: true, remarks: '' },
        dedicatedPersonnel: { contact: '', phone: '' },
        monitoringPersonnel1: { contact: '', phone: '' },
        monitoringPersonnel2: { contact: '', phone: '' },
        monitoringPersonnel3: { contact: '', phone: '' },
        standaloneManagement: { isStandalone: true, remarks: '' },
        internetConnection: { hasInternet: true, remarks: '' },
        dedicatedLine: { hasDedicatedLine: true, remarks: '' },
        dedicatedMachine: { hasDedicatedMachine: true, remarks: '' },
        usernameSystem: { hasUsername: true, remarks: '' },
        passwordManagement: { hasPassword: true, remarks: '' },
        technicalProtection: { hasProtection: true, remarks: '' }
      }
    },
    
    handleInitiateApplication() {
      // 传递当前所有数据
      const applicationData = {
        basic: this.isEditing ? this.editForm : this.screenData,
        internalManagement: this.internalManagementData,
        contentReview: this.contentReviewData,
        security: this.securityData,
        equipment: this.equipmentData
      }
      this.$emit('initiate-application', applicationData)
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-detail {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

.top-tabs {
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  
  .tab-item {
    padding: 10px 20px;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    transition: all 0.3s;
    border: 1px solid #e8e8e8;
    
    &.active {
      background: #1890ff;
      color: #fff;
      border-color: #1890ff;
      box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
    }
    
    &:hover:not(.active) {
      background: #fafafa;
      color: #1890ff;
      border-color: #1890ff;
    }
  }
}

.detail-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.left-sidebar {
  width: 200px;
  background: #fafafa;
  border-right: 1px solid #e8e8e8;
  padding: 16px 0;
  overflow-y: auto;
  flex-shrink: 0;
  
  .nav-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 12px;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    color: #666;
    font-size: 14px;
    
    i {
      font-size: 16px;
    }
    
    &:hover {
      background: #e6f7ff;
      color: #1890ff;
    }
    
    &.active {
      background: #e6f7ff;
      color: #1890ff;
      font-weight: 500;
    }
  }
}

.right-content {
  flex: 1;
  overflow-y: auto;
  background: #ffffff;
  max-height: calc(100vh - 140px);
  
  ::v-deep .basic-info-section,
  ::v-deep .internal-management-section,
  ::v-deep .content-review-section,
  ::v-deep .security-protection-section,
  ::v-deep .equipment-security-section {
    padding-bottom: 80px;
  }
}
</style>