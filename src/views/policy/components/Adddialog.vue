<template>
  <el-dialog
    title="新增策略"
    :visible="visiable"
    width="630px"
    @close="onClose"
  >
    <el-form
      ref="form"
      :model="formData"
      label-width="120px"
      :rules="formRules"
    >
      <el-form-item label="策略名称" prop="policyName">
        <el-input placeholder="请输入" v-model="formData.policyName"></el-input>
      </el-form-item>
      <el-form-item label="策略方案" prop="discount">
        <el-input-number
          controls-position="right"
          placeholder="请输入"
          :min="1"
          :max="100"
          v-model="formData.discount"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <center>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose" class="cancel">取 消</el-button>
        <el-button type="primary" @click="onSave" class="save">确 定</el-button>
      </div>
    </center>
  </el-dialog>
</template>

<script>
import { AddPolicyApi, EditPolicyApi } from "@/api/policy";
export default {
  data() {
    return {
      formData: {
        policyName: "", //策略名称
        discount: "", //策略方案
      },
      formRules: {
        policyName: [
          { required: true, message: "策略名称不能为空", trigger: "blur" },
        ],
        discount: [
          { required: true, message: "策略名称不能为空", trigger: "change" },
        ],
      },
    };
  },
  props: {
    visiable: {
      type: Boolean,
      required: true,
    },
    rowList: {
      type: Object,
    },
  },

  created() {},
  computed: {
    // dialogTitle() {
    //   return this.rowList.policyId ? "修改策略" : "新增策略";
    // },
  },

  methods: {
    onClose() {
      this.$emit("update:visiable", false);
      // 重置表单
      this.$refs.form.resetFields();
      this.formData = {
        policyName: "", //策略名称
        discount: "", //策略方案
      };
    },
    async onSave() {
      // 对整个表单进行校验的方法
      await this.$refs.form.validate();
      if (this.rowList.policyId) {
        await EditPolicyApi(
          this.rowList.policyId,
          this.rowList.policyName,
          this.rowList.discount
        );
        this.$message.success("修改策略成功");
        this.onClose();
        this.$emit("addSuccess");
      } else {
        await AddPolicyApi(this.formData);
        this.$message.success("新增策略成功");
        this.onClose();
        this.$emit("addSuccess");
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  border-radius: 10px;
}
::v-deep .el-dialog__title {
  font-weight: 600;
}
::v-deep label {
  font-weight: 400;
}
::v-deep .el-input {
  width: 360px;
  height: 36px;
}
.el-dialog__header {
  padding: 20px;
  padding-bottom: 10px;
}
::v-deep .el-input-number {
  width: 360px;
  height: 36px;
}
.cancel {
  justify-content: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background-color: #fbf4f0 !important;
  border: none;
  color: #655b56 !important;
  font-size: 14px;
  border-radius: 4px;
}
.save {
  justify-content: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  border: none;
  font-size: 14px;
  margin-left: 30px;
  border-radius: 4px;
}
</style>
