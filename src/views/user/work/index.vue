<template>
  <div class="business-container">
    <div class="business-search">
      <span>人员搜索:</span><InputField ref="inputContent" /><span>角色：</span
      ><AutoComplete :options="roleList" ref="AutoComplete" /><CustomButton
        class="btn"
        iconType="el-icon-search"
        @click.native="searchFn"
        >查询</CustomButton
      >
    </div>
    <el-table
      :data="userWorkListData.currentPageRecords"
      style="
        width: 100%;
        padding-left: 17px;
        padding-right: 17px;
        padding-top: 20px;
      "
      :cell-style="{ padding: '3px 0px ', border: 0 }"
      :header-cell-style="{ background: 'rgb(243, 246, 251)' }"
      empty-text="暂无数据"
      class="table"
    >
      <el-table-column
        label="序号"
        width="80"
        type="index"
        :index="table_index"
      >
      </el-table-column>
      <el-table-column prop="userName" label="人员名称" width="250">
      </el-table-column>
      <el-table-column prop="roleName" label="角色" width="250">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="250">
      </el-table-column>
      <el-table-column prop="workCount" label="完成工单（本月）" width="250">
      </el-table-column>
      <el-table-column prop="progressTotal" label="进行中工单" width="250">
      </el-table-column>
      <el-table-column prop="total" label="拒绝工单（本月）" width="250">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="medium"
            style="color: #5f84ff"
            @click="viewDetails(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-if="userWorkListData.totalPage > 1"
      :page="userWorkListData"
      :upDisabled="upDisabled"
      :downDisabled="downDisabled"
      @pageDown="getUserWorkList"
      @pageUp="getUserWorkList"
    />
    <FormDialog ref="dialog" />
  </div>
</template>

<script>
import InputField from "@/components/InputField";
import AutoComplete from "@/components/AutoComplete";
import CustomButton from "@/components/CustomButton";
import Pagination from "@/components/Pagination";
import FormDialog from "./components/FormDialog";
import { getRoleList, getPersonnel } from "@/api/personnel";
import { getUserWorkList } from "@/api/user-work";
export default {
  components: {
    InputField,
    AutoComplete,
    CustomButton,
    Pagination,
    FormDialog,
  },
  data() {
    return {
      /* 角色列表 */
      roleList: [],
      /* 获取列表所需参数 */
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
      /* 工作量列表 */
      userWorkListData: [],
    };
  },
  created() {
    this.getRoleList();
    this.getUserWorkList();
  },
  methods: {
    /* 获取角色列表 */
    async getRoleList() {
      try {
        const res = await getRoleList();
        this.roleList = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    /* 获取工作量列表 */
    async getUserWorkList(val) {
      try {
        if (val === "down") {
          this.params.pageIndex = parseInt(this.params.pageIndex) + 1;
          const res = await getUserWorkList(this.params);
          this.userWorkListData = res.data;
        } else if (val === "up") {
          this.params.pageIndex = parseInt(this.params.pageIndex) - 1;
          const res = await getUserWorkList(this.params);
          this.userWorkListData = res.data;
        } else {
          const res = await getUserWorkList(this.params);
          this.userWorkListData = res.data;
        }
        if (
          this.params.pageIndex === parseInt(this.userWorkListData.totalPage)
        ) {
          this.downDisabled = true;
          this.upDisabled = false;
        } else if (this.params.pageIndex === 1) {
          this.downDisabled = false;
          this.upDisabled = true;
        } else {
          this.downDisabled = false;
          this.upDisabled = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    table_index(index) {
      return index + (this.params.pageIndex - 1) * this.params.pageSize + 1;
    },
    /* 根据条件筛选 */
    searchFn() {
      this.params.userName = this.$refs.inputContent.input;
      this.params.roleId = this.$refs.AutoComplete.value;
      this.getUserWorkList(this.params);
    },
    /* 查看详情 */
    async viewDetails(index, row) {
      this.$refs.dialog.dialogTableVisible = true;
      const res = await getPersonnel(row.userId);
      this.$refs.dialog.detailInfo = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.business {
  &-container {
    margin: 12px 20px 20px;
    padding-top: 20px;
    text-align: center;
  }
  &-search {
    display: flex;
    -webkit-box-align: center;
    height: 64px;
    background-color: #fff;
    line-height: 64px;
    margin-bottom: 20px;
    // align-items: center;
    span {
      padding: 0 17px;
      font-size: 14px;
      color: #606266;
    }
    .btn {
      margin-left: 10px;
    }
  }
}
</style>
