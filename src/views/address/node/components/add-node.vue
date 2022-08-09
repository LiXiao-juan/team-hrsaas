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
      <el-form-item label="点位名称:" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="所在区域:" prop="region">
        <el-select
          v-model="formData.regionId"
          placeholder="请选择"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="item in regionlist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商圈类型:" prop="businessType">
        <el-select
          v-model="formData.businessId"
          placeholder="请选择"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="item in businessType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属合作商:" prop="ownerName">
        <el-select
          v-model="formData.ownerId"
          placeholder="请选择"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="item in ownerName"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址:" prop="addr">
        <el-cascader
          v-model="formData.areaCode"
          :options="addrList"
          style="margin-bottom: 20px; width: 100%"
          placeholder="请选择"
          clearable
        ></el-cascader>
        <el-input
          v-model="formData.addr"
          type="textarea"
          maxlength="60"
          :autosize="{ minRows: 3, maxRows: 4 }"
          placeholder="请输入详细地址"
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
import { getNodeList } from "@/api/address";
import { addNodeApi,  editNodeApi } from "@/api/addressNode";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  data() {
    // 点位名称校验
    const checkNodeName = async (rule, value, callback) => {
      const {
        data: { currentPageRecords },
      } = await getNodeList();
      let isRepeat;
      if (this.formData.id) {
        isRepeat = currentPageRecords
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.name === value);
      } else {
        isRepeat = currentPageRecords.some((item) => item.name === value);
      }
      isRepeat ? callback(new Error("点位名称重复")) : callback();
    };
    return {
      dialogTitle: "新增点位", //标题
      addrList: regionData, //详细地址
      formData: {
        name: "", // 点位名称
        regionId: "", // 所在区域ID
        businessId: "", // 商圈类型ID
        ownerId: "", // 合作商ID
        areaCode: "", // 详细地址最后一级
        addr: "", // 详细地址说明
      },
      formDataRules: {
        name: [
          {
            required: true,
            message: "点位名称不能为空",
            trigger: "blur",
          },
          {
            validator: checkNodeName,
            trigger: "blur",
          },
        ],
        regionId: [
          {
            required: true,
            message: "所在区域不能为空",
            trigger: "blur",
          },
        ],
        businessId: [
          {
            required: true,
            message: "商圈类型不能为空",
            trigger: "blur",
          },
        ],
        ownerId: [
          {
            required: true,
            message: "合作商不能为空",
            trigger: "blur",
          },
        ],
        areaCode: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur",
          },
        ],
        addr: [
          {
            required: true,
            message: "详细地址不能为空",
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
    //所选区域下拉列表
    regionlist: {
      type: Array,
    },
    //商圈类型下拉列表
    businessType: {
      type: Array,
    },
    //归属合作商下拉列表
    ownerName: {
      type: Array,
    },
  },
  computed: {
    // 合作商名称
    ownerNames() {
      const oN = this.ownerName.filter(
        (item) => item.id === this.formData.ownerId
      );
      return oN[0].name;
    },
  },
  methods: {
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields(); //重置表单
      this.dialogTitle = "新增点位";
      this.formData = {
        name: "", // 点位名称
        regionId: "", // 所在区域ID
        businessId: "", // 商圈类型ID
        ownerId: "", // 合作商ID
        areaCode: "", // 详细地址最后一级
        addr: "", // 详细地址说明
      };
    },
    // 保存
    async onSave() {
      await this.$refs.form.validate();
      if (this.formData.id) {
        try {
          const addrList = this.formData.areaCode;
          // 拼接详细地址
          const hh = `${CodeToText[addrList[0]]}-${CodeToText[addrList[1]]}-${
            CodeToText[addrList[2]]
          }-${this.formData.addr}`;
          this.formData.addr = hh;
          this.formData.ownerName = this.ownerNames;
          this.formData.areaCode = this.formData.areaCode[2];
          await editNodeApi(this.formData);
          this.$message.success("修改成功");
          this.onClose();
          this.$emit("addSuccess");
        } catch (error) {
          this.$message.error("修改失败");
        }
      } else {
        try {
          const addrList = this.formData.areaCode;
          // 拼接详细地址
          const hh = `${CodeToText[addrList[0]]}-${CodeToText[addrList[1]]}-${
            CodeToText[addrList[2]]
          }-${this.formData.addr}`;
          this.formData.addr = hh;
          this.formData.areaCode = this.formData.areaCode[2];
          this.formData.ownerName = this.ownerNames;
          this.formData.createUserId = this.$store.state.user.token.userId;
          await addNodeApi(this.formData);
          this.$message.success("添加成功");
          this.onClose();
          this.$emit("addSuccess");
        } catch (error) {
          this.$message.error("添加失败");
        }
      }
    },
    // 获取点击的项的详情,数据回显
    async getNodeItem(val) {
      // 获取下拉列表数据
      this.dialogTitle = "修改点位";
      this.$emit("editDilog");      
      this.formData.id = val.id;
      this.formData.name = val.name;
      this.formData.regionId = val.region.id;
      this.formData.businessId = val.businessType.id;
      this.formData.ownerId = val.ownerId;
      const a = val.areaCode.substr(0,2) + '0000'
      const b = val.areaCode.substr(0,4) + '00'     
      const ab = [];      
      ab.push(a, b, val.areaCode);
      this.formData.areaCode = ab;
      this.formData.addr = val.addr;
      this.formData.createUserId = this.$store.state.user.token.userId;
      //   console.log(a);
      // this.formData.areaCode =
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
