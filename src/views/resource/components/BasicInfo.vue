<template>
  <div class="basic-info-section">
    <h3>基本信息</h3>
    
    <!-- 查看模式 -->
    <div v-if="!isEditing" class="info-list">
      <div class="info-item">
        <label>LED屏名称:</label>
        <span>{{ basicData.name }}</span>
      </div>
      <div class="info-item">
        <label>属地管理单位:</label>
        <span>{{ basicData.managementUnit }}</span>
      </div>
      <div class="info-item">
        <label>大屏位置:</label>
        <span>{{ basicData.location }}</span>
      </div>
      <div class="info-item">
        <label>开关屏时间:</label>
        <span>{{ basicData.screenTime }}</span>
      </div>
      <div class="info-item">
        <label>所属城市:</label>
        <span>{{ basicData.city }}</span>
      </div>
      <div class="info-item">
        <label>所属区县:</label>
        <span>{{ basicData.district }}</span>
      </div>
      <div class="info-item">
        <label>所属街镇:</label>
        <span>{{ basicData.street }}</span>
      </div>
      <div class="info-item">
        <label>所属社区:</label>
        <span>{{ basicData.community }}</span>
      </div>
      
      <!-- 场地所有单位 -->
      <div class="info-group">
        <label>场地所有单位:</label>
        <div class="group-content">
          <div class="unit-name">{{ basicData.venueOwner }}</div>
          <div class="contact-info">
            <span class="contact-label">联系人:</span>
            <span class="contact-value">{{ basicData.venueContact }}</span>
          </div>
          <div class="contact-info">
            <span class="contact-label">联系电话:</span>
            <span class="contact-value">{{ basicData.venuePhone }}</span>
          </div>
        </div>
      </div>
      
      <!-- 大屏所属单位 -->
      <div class="info-group">
        <label>大屏所属单位:</label>
        <div class="group-content">
          <div class="unit-name">{{ basicData.screenOwner }}</div>
          <div class="contact-info">
            <span class="contact-label">联系人:</span>
            <span class="contact-value">{{ basicData.screenOwnerContact }}</span>
          </div>
          <div class="contact-info">
            <span class="contact-label">联系电话:</span>
            <span class="contact-value">{{ basicData.screenOwnerPhone }}</span>
          </div>
        </div>
      </div>
      
      <!-- 大屏运营单位 -->
      <div class="info-group">
        <label>大屏运营单位:</label>
        <div class="group-content">
          <div class="unit-name">{{ basicData.screenOperator }}</div>
          <div class="contact-info">
            <span class="contact-label">联系人:</span>
            <span class="contact-value">{{ basicData.screenOperatorContact }}</span>
          </div>
          <div class="contact-info">
            <span class="contact-label">联系电话:</span>
            <span class="contact-value">{{ basicData.screenOperatorPhone }}</span>
          </div>
        </div>
      </div>
      
      <div class="info-item">
        <label>备注:</label>
        <span>{{ basicData.remarks }}</span>
      </div>
    </div>
    
    <!-- 编辑模式 -->
    <div v-else class="edit-form">
      <el-form :model="basicData" label-width="140px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="LED屏名称:">
              <el-input v-model="basicData.name" placeholder="请输入LED屏名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属地管理单位:">
              <el-input v-model="basicData.managementUnit" placeholder="请输入属地管理单位" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="大屏位置:">
              <el-input v-model="basicData.location" placeholder="请输入大屏位置" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开关屏时间:">
              <el-input v-model="basicData.screenTime" placeholder="请输入开关屏时间" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属城市:">
              <el-input v-model="basicData.city" placeholder="请输入所属城市" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属区县:">
              <el-input v-model="basicData.district" placeholder="请输入所属区县" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属街镇:">
              <el-input v-model="basicData.street" placeholder="请输入所属街镇" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属社区:">
              <el-input v-model="basicData.community" placeholder="请输入所属社区" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 场地所有单位 -->
        <el-form-item label="场地所有单位:">
          <el-input v-model="basicData.venueOwner" placeholder="请输入场地所有单位" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人:">
              <el-input v-model="basicData.venueContact" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:">
              <el-input v-model="basicData.venuePhone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 大屏所属单位 -->
        <el-form-item label="大屏所属单位:">
          <el-input v-model="basicData.screenOwner" placeholder="请输入大屏所属单位" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人:">
              <el-input v-model="basicData.screenOwnerContact" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:">
              <el-input v-model="basicData.screenOwnerPhone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 大屏运营单位 -->
        <el-form-item label="大屏运营单位:">
          <el-input v-model="basicData.screenOperator" placeholder="请输入大屏运营单位" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人:">
              <el-input v-model="basicData.screenOperatorContact" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:">
              <el-input v-model="basicData.screenOperatorPhone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="备注:">
          <el-input 
            v-model="basicData.remarks" 
            type="textarea" 
            :rows="3"
            placeholder="请输入备注信息" 
          />
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 操作按钮 -->
    <div class="action-buttons" v-if="!hideActions">
      <template v-if="!isEditing">
        <el-button type="primary" class="action-btn primary" @click="handleEdit">编辑</el-button>
        <el-button v-if="basicData.onlineStatus === 'online'" class="action-btn secondary">申请下线</el-button>
        <el-button v-else-if="basicData.onlineStatus === 'offline'" class="action-btn secondary">申请上线</el-button>
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
  name: 'BasicInfo',
  props: {
    basicData: {
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
    },
    
    getOnlineStatusText(status) {
      const textMap = {
        online: '上线',
        offline: '下线'
      }
      return textMap[status] || ''
    },
    
    getOperationStatusText(status) {
      const textMap = {
        normal: '正常运行',
        suspended: '暂停使用',
        fault: '故障维修',
        scrapped: '报废停用'
      }
      return textMap[status] || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-info-section {
  padding: 20px;
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.info-list {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  label {
    width: 140px;
    font-weight: 500;
    color: #666;
    flex-shrink: 0;
  }
  
  span {
    flex: 1;
    color: #333;
  }
}

.info-item:last-child {
  border-bottom: none;
}

.info-group {
  margin-bottom: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  
  > label {
    display: block;
    font-weight: 500;
    color: #666;
    margin-bottom: 12px;
  }
  
  .group-content {
    padding-left: 20px;
    
    .unit-name {
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
    }
    
    .contact-info {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      
      .contact-label {
        width: 80px;
        color: #999;
        font-size: 14px;
      }
      
      .contact-value {
        color: #333;
      }
    }
  }
}

.edit-form {
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
  
  ::v-deep .el-select {
    width: 100%;
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
