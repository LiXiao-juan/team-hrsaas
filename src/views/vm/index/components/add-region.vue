<template>
  <el-dialog title="新增设备" :visible="visible" width="630px" @close="onClose">
    <el-form
      ref="form"
      :model="policyId"
      :rules="formDataRules"
      label-width="100px"
    >
      <el-form-item>
        <center>
          <h3>设备编号：系统自动生成</h3>
        </center>
      </el-form-item>
      <el-form-item label="选择型号:" prop="vmType">
        <el-select v-model="policyId.vmType" placeholder="请选择">
          <el-option
            v-for="item in typeList"
            :key="item.typeId"
            :label="item.name"
            :value="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择点位:" prop="nodeId">
        <el-select v-model="policyId.nodeId" placeholder="请选择">
          <el-option
            v-for="item in addressList"
            :key="item.typeId"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
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
import { addVmService } from "@/api/vm";
export default {
  data() {
    return {
      policyId: {
        vmType: "", // 售货机类型Id
        nodeId: "", // 	所属点位Id
      },
      formDataRules: {
        vmType: [
          {
            required: true,
            message: "区域名称不能为空",
            trigger: "blur",
          },
        ],
        nodeId: [
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
    typeList: {
      type: Array,
      default: () => [],
    },
    addressList: {
      type: Array,
      default: () => [],
    },
  },
  created() {},
  computed: {},
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
      this.policyId.createUserId = this.$store.state.user.token.userId;
      // console.log(this.policyId);
      try {
        await addVmService(this.policyId);
        this.$message.success("添加售货机成功");
        this.$emit("update:visible", false);
        this.$parent.getVmList();
      } catch (error) {
        this.$message.warning("添加售货机失败");
      }
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
::v-deep .el-input-number {
  width: 360px;
  height: 36px;
}
::v-deep .el-input {
  width: 360px;
  height: 36px;
  margin-left: 30px;
}
</style>
