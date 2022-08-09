<template>
  <el-dialog
    title="区域详情"
    :visible="visible"
    width="630px"
    :before-close="onClose"
  >
    <el-form :model="formData">
      <el-form-item label="区域名称：" label-width="140px">
        <span>{{checkListName}}</span>
      </el-form-item>
      <el-form-item label="包含点位：" label-width="140px">
        <el-table :data="checkList" style="width: 100%" highlight-current-row empty-text="暂无数据" >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="name" label="点位名称" width="158" align="center">
          </el-table-column>
          <el-table-column prop="vmCount" label="设备数量" width="158" align="center">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
        formData:{}
    };
  },

  created() {},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    checkList: {
      type: Array,
    },
    checkListName:{
        type:String,
        required:true
    }
  },

  methods: {
    onClose() {
      this.$emit("update:visible", false);
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
}

::v-deep th {
    line-height: 1.15;
    padding: 10px 0px 9px;
    background: rgb(243, 246, 251);
    font-weight: 500;
    text-align: left;
    color: rgb(102, 102, 102);
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
