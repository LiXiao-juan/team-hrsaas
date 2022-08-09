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
      label-width="140px"
      align="center"
    >
      <el-form-item label="合作商名称:" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="contact">
        <el-input
          v-model="formData.contact"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="分成比例(%):" prop="ratio">
        <el-input-number
          v-model="formData.ratio"
          controls-position="right"
          :min="0"
          :max="100"
          placeholder="请输入"
          style="width: 100%"
        ></el-input-number>
      </el-form-item>
      <el-form-item v-if="isshow" label="账号:" prop="account">
        <el-input
          v-model="formData.account"
          placeholder="请输入"
          maxlength="18"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item v-if="isshow" label="密码:" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入"
          maxlength="20"
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
import { addPartnerItemApi, editPartnerItemApi } from "@/api/addressPartner";
export default {
  data() {
    return {
      dialogTitle: "新增合作商", //弹窗标题名
      isshow: true, //控制账号密码框显示隐藏
      formData: {
        name: "", // 合作商名称
        contact: "", // 联系人
        mobile: "", // 联系电话
        ratio: "", // 分成比例
        account: "", // 账号
        password: "", // 密码
      },
      formDataRules: {
        name: [
          {
            required: true,
            message: "合作商名称不能为空",
            trigger: "blur",
          },
        ],
        contact: [
          {
            required: true,
            message: "联系人不能为空",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "联系电话不能为空",
            trigger: "blur",
          },
        ],
        ratio: [
          {
            required: true,
            message: "分成比例不能为空",
            trigger: "blur",
          },
        ],
        account: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
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
  computed: {},
  methods: {
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields(); //重置表单
      this.isshow = true;
      this.dialogTitle = "新增合作商"
      this.formData = {
        name: "", // 合作商名称
        contact: "", // 联系人
        mobile: "", // 联系电话
        ratio: "", // 分成比例
        account: "", // 账号
        password: "", // 密码
      };
    },
    // 保存
    async onSave() {
      await this.$refs.form.validate();
      if (this.formData.id) {
        try {
          await editPartnerItemApi(this.formData);
          this.$message.success("添加成功");
          this.onClose();
          this.$emit("addSuccess");
        } catch (error) {
          this.$message.error("添加失败");
        }
      } else {
        try {
          await addPartnerItemApi(this.formData);
          this.$message.success("添加成功");
          this.onClose();
          this.$emit("addSuccess");
        } catch (error) {
          this.$message.error("添加失败");
        }
      }
    },
    // 获取点击的项的详情,数据回显
    async getPartnerItem(val) {
      this.isshow = false;
      this.formData.id = val.id;
      this.formData.name = val.name;
      this.formData.contact = val.contact;
      this.formData.mobile = val.mobile;
      this.formData.ratio = val.ratio;
      this.formData.account = val.account;
      this.formData.password = val.password;
      this.dialogTitle = "修改合作商"
      console.log(this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 10px;
  .el-dialog__body {
    padding: 20px 20px 30px;
  }
}
::v-deep .el-dialog__title {
  font-size: 16px;
  font-weight: 600;
}

.el-dialog .el-dialog__body .el-form-item {
  margin-bottom: 20px;
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
