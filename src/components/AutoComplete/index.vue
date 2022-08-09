<template>
  <el-select v-model="value" clearable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.roleId"
      :label="item.roleName"
      :value="item.roleId"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-input__inner {
  width: 206px;
  height: 36px;
}
::v-deep .el-input__suffix {
  line-height: 36px;
}
</style>
