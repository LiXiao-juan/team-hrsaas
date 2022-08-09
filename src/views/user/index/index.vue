<template>
  <div class="business-container">
    <div class="business-search">
      <span>人员搜索:</span><InputField ref="inputContent" /><CustomButton
        class="btn"
        iconType="el-icon-search"
        @click.native="searchFn"
        >查询</CustomButton
      >
    </div>
    <div class="business-result">
      <CustomButton
        iconType="el-icon-circle-plus-outline"
        :styles="newButton"
        @click.native="addInfo"
        >新建</CustomButton
      >
    </div>
    <el-table
      :data="personnelListData.currentPageRecords"
      style="width: 100%; padding-left: 17px; padding-right: 17px"
      :cell-style="{ padding: '3px 0px ', border: 0 }"
      :header-cell-style="{ background: 'rgb(243, 246, 251)' }"
      class="table"
    >
      <el-table-column
        label="序号"
        width="80"
        type="index"
        :index="table_index"
      >
      </el-table-column>
      <el-table-column prop="userName" label="人员名称" width="365">
      </el-table-column>
      <el-table-column prop="regionName" label="归属区域" width="365">
      </el-table-column>
      <el-table-column prop="role.roleName" label="角色" width="365">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="365">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="medium"
            style="color: #5f84ff"
            @click="editInfo(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="medium"
            style="color: #ff5a5a"
            @click="delInfo(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-if="personnelListData.totalPage > 1"
      :page="personnelListData"
      :upDisabled="upDisabled"
      :downDisabled="downDisabled"
      @pageDown="getPersonnelList"
      @pageUp="getPersonnelList"
    />
    <FormDialog
      ref="dialog"
      :roleList="roleList"
      :regionList="regionList"
      :title="title"
      :currentId="currentId"
    />
  </div>
</template>

<script>
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import Pagination from "@/components/Pagination";
import FormDialog from "@/views/user/components/FormDialog";
import {
  getPersonnelList,
  getRegionList,
  getRoleList,
  getPersonnel,
  delPersonnel,
} from "@/api/personnel";
export default {
  components: {
    InputField,
    CustomButton,
    Pagination,
    FormDialog,
  },
  data() {
    return {
      /* 新建按钮样式 */
      newButton: {
        backgroundColor: "#ff7d33",
        border: "none",
      },
      personnelListData: {},
      /* 获取列表数据携带参数 */
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
      /* 控制上下页按钮样式 */
      upDisabled: false,
      downDisabled: false,
      /* 实现分页 */
      pageParams: {
        page: 1,
        pagesize: 10,
      },
      /* 角色列表 */
      roleList: [],
      /* 区域列表 */
      regionList: [],
      paramsRegion: {
        pageIndex: 1,
        pageSize: 100000,
      },
      title: "",
      /* 选中行人员id */
      currentId: "",
    };
  },
  created() {
    /* 获取人员列表 */
    this.getPersonnelList();
  },
  methods: {
    /* 获取人员列表 */
    async getPersonnelList(val) {
      try {
        if (val === "down") {
          this.params.pageIndex = parseInt(this.params.pageIndex) + 1;
          const res = await getPersonnelList(this.params);
          this.personnelListData = res.data;
        } else if (val === "up") {
          this.params.pageIndex = parseInt(this.params.pageIndex) - 1;
          const res = await getPersonnelList(this.params);
          this.personnelListData = res.data;
        } else {
          const res = await getPersonnelList(this.params);
          this.personnelListData = res.data;
        }
        if (
          this.params.pageIndex === parseInt(this.personnelListData.totalPage)
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
      this.getPersonnelList(this.params);
    },
    /* 获取角色列表 */
    async getRoleList() {
      try {
        const res = await getRoleList();
        this.roleList = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    /* 获取区域列表 */
    async getRegionList() {
      try {
        const res = await getRegionList(this.paramsRegion);
        this.regionList = res.data.currentPageRecords;
        console.log(this.regionList);
      } catch (error) {}
    },
    /* 新增人员信息 */
    addInfo() {
      this.title = "新增人员";
      this.getRoleList();
      this.getRegionList();
      this.$nextTick(() => {
        this.$refs.dialog.form = {
          userName: "",
          roleId: "",
          mobile: "",
          regionId: "",
          regionName: "",
          image: "",
          status: false,
        };
      });
      this.$refs.dialog.dialogFormVisible =
        !this.$refs.dialog.dialogFormVisible;
    },
    /* 编辑人员信息回显 */
    async editInfo(index, row) {
      try {
        this.title = "编辑人员";
        this.currentId = row.id;
        this.$nextTick(() => {
          this.$refs.dialog.form = {
            userName: "",
            roleId: "",
            mobile: "",
            regionId: "",
            regionName: "",
            image: "",
            status: false,
          };
        });
        await this.getRoleList();
        await this.getRegionList();
        const res = await getPersonnel(row.id);
        this.$refs.dialog.form = res.data;
        this.$refs.dialog.dialogFormVisible =
          !this.$refs.dialog.dialogFormVisible;
      } catch (error) {}
    },
    /* 删除人员信息 */
    async delInfo(index, row) {
      try {
        await delPersonnel(row.id);
        this.getPersonnelList();
      } catch (error) {
        console.log(error);
      }
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
  &-result {
    display: flex;
    -webkit-box-align: center;
    background-color: #fff;
    height: 76px;
    padding: 20px 17px;
    .business-button {
      margin-left: 10px;
    }
  }
}
</style>
