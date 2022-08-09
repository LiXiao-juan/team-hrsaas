<template>
  <el-dialog title="策略详情" :visible="visiable" @close="onClose">
    <el-form :model="form" label-width="100px">
      <el-form-item label="策略名称:">
        <el-input v-model="form.policyName" readonly></el-input>
      </el-form-item>
      <el-form-item label="策略方案:">
        <el-table :data="gridData">
          <el-table-column
            type="index"
            label="序号"
            width="100px"
          ></el-table-column>
          <el-table-column
            property="nodeName"
            label="点位名称"
            width="200px"
          ></el-table-column>
          <el-table-column
            property="innerCode"
            label="设备编号"
            width="200px"
          ></el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <!-- 分页 -->
    <Pagination
      :listIsShow="this.lastDisabled && this.rightDisabled"
      :taskList="nodeData"
      v-if="nodeData.totalCount"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="getLastTaskService"
      @nextPage="getNextTaskService"
    />
  </el-dialog>
</template>

<script>
import Pagination from "@/views/policy/components/pagination.vue";
import { getVmList } from "@/api/policy";
export default {
  data() {
    return {
      form: {
        policyId: "",
        policyName: "", //策略名称
        discount: "", //策略方案
      },
      gridData: [],
      nodeData: {}, //主体内容数据
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  props: {
    visiable: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Pagination,
  },

  created() {},
  computed: {
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.nodeData.pageIndex <= 1;
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return (
        this.nodeData.pageIndex == Math.ceil(this.nodeData.totalCount / 10)
      );
    },
  },

  methods: {
    // 右上角关闭
    onClose() {
      this.$emit("update:visiable", false);
    },
    // 根据策略获取
    async getDetail() {
      const res = await getVmList(this.form.policyId, this.params);
      console.log(res);
      this.gridData = res.data.currentPageRecords;
      this.nodeData = res.data;
    },
    // 加载下一页
    async getNextTaskService() {
      this.params.pageIndex++;
      this.getDetail();
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.getDetail();
    },
    //获取当前点击行信息
    async getDetailRow(val) {
      this.form.policyName = val.policyName;
      this.form.discount = val.discount;
      this.form.policyId = val.policyId;
      this.getDetail();
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  margin-top: 15vh;
  width: 630px;
}
::v-deep th {
  line-height: 1.15;
  padding: 10px 0px 9px;
  background: rgb(243, 246, 251);
  font-weight: 500;
  text-align: left;
  color: rgb(102, 102, 102);
}
</style>
