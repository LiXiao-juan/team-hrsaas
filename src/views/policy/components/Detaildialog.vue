<template>
  <el-dialog
    title="策略详情"
    :visible="visiable"
    @close="onClose"
    label-width="140px"
  >
    <el-form :model="form">
      <el-form-item label="策略名称:">
        <!-- <el-form-content v-model="form.policyName" autocomplete="off"
          >九折优惠</el-form-content
        > -->
      </el-form-item>
      <el-form-item label="策略方案:">
        <el-table :data="gridData">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            property="nodeName"
            label="点位名称"
          ></el-table-column>
          <el-table-column
            property="innerCode"
            label="设备编号"
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
    onClose() {
      this.$emit("update:visiable", false);
    },
    async getDetail() {
      const res = await getVmList();
      console.log(res);
    },
  },
};
</script>

<style scoped lang="scss"></style>
