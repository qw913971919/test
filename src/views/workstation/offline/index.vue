<template>
  <div class="approval-offline">
    <approval-table :initial-data="mockData" approval-type="offline" />
  </div>
</template>

<script>
  import ApprovalTable from '../components/ApprovalTable.vue'

  export default {
    name: 'ApprovalOffline',
    components: {
      ApprovalTable,
    },
    data() {
      return {
        mockData: {
          pending: {
            tableData: [
              {
                id: 'xx202509150001',
                title: '下线朝天门LED-01申请',
                applicant: '陈静',
                managementUnit: '渝中区城管委',
                applicationTime: '2025/05/21 11:20',
                status: 'first_review',
              },
              {
                id: 'xx202509150002',
                title: '下线沙坪坝三峡广场LED-01申请',
                applicant: '刘洋',
                managementUnit: '沙坪坝区城管委',
                applicationTime: '2025/05/20 16:45',
                status: 'final_review',
              },
              {
                id: 'xx202509150003',
                title: '下线江北嘴金融城LED-02申请',
                applicant: '周敏',
                managementUnit: '江北区城管委',
                applicationTime: '2025/05/19 13:30',
                status: 'first_review',
              },
            ],
          },
          initiated: {
            tableData: [
              {
                id: 'xx202509150001',
                title: '下线朝天门LED-01申请',
                managementUnit: '渝中区城管委',
                applicationTime: '2025/05/21 11:20',
                status: 'first_review',
              },
              {
                id: 'xx202509150002',
                title: '下线沙坪坝三峡广场LED-01申请',
                managementUnit: '沙坪坝区城管委',
                applicationTime: '2025/05/20 16:45',
                status: 'approved',
              },
              {
                id: 'xx202509150003',
                title: '下线江北嘴金融城LED-02申请',
                managementUnit: '江北区城管委',
                applicationTime: '2025/05/19 13:30',
                status: 'rejected_final',
              },
              {
                id: 'xx202509150004',
                title: '下线大渡口万象汇LED-01申请',
                managementUnit: '大渡口区城管委',
                applicationTime: '2025/05/18 10:00',
                status: 'cancelled',
              },
            ],
          },
          processed: {
            tableData: [
              {
                id: 'xx202509150001',
                title: '下线朝天门LED-01申请',
                applicant: '陈静',
                managementUnit: '渝中区城管委',
                submissionTime: '2025/05/21 11:20',
                status: 'approved',
              },
              {
                id: 'xx202509150002',
                title: '下线沙坪坝三峡广场LED-01申请',
                applicant: '刘洋',
                managementUnit: '沙坪坝区城管委',
                submissionTime: '2025/05/20 16:45',
                status: 'rejected_final',
              },
              {
                id: 'xx202509150003',
                title: '下线江北嘴金融城LED-02申请',
                applicant: '周敏',
                managementUnit: '江北区城管委',
                submissionTime: '2025/05/19 13:30',
                status: 'final_review',
              },
            ],
          },
          cc: {
            tableData: [
              {
                id: 'xx202509150001',
                title: '下线朝天门LED-01申请',
                applicant: '陈静',
                managementUnit: '渝中区城管委',
                applicationTime: '2025/05/21 11:20',
                currentApprover: '技术部',
                status: 'first_review',
              },
              {
                id: 'xx202509150002',
                title: '下线沙坪坝三峡广场LED-01申请',
                applicant: '刘洋',
                managementUnit: '沙坪坝区城管委',
                applicationTime: '2025/05/20 16:45',
                currentApprover: '市场部',
                status: 'final_review',
              },
            ],
          },
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  .approval-offline {
    height: 100%;
  }
</style>
