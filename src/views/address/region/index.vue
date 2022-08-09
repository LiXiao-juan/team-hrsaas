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
      @check="checkDialog"
    />
    <!-- 分页 -->
    <pagenation
      :listIsShow="this.lastDisabled && this.rightDisabled"
      :taskList="regionData"
      v-if="regionData.totalCount"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="getLastTaskService"
      @nextPage="getNextTaskService"
    />
    <!-- 新建，修改弹窗 -->
    <addRegion
      :visible.sync="addShowDialog"
      @addSuccess="getRegionList"
      ref="addRegion"
    />
    <!-- 查看详情弹窗 -->
    <checkRegion
      :visible.sync="checkShowDialog"
      :checkList="checkList.currentPageRecords"
      :checkListName="checkListName"
    />
  </div>
</template>

<script>
import { getRegionList, checkRegionList } from "@/api/address";
import regionSearch from "./components/regionSearch.vue";
import regionMain from "./components/regionMain.vue";
import pagenation from "./components/pagination.vue";
import addRegion from "./components/add-region.vue";
import checkRegion from "./components/check-region.vue";
export default {
  data() {
    return {
      regionData: {}, //列表数据，页数等
      checkList: {}, //查看详情的详细数据
      checkListName: "", //查看详情的区域名称
      addShowDialog: false, //控制添加弹窗
      checkShowDialog: false, //查看详情弹窗
      loading: false,
      // 控制页数
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
    checkRegion,
  },

  computed: {
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.regionData.pageIndex <= 1;
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return (
        this.regionData.pageIndex == Math.ceil(this.regionData.totalCount / 10)
      );
    },
  },

  methods: {
    // 获取列表数据
    async getRegionList() {
      this.loading = true;
      const res = await getRegionList(this.params);
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
    async getNextTaskService() {
      this.params.pageIndex++;
      this.getRegionList();
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.getRegionList();
    },
    // 添加区域弹窗
    addDialog() {
      this.addShowDialog = true;
    },
    // 修改区域内容弹窗
    alterRegion(val) {
      this.addShowDialog = true;
      this.$refs.addRegion.getRegionId(val);
      // console.log(val);
    },
    // 查看详情弹窗
    async checkDialog(val) {
      this.checkShowDialog = true;
      // console.log(val);
      const res = await checkRegionList(1, 10, val.id);
      // console.log(res);
      // 获取区域名称
      this.checkListName = val.name;
      // 传递详情数据
      this.checkList = res.data;
    },
  },
};
</script>
