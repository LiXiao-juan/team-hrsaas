<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="630px"
    center:false
    :close-on-click-modal="false"
  >
    <el-form :model="form" :rules="formRules" ref="form">
      <el-form-item :label-width="formLabelWidth" prop="userName"
        ><template #label> 人员名称：</template>
        <el-input
          v-model="form.userName"
          autocomplete="off"
          placeholder="请输入"
          maxlength="5"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" prop="roleId">
        <template #label> 角色：</template>
        <el-select v-model="form.roleId" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.roleCode"
            :label="item.roleName"
            :value="item.roleId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" prop="mobile"
        ><template #label> 联系电话：</template>
        <el-input
          v-model="form.mobile"
          autocomplete="off"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" prop="regionId">
        <template #label> 负责区域：</template>
        <el-select v-model="form.regionId" placeholder="请选择">
          <el-option
            v-for="item in regionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="form.regionName = item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" prop="image">
        <template #label> 头像：</template>
        <el-upload
          class="avatar-uploader"
          action="/api/vm-service/sku/fileUpload"
          :show-file-list="false"
          :headers="{ Authorization: $store.state.user.token.token }"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="fileName"
        >
          <img v-if="form.image" :src="form.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="el-upload__tip">
          支持扩展名：jpg、png，文件不得大于100kb
        </div>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" prop="status">
        <template #label> 状态：</template>
        <el-checkbox v-model="form.status">是否启用</el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addPersonnel, editPersonnel } from "@/api/personnel";
export default {
  props: {
    roleList: {
      type: Array,
      required: true,
    },
    regionList: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
    },
    currentId: {},
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        userName: "",
        roleId: "",
        mobile: "",
        regionId: "",
        regionName: "",
        image: "",
        status: false,
      },
      formRules: {
        userName: [
          {
            required: true,
            message: "请输入",
          },
        ],
        roleId: [
          {
            required: true,
            message: "请输入",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入",
          },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: "请输入正确的手机号",
            trigger: "change",
          },
        ],
        regionId: [
          {
            required: true,
            message: "请输入",
          },
        ],
        image: [
          {
            required: true,
            message: "请上传",
          },
        ],
      },
      formLabelWidth: "120px",
      imageFile: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, fileName) {
      this.form.image = URL.createObjectURL(fileName.raw);
    },
    beforeAvatarUpload(fileName) {
      const isJPG = fileName.type === "image/jpeg";
      const isLt2M = fileName.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    /* 提交 */
    async onSave() {
      await this.$refs.form.validate();
      try {
        if (this.title === "编辑人员") {
          await editPersonnel(this.currentId, this.form);
          this.$message.success("修改信息成功");
        } else {
          await addPersonnel(this.form);
        }
      } catch (error) {
        console.log(error);
      }
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 10px;
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  .el-dialog__header {
    border-bottom: none !important;
    padding: 20px;
    padding-bottom: 10px;
    text-align: left;
    .el-dialog__title {
      color: #333;
      line-height: 22px;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .el-dialog__body {
    padding: 20px 20px 0px;
    color: #666;
    font-size: 14px;
    word-break: break-all;
    .el-form {
      .el-form-item__label {
        font-weight: normal;
      }
      .el-input {
        width: 396px;
      }
      .avatar-uploader-icon {
        width: 84px;
        height: 84px;
        line-height: 84px;
        text-align: center;
        color: #bac0cd;
        position: relative;
        overflow: hidden;
        background: #f3f6fb;
        border: 1px dashed #d8dde3;
        border-radius: 4px;
        cursor: pointer;
        display: inline-block;
        text-align: center;
        outline: none;
      }
      .el-upload {
        text-align: left;
        height: 86px;
      }
      .el-upload__tip {
        line-height: 1.15;
        font-size: 14px;
        color: #bac0cd;
      }
      .el-form-item__content {
        text-align: left;
        .avatar {
          width: 84px;
          height: 84px;
        }
      }
      .avatar-uploader {
        .el-upload {
          position: relative;
          overflow: hidden;
          background: #f3f6fb;
          border: 1px dashed #d8dde3;
          border-radius: 4px;
          cursor: pointer;
          display: inline-block;
          text-align: center;
          outline: none;
        }
      }
    }
  }
  .el-dialog__footer {
    padding-top: 0;
    padding-bottom: 40px;
    box-sizing: border-box;
    .dialog-footer {
      padding-top: 0;
      text-align: center;
      .el-button--default {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 80px !important;
        height: 36px;
        padding: 0;
        background-color: #fbf4f0 !important;
        border: none;
        color: #655b56 !important;
      }
      .el-button--primary {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 80px !important;
        height: 36px;
        padding: 0;
        background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
        border: none;
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
