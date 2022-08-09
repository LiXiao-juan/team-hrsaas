<template>
  <el-dialog title="编辑人员" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item :label-width="formLabelWidth"
        ><template #label> <span>*</span> 人员名称：</template>
        <el-input
          v-model="form.userName"
          autocomplete="off"
          placeholder="请输入"
          maxlength="5"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <template #label> <span>*</span> 角色：</template>
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
      <el-form-item :label-width="formLabelWidth"
        ><template #label> <span>*</span> 联系电话：</template>
        <el-input
          v-model="form.mobile"
          autocomplete="off"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <template #label> <span>*</span> 负责区域：</template>
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
      <el-form-item :label-width="formLabelWidth">
        <template #label> <span>*</span> 头像：</template>
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <template #label> 状态：</template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
    {{ form }}
  </el-dialog>
</template>

<script>
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
      },
      formLabelWidth: "120px",
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
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
