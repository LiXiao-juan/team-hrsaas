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
      <el-form-item label="型号名称:" prop="name">
        <el-input placeholder="请输入" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="型号编码:" prop="model">
        <el-input placeholder="请输入" v-model="formData.model"></el-input>
      </el-form-item>
      <el-form-item label="货道行数:" prop="vmRow">
        <el-input-number
          controls-position="right"
          placeholder="请输入"
          :min="0"
          :max="10"
          v-model="formData.vmRow"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道列数:" prop="vmCol">
        <el-input-number
          controls-position="right"
          placeholder="请输入"
          :min="0"
          :max="10"
          v-model="formData.vmCol"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道容量:" prop="channelMaxCapacity">
        <el-input-number
          controls-position="right"
          placeholder="请输入"
          :min="0"
          :max="10"
          v-model="formData.channelMaxCapacity"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="设备图片:" prop="image">
        <el-upload
          class="avatar-uploader"
          drag
          :show-file-list="false"
          action="/api/vm-service/sku/fileUpload"
          :headers="{ Authorization: $store.state.user.token.token }"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="fileName"
        >
          >
          <img v-if="formData.image" :src="formData.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="el-upload__text">支持扩展名:jpg、png,文件不得大于100kb</div>
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
import { addVmTypeApi,editVmTypeApi } from "@/api/vmType";
export default {
  data() {
    return {
      dialogTitle: "新增设备类型",
      formData: {
        name: "", //型号名称
        model: "", //型号编码
        vmRow: "", //货道行数
        vmCol: "", //货道列数
        channelMaxCapacity: "", //货道容量
        image: "", //设备图片
      },
      formRules: {
        name: [
          { required: true, message: "型号名称不能为空", trigger: "blur" },
        ],
        model: [
          { required: true, message: "型号编码不能为空", trigger: "blur" },
        ],
        vmRow: [
          { required: true, message: "货道行数不能为空", trigger: "blur" },
        ],
        vmCol: [
          { required: true, message: "货道列数不能为空", trigger: "blur" },
        ],
        channelMaxCapacity: [
          { required: true, message: "货道容量不能为空", trigger: "blur" },
        ],
        image: [
          { required: true, message: "设备图片不能为空", trigger: "change" },
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
  },

  created() {},
  computed: {},

  methods: {
    onClose() {
      this.$emit("update:visiable", false);
      // 重置表单
      this.$refs.form.resetFields();
      this.dialogTitle = "新增设备类型";
      this.formData = {
        name: "", //型号名称
        model: "", //型号编码
        vmRow: "", //货道行数
        vmCol: "", //货道列数
        channelMaxCapacity: "", //货道容量
        image: "", //设备图片
      };
    },
    async onSave() {
      //   // 对整个表单进行校验的方法
      await this.$refs.form.validate();
      if (this.formData.typeId) {
        try {
          await editVmTypeApi(this.formData);
          this.$message.success("修改成功");
          this.onClose();
          this.$emit("addSuccess");
        } catch (error) {
          this.$message.error("修改失败");
        }
      } else {
        try {
          await addVmTypeApi(this.formData);
          this.$message.success("添加成功");
          this.onClose();
          this.$emit("addSuccess");
        } catch (error) {
          this.$message.error("添加失败");
        }
      }
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      this.formData.image = file.response;
      console.log(this.formData.image);
    },
    // 限制上传图片类型
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或IMG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取数据回显
    getTypeItemId(val) {
      this.formData.typeId = val.typeId;
      this.dialogTitle = "修改设备类型";
      this.formData.name = val.name;
      this.formData.model = val.model;
      this.formData.vmRow = val.vmRow;
      this.formData.vmCol = val.vmCol;
      this.formData.channelMaxCapacity = val.channelMaxCapacity;
      this.formData.image = val.image;
      
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 76px;
  height: 76px;
  margin: 4px;
  display: block;
  -o-object-fit: contain;
  object-fit: contain;
  margin-top: -82px;
}

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
::v-deep .el-upload-dragger {
  width: 84px;
  height: 84px;
  line-height: 84px;
  text-align: center;
  color: #bac0cd;
  background: #f3f6fb;
}
::v-deep .el-icon-upload {
  font-size: 30px;
  color: #c0c4cc;
  margin: 15px 0 16px;
  line-height: 50px;
}
::v-deep .el-upload__text {
  font-size: 14px;
  color: #bac0cd;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
