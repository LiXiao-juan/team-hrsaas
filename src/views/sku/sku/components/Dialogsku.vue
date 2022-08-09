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
        <el-input placeholder="请输入" v-model="formData.skuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌:" prop="brandName">
        <el-input placeholder="请输入" v-model="formData.brandName"></el-input>
      </el-form-item>
      <el-form-item label="商品价格(元):" prop="price">
        <el-input-number
          controls-position="right"
          placeholder="请输入"
          :min="1"
          :max="1000"
          v-model="formData.discount"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品类型:" prop="className">
        <el-select v-model="formData.className" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格:" prop="unit">
        <el-input placeholder="请输入" v-model="formData.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品图片:" prop="skuImage">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
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
export default {
  data() {
    return {
      formData: {
        skuName: "", //商品名称
        brandName: "", //品牌
        price: "", //商品价格
        className: "", //商品类型
        unit: "", //规格
        skuImage: "", //商品图片
      },
      formRules: {
        skuName: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        brandName: [
          { required: true, message: "品牌不能为空", trigger: "blur" },
        ],
        price: [{ message: "价格不能为空", trigger: "change" }],
        className: [
          { required: true, message: "商品类型不能为空", trigger: "change" },
        ],
        unit: [{ required: true, message: "规格不能为空", trigger: "blur" }],
        skuImage: [
          { required: true, message: "商品图片不能为空", trigger: "change" },
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
      return this.visiabledia ? "修改商品" : "新增商品";
    },
  },

  methods: {
    onClose() {
      this.$emit("update:visiable", false);
      // 重置表单
      this.$refs.form.resetFields();
      this.formData = {
        policyName: "", //策略名称
        discount: "", //策略方案
      };
    },
    async onSave() {
      // 对整个表单进行校验的方法
      await this.$refs.form.validate();
    },
    getGoodsType(val) {
      this.formData = val;
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
</style>
