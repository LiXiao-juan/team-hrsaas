<template>
  <el-dialog
    title="合作商详情"
    :visible="visible"
    width="630px"
    :before-close="onClose"
  >
    <el-form >
      <el-row >
        <el-col :span="12" >
          <el-form-item label="合作商名称:" >
            {{ checkPartnerItemList.name }}
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item label="联系人:" > {{checkPartnerItemList.contact}} </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话:"> {{checkPartnerItemList.mobile}} </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分成比例:"> {{ratioType}} </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    checkPartnerItemList: {
      type: Object,
    },
  },
  computed:{
    ratioType(){
        return `${this.checkPartnerItemList.ratio}%`
    }
  },

  methods: {
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
    },

    // 格式化时间
    timeType(row, colum, index) {
      return index.replace("T", " ");
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

::v-deep label {
  font-weight: normal;
  width: 140px;
}
::v-deep .el-table td,
.el-table th {
  border: none;
}
::v-deep .el-table th.is-leaf {
  border-bottom: none;
}

.el-table::before {
  height: 0;
}
</style>
