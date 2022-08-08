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
  </el-dialog>
</template>

<script>
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
    };
  },
  props: {
    visiable: {
      type: Boolean,
      required: true,
    },
  },

  created() {},

  methods: {
    // 右上角关闭
    onClose() {
      this.$emit("update:visiable", false);
    },
    // 根据策略获取
    async getDetail() {
      const res = await getVmList(this.form.policyId);
      console.log(res);
      this.gridData = res.data.currentPageRecords;
    },
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
