<template>
  <div class="approval-create">
    <approval-table :initial-data="mockData" approval-type="create" />
  </div>
</template>

<script>
  import ApprovalTable from '../components/ApprovalTable.vue'

  export default {
    name: 'ApprovalCreate',
    components: {
      ApprovalTable,
    },
    data() {
      return {
        mockData: {
          pending: {
            tableData: [
              {
                id: 'xj202509150001',
                title: '新建时代天街LED-01申请',
                applicant: '易白晴',
                managementUnit: '渝北区城管委',
                applicationTime: '2024/05/21 22:08',
                status: 'first_review',
              },
              {
                id: 'xj202509150002',
                title: '新建解放碑LED-01申请',
                applicant: '冯星腾',
                managementUnit: '渝北区城管委',
                applicationTime: '2025/04/07 19:41',
                status: 'final_review',
              },
              {
                id: 'xj202509150003',
                title: '新建观音桥LED-01申请',
                applicant: '张三',
                managementUnit: '江北区城管委',
                applicationTime: '2025/03/15 14:30',
                status: 'first_review',
              },
            ],
          },
          initiated: {
            tableData: [
              {
                id: 'xj202509150001',
                title: '新建时代天街LED-01申请',
                managementUnit: '渝北区城管委',
                applicationTime: '2024/05/21 22:08',
                status: 'first_review',
              },
              {
                id: 'xj202509150002',
                title: '新建解放碑LED-01申请',
                managementUnit: '渝北区城管委',
                applicationTime: '2025/04/07 19:41',
                status: 'final_review',
              },
              {
                id: 'xj202509150003',
                title: '新建时代天街LED-02申请',
                managementUnit: '渝北区城管委',
                applicationTime: '2024/05/21 22:08',
                status: 'rejected_first',
              },
              {
                id: 'xj202509150004',
                title: '新建解放碑LED-02申请',
                managementUnit: '渝北区城管委',
                applicationTime: '2025/04/07 19:41',
                status: 'rejected_final',
              },
              {
                id: 'xj202509150005',
                title: '新建时代天街LED-01申请',
                managementUnit: '渝北区城管委',
                applicationTime: '2025/11/04 01:53',
                status: 'approved',
              },
              {
                id: 'xj202509150006',
                title: '新建解放碑LED-03申请',
                managementUnit: '渝北区城管委',
                applicationTime: '2025/10/04 13:28',
                status: 'cancelled',
              },
            ],
          },
          processed: {
            tableData: [
              {
                id: 'xj202509150001',
                title: '新建时代天街LED-01申请',
                applicant: '李碧灵',
                managementUnit: '渝北区城管委',
                submissionTime: '2024/05/21 22:08',
                status: 'final_review',
              },
              {
                id: 'xj202509150002',
                title: '新建解放碑LED-01申请',
                applicant: '下允晨',
                managementUnit: '渝北区城管委',
                submissionTime: '2025/04/07 19:41',
                status: 'rejected_first',
              },
              {
                id: 'xj202509150003',
                title: '新建时代天街LED-02申请',
                applicant: '施运良',
                managementUnit: '渝北区城管委',
                submissionTime: '2024/05/21 22:08',
                status: 'rejected_final',
              },
              {
                id: 'xj202509150004',
                title: '新建解放碑LED-02申请',
                applicant: '赵昊明',
                managementUnit: '渝北区城管委',
                submissionTime: '2025/04/07 19:41',
                status: 'approved',
              },
              {
                id: 'xj202509150005',
                title: '新建时代天街LED-01申请',
                applicant: '蔡昌勋',
                managementUnit: '渝北区城管委',
                submissionTime: '2025/11/04 01:53',
                status: 'cancelled',
              },
            ],
          },
          cc: {
            tableData: [
              {
                id: 'xj202509150001',
                title: '新建时代天街LED-01申请',
                applicant: '易白晴',
                managementUnit: '渝北区城管委',
                applicationTime: '2024/05/21 22:08',
                currentApprover: '项目部',
                status: 'first_review',
              },
              {
                id: 'xj202509150002',
                title: '新建解放碑LED-01申请',
                applicant: '冯星腾',
                managementUnit: '渝北区城管委',
                applicationTime: '2025/04/07 19:41',
                currentApprover: '孙怜菡',
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
  .approval-create {
    height: 100%;
  }
</style>
