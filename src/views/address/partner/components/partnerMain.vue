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
          :data="partnerData"
          style="width: 100%"
          highlight-current-row
          empty-text="暂无数据"
        >
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="合作商名称" width="160">
          </el-table-column>
          <el-table-column prop="account" label="账号" width="160">
          </el-table-column>
          <el-table-column prop="vmCount" label="设备数量" width="160">
          </el-table-column>
          <el-table-column
            prop="ratio"
            label="分成比例"
            :formatter="ratioType"
            width="160"
          >
          </el-table-column>
          <el-table-column prop="contact" label="联系人" width="160">
          </el-table-column>
          <el-table-column prop="mobile" label="联系电话" width="160">
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="index">
              <el-button
                type="primary"
                class="el-button--text"
                @click=onRest(index.row)
                >重置密码</el-button
              >
              <el-button
                type="primary"
                class="el-button--text"
                @click.native="$emit('check', index.row)"
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
import {delPartnerItemApi,restPartnerItemApi} from '@/api/addressPartner'
export default {
  data() {
    return {};
  },
  props: {
    partnerData: {
      type: Array,
    },
  },

  created() {},

  methods: {
    // 重置密码
    async onRest(val){
        try {
        await this.$confirm('确定要重置吗', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await restPartnerItemApi(val.id)
        this.$message.success('重置成功')
        this.$emit('Rest')
      } catch (error) {
        this.$message.error('重置失败')
      }        
    },
    // 删除
    async onRemove(val){        
      try {
        await this.$confirm('确定要删除吗', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delPartnerItemApi(val.id)
        this.$message.success('删除成功')
        this.$emit('remove')
      } catch (error) {
        this.$message.error('删除失败')
        console.log(error);
      }
    },
    // 分成比例的显示类型
    ratioType(row,colum,index){
        return `${index}%`
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
