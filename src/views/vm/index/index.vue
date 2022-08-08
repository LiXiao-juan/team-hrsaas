<template>
  <div class="app-container">
    <!-- 头部搜索区域 -->
    <regionSearch @OnSearch="OnSearch" />
    <!-- 主题内容区域 -->
    <regionMain :regionList="regionData.currentPageRecords" />
    <!-- 分页 -->
    <pagenation
      :page="regionData"
      :upDisabled="upDisabled"
      :downDisabled="downDisabled"
    />
    <!-- 新建，修改弹窗 -->
    <addRegion ref="addRegion" />
  </div>
</template>

<script>
import { getVmList } from "@/api/vm";
import regionSearch from "./components/regionSearch.vue";
import regionMain from "./components/regionMain.vue";
import pagenation from "./components/pagination.vue";
import addRegion from "./components/add-region.vue";
export default {
  data() {
    return {
      regionData: {}, //列表数据，页数等
      addShowDialog: false, //控制添加弹窗
      upDisabled: true, //禁用上一页
      downDisabled: false, //禁用下一页
      loading: false,
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    // 进入页面调用
    this.getVmList();
  },
  components: {
    regionSearch,
    regionMain,
    pagenation,
    addRegion,
  },
  computed: {},
  methods: {
    // 获取售货机列表
    async getVmList() {
      const { data } = await getVmList(this.params);
      this.regionData = data;
    },

    // 搜索功能
    async OnSearch(val) {
      console.log(val);
      const { data } = await getVmList({
        innerCode: val,
      });
      this.$message.success("查询成功");
      this.regionData.currentPageRecords = data.currentPageRecords;
    },
  },
};
</script>
