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
      <el-form-item label="商品名称:" prop="skuName">
        <el-input
          placeholder="请输入"
          v-model="formData.skuName"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌:" prop="brandName">
        <el-input
          placeholder="请输入"
          v-model="formData.brandName"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格(元):" prop="price">
        <el-input-number
          controls-position="right"
          placeholder="请输入"
          :min="0"
          :max="10000"
          v-model="formData.price"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品类型:" prop="classId">
        <el-select v-model="formData.classId" placeholder="请选择">
          <el-option
            v-for="item in goodsList"
            :key="item.classId"
            :label="item.className"
            :value="item.classId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格:" prop="unit">
        <el-input
          placeholder="请输入"
          v-model="formData.unit"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="商品图片:" prop="skuImage">
        <el-upload
          class="upload-demo"
          drag
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          name="fileName"
        >
          <img v-if="formData.skuImage" :src="formData.skuImage" />
          <i class="el-icon-upload"></i>
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
import { editGoods, getAddGoods } from "@/api/sku";
export default {
  data() {
    return {
      formData: {
        skuName: "", //商品名称
        brandName: "", //品牌
        price: "", //商品价格
        classId: "", //商品类型
        unit: "", //规格
        skuImage: "", //商品图片
      },
      id: "",
      // goodsList: [],
      formRules: {
        skuName: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        brandName: [
          { required: true, message: "品牌不能为空", trigger: "blur" },
        ],
        classId: [
          { required: true, message: "商品类型不能为空", trigger: "change" },
        ],
        unit: [{ required: true, message: "规格不能为空", trigger: "blur" }],
        skuImage: [{ required: true, message: "商品图片不能为空" }],
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
    goodsList: {
      type: Array,
    },
  },

  created() {},
  computed: {
    dialogTitle() {
      return this.visiabledia ? "修改商品" : "新增商品";
    },
  },

  methods: {
    //转换图片格式
    handleAvatarSuccess(res, fileName) {
      this.formData.skuImage = URL.createObjectURL(fileName.raw);
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
    onClose() {
      this.$emit("update:visiable", false);
      // 重置表单
      this.$refs.form.resetFields();
      this.formData = {
        skuName: "", //商品名称
        brandName: "", //品牌
        price: "", //商品价格
        classId: "", //商品类型
        unit: "", //规格
        skuImage: "", //商品图片
      };
    },
    async onSave() {
      // 对整个表单进行校验的方法
      await this.$refs.form.validate();
      if (this.visiabledia) {
        // await getUpload(fileName);
        await editGoods(this.id, this.formData);
        this.$message.success("修改商品成功");
        this.onClose();
        this.$emit("addSuccess");
      } else {
        // await getUpload(fileName);
        await getAddGoods(this.formData);
        this.$message.success("新增商品成功");
        this.onClose();
        this.$emit("addSuccess");
      }
    },
    async getGoodsType(val) {
      this.formData = val;
      // const res = await getGoodsApi();
      // // console.log(res);
      // this.goodsList = res.data.currentPageRecords;
      this.id = val.skuId;
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
::v-deep img {
  height: 80px;
}
</style>
