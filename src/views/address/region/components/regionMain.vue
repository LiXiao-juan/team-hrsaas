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
      </el-row>
      <template>
        <el-table :data="regionList" style="width: 100%" highlight-current-row>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="区域名称" width="330">
          </el-table-column>
          <el-table-column prop="nodeCount" label="点位数" width="330">
          </el-table-column>
          <el-table-column prop="remark" label="备注说明" width="330">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="index">
              <el-button type="primary" class="el-button--text"
                >查看详情</el-button
              >
              <el-button
                type="primary"
                class="el-button--text"
                @click.native="$emit('edit', index.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                class="el-button--text"
                style="color: rgb(255, 90, 90)"
                @click="onRemove(index.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import {delRegion} from '@/api/address'
export default {
  data() {
    return {};
  },
  props: {
    regionList: {
      type: Array,
    },
  },

  created() {},

  methods: {
    async onRemove(val){
      try {
        await this.$confirm('确定要删除吗', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRegion(val.id)
        this.$message.success('删除成功')
        this.$emit('remove')
      } catch (error) {
        this.$message.error('删除失败')
        console.log(error);
      }
    }
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
