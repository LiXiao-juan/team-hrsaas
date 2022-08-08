<template>
  <div>
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="设备编号:">
          <el-input v-model="addressSearch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="onSearch"
            class="btnInquire"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { getVmList } from "@/api/vm";
export default {
  data() {
    return {
      addressSearch: "",
    };
  },
  created() {},
  methods: {
    onSearch() {
      if (this.addressSearch.trim()) {
        this.$emit("OnSearch", this.addressSearch.trim());
      } else {
        this.$emit("OnSearch", this.addressSearch.trim());
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  height: 64px;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__label {
    line-height: 36px;
  }
  ::v-deep .el-input__inner {
    padding-right: 30px;
    height: 36px;
    line-height: 36px;
  }
  .btnInquire {
    align-items: center;
    min-width: 80px;
    height: 36px;
    padding: 0;
    background-color: #5f84ff;
  }
  ::v-deep label {
    font-weight: normal;
  }
}
</style>
