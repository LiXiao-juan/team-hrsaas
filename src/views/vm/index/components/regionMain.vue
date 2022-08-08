<template>
  <div>
    <div class="result">
      <el-row class="operation">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          class="addBtn"
          @click.native="$emit('add')"
          >新建</el-button
        >

        <el-button type="primary" class="batchBtn" @click.native="$emit('add')"
          >批量操作</el-button
        >
      </el-row>
      <template>
        <el-table :data="regionList" style="width: 100%" highlight-current-row>
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="innerCode" label="设备编号" width="210">
          </el-table-column>
          <el-table-column prop="type.name" label="设备型号" width="210">
          </el-table-column>
          <el-table-column prop="region.name" label="详细地址" width="210">
          </el-table-column
          ><el-table-column
            prop="vmStatus"
            label="设备状态"
            :formatter="statusFn"
            width="210"
          >
          </el-table-column>
          <el-table-column prop="ownerName" label="合作商" width="210">
          </el-table-column>

          <el-table-column label="操作" width="210">
            <template slot-scope="scope">
              <el-button type="primary" class="el-button--text" @click="cargo"
                >货道</el-button
              >
              <el-button
                type="primary"
                class="el-button--text"
                @click.native="$emit('edit', scope.row)"
                >策略</el-button
              >
              <el-button
                type="danger"
                class="el-button--text"
                style="color: #5f84ff"
                @click="onEdit(scope.row)"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <Dialog :Visible="editVisible" title="修改设备" @closeEdit="closeEdit">
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">123</div
        ></el-col>
      </Dialog>
    </div>
  </div>
</template>

<script>
// import {delRegion} from '@/api/address'
import Dialog from "./dialog.vue";
export default {
  data() {
    return {
      editVisible: true,
    };
  },
  props: {
    regionList: {
      type: Array,
    },
  },
  created() {},
  components: {
    Dialog,
  },
  methods: {
    onEdit(val) {
      console.log(val);
    },

    // 格式化状态
    statusFn(a, b, index) {
      return { 0: "未投放", 1: "运营", 3: "撤机" }[index];
    },

    // 修改-----
    onEdit() {
      this.editVisible = true;
    },

    // 关闭修改弹框
    closeEdit() {
      this.editVisible = false;
    },
    // 货道
    cargo() {
      console.log(11);
    },
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .operation {
    margin-bottom: 20px;
    display: flex;
    .batchBtn {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      color: #000;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 80px !important;
      height: 36px;
      padding: 0;
      background: #f3e7e1 !important;
      border: none;
    }
    .addBtn {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
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
  .el-button--text {
    border-color: transparent;
    color: #5f84ff;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
  }
  ::v-deep .el-button--danger-text {
    color: rgb(255, 90, 90);
  }
  ::v-deep .el-table td {
    height: 44px;
    padding: 2px 0px;
    text-align: left;
    color: rgb(102, 102, 102);
  }
  .el-table::before {
    height: 0;
  }
}
</style>
