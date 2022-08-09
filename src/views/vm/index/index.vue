<template>
  <div class="app-container">
    <!-- 头部搜索区域 -->
    <regionSearch @OnSearch="searchList" />
    <!-- 主题内容区域 -->
    <regionMain
      :regionList="regionData.currentPageRecords"
      @add="addDialog"
      v-model="loading"
      @edit="alterRegion"
      @remove="getRegionList"
    />
    <!-- 分页 -->
    <pagenation
      :page="regionData"
      :upDisabled="upDisabled"
      :downDisabled="downDisabled"
      @pageDown="pageDown"
      @pageUp="pageUp"
    />
    <!-- 新建，修改弹窗 -->
    <addRegion
      :visible.sync="addShowDialog"
      @addSuccess="getRegionList"
      ref="addRegion"
    />
  </div>
</template>

<script>
import { getRegionList } from "@/api/address";
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
    this.getRegionList();
  },
  components: {
    regionSearch,
    regionMain,
    pagenation,
    addRegion,
  },
  computed: {
    // upDisabled() {
    //   if (this.regionData.pageIndex === 1) return true;
    // },
    // downDisabled() {
    //   return this.regionData.pageIndex === this.regionData.totalPage;
    // },
  },
  methods: {
    // 获取列表数据
    async getRegionList() {
      this.loading = true;
      const res = await getRegionList();
      // console.log(res);
      this.regionData = res.data;
      this.loading = false;
    },
    // 区域搜索
    async searchList(val) {
      this.params.name = val;
      const res = await getRegionList(this.params);
      this.regionData.currentPageRecords = res.data.currentPageRecords;
      console.log(res);
    },
    // 加载下一页
    async pageDown() {
      const res = await getRegionList(this.params);
      console.log(res);
    },
    // 加载上一页
    async pageUp() {
      if (this.upDisabled) return true;
      const res = await getRegionList(this.params);
      console.log(res);
    },
    // 添加区域弹窗
    addDialog() {
      this.addShowDialog = true;
    },
    // 修改区域内容弹窗
    alterRegion(val) {
      this.addShowDialog = true;
      this.$refs.addRegion.getRegionId(val);
    },
  },
};
</script>
