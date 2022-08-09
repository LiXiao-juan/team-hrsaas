<template>
  <el-dialog
    :title="dialogTitle"
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
      <el-form-item label="商品类型名称" prop="className">
        <el-input placeholder="请输入" v-model="formData.className"></el-input>
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
import { editClass, addClass } from "@/api/skugoods";
export default {
  data() {
    return {
      formData: {
        classId: "",
        className: "", //商品类型名称
      },
      formRules: {
        className: [
          { required: true, message: "商品类型名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    // 控制新增的弹窗显隐
    visiable: {
      type: Boolean,
      required: true,
    },
    // 控制修改的弹窗显隐
    visiabledia: {
      type: Boolean,
      required: true,
    },
  },

  created() {},
  computed: {
    dialogTitle() {
      return this.visiabledia ? "修改商品类别" : "新增商品类别";
    },
  },

  methods: {
    onClose() {
      this.$emit("update:visiable", false);
      // 重置表单
      this.$refs.form.resetFields();
      this.formData = {
        className: "", //商品类型名称
      };
    },
    async onSave() {
      // 对整个表单进行校验的方法
      await this.$refs.form.validate();
      if (this.visiabledia) {
        await editClass(this.formData.classId, this.formData.className);
        this.$message.success("修改商品类别成功");
        this.onClose();
        this.$emit("addSuccess");
      } else {
        await addClass(this.formData.className);
        this.$message.success("新增商品类别成功");
        this.onClose();
        this.$emit("addSuccess");
      }
    },
    async getClass(val) {
      console.log(val);
      this.formData.className = val.className;
      this.formData.classId = val.classId;
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
