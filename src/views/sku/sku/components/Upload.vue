<template>
  <el-dialog
    title="数据导入"
    :visible="visiableUp"
    width="483px"
    @close="onClose"
  >
    <el-form ref="form" :model="formData" label-width="120px">
      <el-form-item label="标题：" width="120px">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :before-upload="beforeAvatarUpload"
          multiple
          :limit="3"
          name="fileName"
        >
          <el-button type="primary" class="upload">
            <i class="el-icon-upload"></i>上传文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            支持扩展名:xls、xlsx,文件不得大于1M
          </div>
        </el-upload>
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
import { getUpload } from "@/api/sku";
export default {
  data() {
    return {
      formData: {},
    };
  },
  props: {
    // 控制弹窗显隐
    visiableUp: {
      type: Boolean,
      required: true,
    },
  },

  created() {},

  methods: {
    beforeAvatarUpload(fileName) {
      const isxls = fileName.type === "xls/xlsx";
      const isLt1M = fileName.size / 1024 / 1024 < 1;
      if (!isxls) {
        this.$message.error("上传头像图片只能是 xls 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isxls && isLt1M;
    },
    onClose() {
      this.$emit("update:visiableUp", false);
    },
    async onSave() {
      await getUpload(fileName);
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
  line-height: 22px;
  font-size: 16px;
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
::v-deep .upload {
  min-width: 80px;
  height: 36px;
  padding: 0;
  background-color: #5f84ff;
  border: none;
  width: 221px;
}
.el-upload__tip {
  font-size: 14px;
  color: #bac0cd;
}
</style>
