<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    width="80%"
    :before-close="handleClose"
    class="approval-dialog"
  >
    <div class="approval-content">
      <!-- 左侧导航 -->
      <div class="left-nav">
        <div
          v-for="(item, index) in navItems"
          :key="index"
          :class="['nav-item', { active: activeNav === item.key }]"
          @click="activeNav = item.key"
        >
          {{ item.label }}
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="right-content">
        <el-scrollbar style="height: 100%">
          <!-- 基本信息 -->
          <div v-show="activeNav === 'basic'" class="content-section">
            <h3>申请</h3>
            <el-form label-width="100px" class="detail-form">
              <el-form-item label="申请编号:">
                <span>{{ approvalData.id }}</span>
              </el-form-item>
              <el-form-item label="相关附件:">
                <div class="attachment-preview">
                  <div v-if="approvalData.attachment && approvalData.attachment.length > 0" class="attachment-list">
                    <!-- 图片直接展示 -->
                    <div v-for="(file, index) in approvalData.attachment" :key="index" v-if="isImage(file)" class="image-preview">
                      <img :src="file.url" :alt="file.name" @click="previewImage(file)" />
                      <div class="image-info">
                        <span>{{ file.name }}</span>
                        <span>{{ file.size }}</span>
                      </div>
                    </div>
                    <!-- 非图片文件显示下载 -->
                    <div v-for="(file, index) in approvalData.attachment" :key="index" v-if="!isImage(file)" class="file-item">
                      <span>{{ file.name }}</span>
                      <span>{{ file.size }}</span>
                      <el-button type="text" @click="handleDownload(file)" :loading="downloadingFiles.includes(file.name)">
                        <i v-if="!downloadingFiles.includes(file.name)" class="el-icon-download"></i>
                        {{ downloadingFiles.includes(file.name) ? '下载中...' : '下载' }}
                      </el-button>
                    </div>
                  </div>
                  <div v-else class="no-attachment">
                    <span>暂无附件</span>
                  </div>
                </div>
              </el-form-item>
            </el-form>

            <h3>初审</h3>
            <el-form label-width="100px" class="detail-form">
              <el-form-item label="审批时间:">
                <span>{{ approvalData.firstReviewTime }}</span>
              </el-form-item>
              <el-form-item label="审批人:">
                <span>{{ approvalData.firstReviewer }}</span>
              </el-form-item>
              <el-form-item label="审批结果:">
                <span>{{ approvalData.firstResult }}</span>
              </el-form-item>
              <el-form-item label="审批意见:">
                <span>{{ approvalData.firstOpinion }}</span>
              </el-form-item>
              <el-form-item label="相关附件:">
                <div class="attachment-preview">
                  <div v-if="approvalData.firstAttachment && approvalData.firstAttachment.length > 0" class="attachment-list">
                    <!-- 图片直接展示 -->
                    <div v-for="(file, index) in approvalData.firstAttachment" :key="index" v-if="isImage(file)" class="image-preview">
                     
                      <img :src="file.url" :alt="file.name" @click="previewImage(file)" />
                      <div class="image-info">
                        <span>{{ file.name }}</span>
                        <span>{{ file.size }}</span>
                      </div>
                    </div>
                    <!-- 非图片文件显示下载 -->
                    <div v-for="(file, index) in approvalData.firstAttachment" :key="index" v-if="!isImage(file)" class="file-item">
                      <span>{{ file.name }}</span>
                      <span>{{ file.size }}</span>
                      <el-button type="text" @click="handleDownload(file)" :loading="downloadingFiles.includes(file.name)">
                        <i v-if="!downloadingFiles.includes(file.name)" class="el-icon-download"></i>
                        {{ downloadingFiles.includes(file.name) ? '下载中...' : '下载' }}
                      </el-button>
                    </div>
                  </div>
                  <div v-else class="no-attachment">
                    <span>暂无附件</span>
                  </div>
                </div>
              </el-form-item>
            </el-form>

            <h3>终审</h3>
            <el-form label-width="100px" class="detail-form">
              <el-form-item label="审批结果*:">
                <span v-if="mode === 'view'">{{ approvalData.finalResult }}</span>
                <el-radio-group v-else v-model="formData.result">
                  <el-radio label="pass">通过</el-radio>
                  <el-radio label="reject">驳回</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="审批意见:">
                <span v-if="mode === 'view'">{{ approvalData.finalOpinion }}</span>
                <el-input
                  v-else
                  v-model="formData.opinion"
                  type="textarea"
                  :rows="4"
                  placeholder="上传资料全部符合规定，黄双效审核。"
                />
              </el-form-item>
              <el-form-item label="相关附件:">
                <div v-if="mode === 'view'" class="attachment-preview">
                  <div v-if="approvalData.finalAttachments && approvalData.finalAttachments.length > 0" class="attachment-list">
                    <!-- 图片直接展示 -->
                    <div v-for="(file, index) in approvalData.finalAttachments" :key="index" v-if="isImage(file)" class="image-preview">
                      <img :src="file.url" :alt="file.name" @click="previewImage(file)" />
                      <div class="image-info">
                        <span>{{ file.name }}</span>
                        <span>{{ file.size }}</span>
                      </div>
                    </div>
                    <!-- 非图片文件显示下载 -->
                    <div v-for="(file, index) in approvalData.finalAttachments" :key="index" v-if="!isImage(file)" class="file-item">
                      <span>{{ file.name }}</span>
                      <span>{{ file.size }}</span>
                      <el-button type="text" @click="handleDownload(file)" :loading="downloadingFiles.includes(file.name)">
                        <i v-if="!downloadingFiles.includes(file.name)" class="el-icon-download"></i>
                        {{ downloadingFiles.includes(file.name) ? '下载中...' : '下载' }}
                      </el-button>
                    </div>
                  </div>
                  <div v-else class="no-attachment">
                    <span>暂无附件</span>
                  </div>
                </div>
                <div v-else class="upload-section">
                  <div v-for="(file, index) in formData.attachments" :key="index" class="file-item">
                    <span>{{ file.name }}</span>
                    <span>{{ file.size }}</span>
                    <el-button type="text" @click="handleRemoveFile(index)">删除</el-button>
                  </div>
                  <el-button icon="el-icon-upload" @click="handleUpload">上传文件</el-button>
                  <input
                    ref="fileInput"
                    type="file"
                    style="display: none"
                    @change="handleFileChange"
                  />
                </div>
              </el-form-item>
            </el-form>

            <!-- 作废模式 -->
            <div v-if="mode === 'cancel'">
              <h3>作废</h3>
              <el-form label-width="100px" class="detail-form">
                <el-form-item label="作废原因:">
                  <el-input
                    v-model="formData.cancelReason"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入作废原因"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 分配管理员账号 -->
          <div v-show="activeNav === 'admin'" class="content-section">
            <el-form label-width="100px" class="detail-form">
              <el-form-item label="管理员账号:">
                <span>暂无数据</span>
              </el-form-item>
            </el-form>
          </div>

          <!-- 内容审核、变更 -->
          <div v-show="activeNav === 'review'" class="content-section">
            <el-form label-width="100px" class="detail-form">
              <el-form-item label="内容审核:">
                <span>暂无数据</span>
              </el-form-item>
            </el-form>
          </div>

          <!-- 安全加固 -->
          <div v-show="activeNav === 'security'" class="content-section">
            <el-form label-width="100px" class="detail-form">
              <el-form-item label="安全加固:">
                <span>暂无数据</span>
              </el-form-item>
            </el-form>
          </div>

          <!-- 设备功能配置与资料 -->
          <div v-show="activeNav === 'device'" class="content-section">
            <el-form label-width="100px" class="detail-form">
              <el-form-item label="设备配置:">
                <span>暂无数据</span>
              </el-form-item>
            </el-form>
          </div>

          <!-- 新建审批 -->
          <div v-show="activeNav === 'newApproval'" class="content-section">
            <el-form label-width="100px" class="detail-form">
              <el-form-item label="新建审批:">
                <span>暂无数据</span>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button v-if="mode === 'view'" @click="handleClose">返回</el-button>
      <template v-else-if="mode === 'handle'">
        <el-button type="primary" @click="handleSubmit">提交审批</el-button>
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="handleReset">驳回</el-button>
      </template>
      <template v-else-if="mode === 'cancel'">
        <el-button @click="handleClose">返回</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ApprovalDialog',
  props: {
    // 对话框是否可见
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // 模式：view-查看, handle-处理, cancel-作废
    mode: {
      type: String,
      default: 'view',
      validator: (value) => ['view', 'handle', 'cancel'].includes(value),
    },
    // 审批数据
    approvalData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: false,
      activeNav: 'basic',
      downloadingFiles: [], // 正在下载的文件列表
      navItems: [
        { key: 'basic', label: '基本信息' },
        { key: 'admin', label: '分配管理员账号' },
        { key: 'review', label: '内容审核、变更' },
        { key: 'security', label: '安全加固' },
        { key: 'device', label: '设备功能配置与资料' },
        { key: 'newApproval', label: '新建审批' },
      ],
      formData: {
        result: '',
        opinion: '',
        attachments: [],
        cancelReason: '',
      },
    }
  },
  computed: {
    dialogTitle() {
      const titleMap = {
        view: '查看审批详情',
        handle: '处理审批申请',
        cancel: '作废审批申请',
      }
      return this.approvalData.title || titleMap[this.mode]
    },
  },
  watch: {
    dialogVisible(val) {
      this.visible = val
      if (val) {
        this.resetForm()
      }
    },
    visible(val) {
      this.$emit('update:dialogVisible', val)
    },
  },
  methods: {
    // 关闭对话框
    handleClose() {
      this.visible = false
    },

    // 重置表单
    resetForm() {
      this.activeNav = 'basic'
      this.formData = {
        result: '',
        opinion: '',
        attachments: [],
        cancelReason: '',
      }
    },

    // 提交审批
    handleSubmit() {
      if (!this.formData.result) {
        this.$message.warning('请选择审批结果')
        return
      }

      const submitData = {
        id: this.approvalData.id,
        result: this.formData.result,
        opinion: this.formData.opinion,
        attachments: this.formData.attachments,
        mode: this.mode,
      }

      if (this.mode === 'cancel') {
        submitData.cancelReason = this.formData.cancelReason
      }

      this.$emit('submit', submitData)
      this.handleClose()
    },

    // 驳回
    handleReset() {
      this.formData.result = 'reject'
      this.handleSubmit()
    },

    // 上传文件
    handleUpload() {
      this.$refs.fileInput.click()
    },

    // 文件选择变化
    handleFileChange(event) {
      const files = event.target.files
      if (files.length > 0) {
        Array.from(files).forEach((file) => {
          this.formData.attachments.push({
            name: file.name,
            size: this.formatFileSize(file.size),
            file: file,
          })
        })
      }
      // 清空input，允许选择相同文件
      event.target.value = ''
    },

    // 移除文件
    handleRemoveFile(index) {
      this.formData.attachments.splice(index, 1)
    },

    // 下载文件
    async handleDownload(file) {
      console.log('下载文件:', file)
      
      const fileName = file.name || '下载文件'
      
      // 添加到下载中列表
      this.downloadingFiles.push(fileName)
      
      try {
        const url = file.url || file
        
        // 检查是否是跨域URL
        if (url.startsWith('http') && !url.includes(window.location.hostname)) {
          // 跨域文件，使用fetch下载
          await this.downloadCrossOriginFile(url, fileName)
        } else {
          // 同域文件，直接下载
          this.downloadLocalFile(url, fileName)
        }
        
        this.$message.success('文件下载已开始')
      } catch (error) {
        console.error('下载失败:', error)
        this.$message.error('文件下载失败，请稍后重试')
      } finally {
        // 从下载中列表移除
        const index = this.downloadingFiles.indexOf(fileName)
        if (index > -1) {
          this.downloadingFiles.splice(index, 1)
        }
      }
    },

    // 下载同域文件
    downloadLocalFile(url, fileName) {
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    // 下载跨域文件
    async downloadCrossOriginFile(url, fileName) {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = fileName
        link.style.display = 'none'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // 清理URL对象
        window.URL.revokeObjectURL(downloadUrl)
      } catch (error) {
        console.error('跨域下载失败:', error)
        // 如果fetch失败，尝试直接打开链接
        window.open(url, '_blank')
      }
    },

    // 格式化文件大小
    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    },

    // 判断是否为图片
    isImage(file) {
      if (typeof file === 'string') {
        return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file)
      }
      if (file.name) {
        return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.name)
      }
      return false
    },

    // 预览图片
    previewImage(file) {
      const imageUrl = file.url || file
      this.$alert(`<img src="${imageUrl}" style="max-width: 100%; max-height: 80vh; object-fit: contain;" />`, '图片预览', {
        dangerouslyUseHTMLString: true,
        customClass: 'image-preview-dialog',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: '关闭'
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.approval-dialog {
  ::v-deep .el-dialog {
    max-height: 90vh;
    margin-top: 5vh !important;
    margin-bottom: 5vh !important;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  ::v-deep .el-dialog__body {
    padding: 20px;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  ::v-deep .el-dialog__header {
    flex-shrink: 0;
  }

  ::v-deep .el-dialog__footer {
    flex-shrink: 0;
  }

  .approval-content {
    display: flex;
    gap: 20px;
    flex: 1;
    overflow: hidden;

    .left-nav {
      width: 200px;
      border-right: 1px solid #e4e7ed;
      flex-shrink: 0;

      .nav-item {
        padding: 12px 20px;
        cursor: pointer;
        color: #606266;
        font-size: 14px;
        transition: all 0.3s;
        border-left: 3px solid transparent;

        &:hover {
          background-color: #f5f7fa;
          color: #409eff;
        }

        &.active {
          color: #409eff;
          background-color: #ecf5ff;
          border-left-color: #409eff;
          font-weight: 500;
        }
      }
    }

    .right-content {
      flex: 1;
      overflow: hidden;

      .content-section {
        padding: 0 20px 20px 0;

        h3 {
          font-size: 16px;
          font-weight: 500;
          color: #303133;
          margin: 20px 0 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e4e7ed;

          &:first-child {
            margin-top: 0;
          }
        }

        .detail-form {
          .el-form-item {
            margin-bottom: 18px;

            ::v-deep .el-form-item__label {
              color: #606266;
              font-weight: normal;
            }

            ::v-deep .el-form-item__content {
              color: #303133;

              > span {
                line-height: 32px;
              }
            }
          }
        }

        .attachment-preview {
          .attachment-list {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
          }

          .image-preview {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;

            img {
              max-width: 200px;
              max-height: 150px;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              cursor: pointer;
              transition: all 0.3s;

              &:hover {
                border-color: #409eff;
                box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
              }
            }

            .image-info {
              display: flex;
              flex-direction: column;
              gap: 4px;
              font-size: 12px;
              color: #909399;

              span:first-child {
                color: #303133;
                font-weight: 500;
              }
            }
          }

          .file-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 8px 12px;
            border: 1px solid #e4e7ed;
            border-radius: 4px;
            background-color: #f9f9f9;

            > span:first-child {
              flex: 1;
              color: #303133;
              font-weight: 500;
            }

            > span:nth-child(2) {
              color: #909399;
              font-size: 13px;
            }

            .el-button {
              padding: 0;
            }
          }

          .no-attachment {
            color: #909399;
            font-style: italic;
            padding: 20px;
            text-align: center;
          }
        }

        .upload-section {
          .el-button {
            margin-top: 10px;
          }
        }
      }
    }
  }

  .dialog-footer {
    text-align: center;
    padding: 20px 0 10px;

    .el-button {
      min-width: 100px;
    }
  }
}
</style>

<style lang="scss">
.image-preview-dialog {
  .el-message-box {
    width: auto;
    max-width: 90vw;
    max-height: 90vh;
  }
  
  .el-message-box__content {
    padding: 20px;
    text-align: center;
  }
  
  .el-message-box__message {
    margin: 0;
  }
}
</style>

