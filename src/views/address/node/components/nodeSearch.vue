<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="点位搜索:">
          <el-input v-model="formData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="区域搜索:">
          <el-select v-model="formData.regionId" placeholder="请选择">
            <el-option
              v-for="item in regionlist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
export default {
  data() {
    return {
      formData: {
        name: "",
        regionId: "",
      },
    };
  },
  props: {
    regionlist: {
      type: Array,
    },
  },

  created() {},

  methods: {
    onSearch() {
      this.$emit("onSearch", this.formData);
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
