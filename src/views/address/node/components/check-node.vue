<template>
  <el-dialog
    title="点位详情"
    :visible="visible"
    width="630px"
    :before-close="onClose"
  >
    <el-form :model="formData">      
      <el-form-item >
        <el-table :data="nodeItemList" style="width: 100%" highlight-current-row empty-text="暂无数据" align="center">
          <el-table-column type="index" label="序号" width="80" algin="center">
          </el-table-column>
          <el-table-column prop="innerCode" label="机器编号" width="158" align="center">
          </el-table-column>
          <el-table-column prop="vmStatus" label="设备状态" :formatter="vmStatusType" width="158" align="center">
          </el-table-column>
          <el-table-column prop="lastSupplyTime" label="最后一次供货时间" :formatter="timeType" width="158" align="center">
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
    nodeItemList: {
      type: Array,
    },
    
  },

  methods: {
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
    },
    // 格式化设备状态
    vmStatusType(row,colum,index){
        return ["未投放","运营","","撤机"][index]
    },
    // 格式化时间
    timeType(row,colum,index){
        return index.replace("T"," ")
    }
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
