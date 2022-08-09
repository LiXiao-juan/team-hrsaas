<template>
  <div class="pagination-container">
    <div class="el-pagination is-background">
      <span class="el-pagination__total"
        >共{{ page.totalCount }}条记录&nbsp;&nbsp;第&nbsp;{{
          page.pageIndex
        }}/{{ page.totalPage }}&nbsp;页</span
      >
      <button
        type="button"
        :disabled="upDisabled"
        :class="{ btnDefault: !upDisabled, btnDisabled: upDisabled }"
        @click="pageUp"
      >
        <span>上一页</span>
      </button>
      <button
        type="button"
        :disabled="downDisabled"
        :class="{ btnDefault: !downDisabled, btnDisabled: downDisabled }"
        @click="pageDown"
      >
        <span>下一页</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /* 上一页按钮是否禁用和按钮样式 */
    upDisabled: {
      type: Boolean,
      default: false,
    },
    /* 下一页按钮是否禁用和按钮样式 */
    downDisabled: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    pageDown() {
      this.$emit("pageDown", "down");
    },
    pageUp() {
      this.$emit("pageUp", "up");
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  .el-pagination {
    display: flex;
    padding: 0;
    white-space: nowrap;
    color: #333;
    font-weight: 700;
    padding-right: 17px;
    .el-pagination__total {
      display: inline-block;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      vertical-align: top;
      box-sizing: border-box;
      -webkit-box-flex: 1;
      flex: 1;
      font-size: 16px !important;
      color: #dbdfe5 !important;
      margin-right: 10px;
      font-weight: 400;
      text-align: left;
      padding-left: 16px;
    }
    .btnDisabled {
      background: #edf0f9;
      color: #d8dde3;
      width: 70px;
      height: 32px;
      margin: 0 16px;
      border-radius: 2px;
      cursor: not-allowed;
    }
    .btnDefault {
      width: 70px;
      height: 32px;
      margin: 0 16px;
      border-radius: 2px;
      background-color: #d5ddf8;
      color: #606266;
      cursor: pointer;
    }
  }
}
</style>