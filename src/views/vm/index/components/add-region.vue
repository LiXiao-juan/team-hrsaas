<template>
  <el-dialog
    :title="dialogTitle"
    :visible="visible"
    width="630px"
    :before-close="onClose"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formDataRules"
      label-width="100px"
    >
      <el-form-item label="区域名称:" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="备注说明:" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          maxlength="40"
          :autosize="{ minRows: 3, maxRows: 4 }"
          placeholder="请输入备注(不超过40字)"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" class="cancleBtn">取 消</el-button>
      <el-button type="primary" @click="onSave" class="confirmBtn"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addRegion, getEditRegion, editRegion } from "@/api/address";
export default {
  data() {
    return {
      formData: {
        name: "", // 区域名称
        remark: "", // 备注说明
      },
      formDataRules: {
        name: [
          {
            required: true,
            message: "区域名称不能为空",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "备注说明不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  created() {},
  computed: {
    dialogTitle() {
      return this.formData.id ? "修改区域" : "新增区域";
    },
  },
  methods: {
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields(); //重置表单
      this.formData = {
        name: "", // 区域名称
        remark: "", // 备注说明
      };
    },
    // 保存
    async onSave() {
      await this.$refs.form.validate();
      if (this.formData.id) {
        await editRegion(this.formData.id,this.formData.name,this.formData.remark)
        this.$message.success('修改成功')
        this.onClose()
        this.$emit('addSuccess')
      } else {
        try {
          await addRegion(this.formData);
          this.$message.success("添加成功");
          this.onClose();
          this.$emit("addSuccess");
        } catch (error) {
          this.$message.error("添加失败");
        }
      }
    },
    // 获取区域详情
    async getRegionId(val) {
      const res = await getEditRegion(val.id);
      this.formData = res.data;
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 10px;
}
::v-deep .el-dialog__title {
  font-size: 16px;
  font-weight: 600;
}

::v-deep .el-dialog .el-dialog__body .el-form-item .el-form-item__content {
  width: 396px;
  line-height: 36px;
}

::v-deep label {
  font-weight: normal;
}

.el-dialog .el-dialog__body .el-form-item:last-child {
  margin-bottom: 0;
}

.el-dialog .el-dialog__footer .dialog-footer {
  padding-top: 0;
  text-align: center;
}

.el-dialog .el-dialog__footer .dialog-footer .el-button + .el-button {
  margin-left: 34px !important;
}

.cancleBtn {
  background-color: #fbf4f0 !important;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: none;
  color: #655b56 !important;
}

.confirmBtn {
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: none;
}
</style>
