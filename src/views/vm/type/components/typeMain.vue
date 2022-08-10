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
        <el-table
          :data="vmTypeListData"
          style="width: 100%"
          highlight-current-row
          empty-text="暂无数据"
        >
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="型号名称" width="180">
          </el-table-column>
          <el-table-column prop="model" label="型号编号" width="180">
          </el-table-column>
          <el-table-column label="设备图片" width="180">
            <template slot-scope="scope">
              <img
                :src="scope.row.image"
                class="vm-type-image"
                v-imgError="defaultImg"
              />
            </template>
          </el-table-column>
          <el-table-column prop="vmRow" label="货道行" width="180">
          </el-table-column>
          <el-table-column prop="vmCol" label="货道列" width="180">
          </el-table-column>
          <el-table-column prop="channelMaxCapacity" label="设备容量" width="180">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="index">
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
import { delVmTypeList } from "@/api/vmType";
export default {
  data() {
    return {
        defaultImg:
        "https://img2.baidu.com/it/u=861943924,2838283407&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    };
  },
  props: {
    vmTypeListData: {
      type: Array,
    },
  },

  created() {},

  methods: {
    // 删除
    async onRemove(val) {
      try {
        await this.$confirm("确定要删除吗", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        });
        await delVmTypeList(val.typeId);
        this.$message.success("删除成功");
        this.$emit("remove");
      } catch (error) {
        this.$message.error("删除失败");
        console.log(error);
      }
    },
    // 分成比例的显示类型
    ratioType(row, colum, index) {
      return `${index}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;

  .vm-type-image{
    display: block;
    width: 24px;
    height: 24px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
    background: #f3f6fb;
    border: 1px solid #f3f6fb;
  }

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
