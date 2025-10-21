<template>
  <div class="approval-online">
    <approval-table :initial-data="mockData" approval-type="online" />
  </div>
</template>

<script>
  import ApprovalTable from '../components/ApprovalTable.vue'

  export default {
    name: 'ApprovalOnline',
    components: {
      ApprovalTable,
    },
    data() {
      return {
        mockData: {
          pending: {
            tableData: [
              {
                id: 'sx202509150001',
                title: '上线南坪万达LED-01申请',
                applicant: '王芳',
                managementUnit: '南岸区城管委',
                applicationTime: '2025/05/20 10:15',
                status: 'first_review',
              },
              {
                id: 'sx202509150002',
                title: '上线杨家坪LED-02申请',
                applicant: '李明',
                managementUnit: '九龙坡区城管委',
                applicationTime: '2025/05/19 15:30',
                status: 'final_review',
              },
              {
                id: 'sx202509150003',
                title: '上线北城天街LED-01申请',
                applicant: '赵强',
                managementUnit: '江北区城管委',
                applicationTime: '2025/05/18 09:00',
                status: 'first_review',
              },
            ],
          },
          initiated: {
            tableData: [
              {
                id: 'sx202509150001',
                title: '上线南坪万达LED-01申请',
                managementUnit: '南岸区城管委',
                applicationTime: '2025/05/20 10:15',
                status: 'first_review',
              },
              {
                id: 'sx202509150002',
                title: '上线杨家坪LED-02申请',
                managementUnit: '九龙坡区城管委',
                applicationTime: '2025/05/19 15:30',
                status: 'approved',
              },
              {
                id: 'sx202509150003',
                title: '上线北城天街LED-01申请',
                managementUnit: '江北区城管委',
                applicationTime: '2025/05/18 09:00',
                status: 'rejected_first',
              },
              {
                id: 'sx202509150004',
                title: '上线大坪时代天街LED-01申请',
                managementUnit: '渝中区城管委',
                applicationTime: '2025/05/17 14:20',
                status: 'final_review',
              },
            ],
          },
          processed: {
            tableData: [
              {
                id: 'sx202509150001',
                title: '上线南坪万达LED-01申请',
                applicant: '王芳',
                managementUnit: '南岸区城管委',
                submissionTime: '2025/05/20 10:15',
                status: 'approved',
              },
              {
                id: 'sx202509150002',
                title: '上线杨家坪LED-02申请',
                applicant: '李明',
                managementUnit: '九龙坡区城管委',
                submissionTime: '2025/05/19 15:30',
                status: 'rejected_first',
              },
            ],
          },
          cc: {
            tableData: [
              {
                id: 'sx202509150001',
                title: '上线南坪万达LED-01申请',
                applicant: '王芳',
                managementUnit: '南岸区城管委',
                applicationTime: '2025/05/20 10:15',
                currentApprover: '运营部',
                status: 'first_review',
              },
            ],
          },
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  .approval-online {
    height: 100%;
  }
</style>
