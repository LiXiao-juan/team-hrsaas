<template>
  <div class="app-container">
    <!-- 头部搜索区域 -->
    <regionSearch @OnSearch="OnSearch" />
    <!-- 主题内容区域 -->
    <regionMain
      :regionList="nodeData.currentPageRecords"
      @add="showAdd"
      @goods="showGoods"
    />
    <!-- 分页 -->
    <pagenation
      :listIsShow="this.lastDisabled && this.rightDisabled"
      :taskList="nodeData"
      v-if="nodeData.totalCount"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="getLastTaskService"
      @nextPage="getNextTaskService"
    />
    <!-- 新建，修改弹窗 -->
    <addRegion
      ref="addRegion"
      :visible.sync="addShowDialog"
      :typeList="typeList"
      :addressList="addressList"
    />
    <!-- 货道，弹框 -->
    <GoodSetting
      ref="goodSetting"
      :visible.sync="goodShowDialog"
      :goodData="goodData"
      @sort="showSort"
    />

    <!-- 智能排货 -->
    <Sort :visible.sync="sortShowDialog"></Sort>
  </div>
</template>

<script>
import {
  getVmList,
  getVmType,
  editVmList,
  vmTypeInfo,
  getVmInfo,
} from "@/api/vm";
import Sort from "./components/sort.vue";
import regionSearch from "./components/regionSearch.vue";
import regionMain from "./components/regionMain.vue";
import pagenation from "./components/pagination-new.vue";
import addRegion from "./components/add-region.vue";
import GoodSetting from "./components/goods-setting.vue";
export default {
  name: "Vm",
  data() {
    return {
      nodeData: {}, //列表数据，页数等
      addShowDialog: false, //控制添加弹窗
      goodShowDialog: false, // 货道弹框
      goodData: {},
      loading: false,
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
      typeList: [],
      addressList: [],
      sortShowDialog: false,
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
    GoodSetting,
    Sort,
  },
  computed: {
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.nodeData.pageIndex <= 1;
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return (
        this.nodeData.pageIndex == Math.ceil(this.nodeData.totalCount / 10)
      );
    },
  },
  methods: {
    // 加载下一页
    async getNextTaskService() {
      this.params.pageIndex++;
      this.getVmList();
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.getVmList();
    },
    // 获取售货机列表
    async getVmList() {
      const { data } = await getVmList(this.params);
      this.nodeData = data;
    },
    // 货道
    async showGoods(val) {
      this.$store.state.tickets
      // 发起货道信息
      const { data } = await vmTypeInfo(val.type.typeId);
      // 发起获取所有货物的请求
      const res = await getVmInfo(val.innerCode);
      // 赋值数据传递给子组件
      this.goodData = data;
      this.$refs.goodSetting.setGoodsList(res.data);
      // 弹框显示
      this.goodShowDialog = true;
    },
    // 搜索功能
    async OnSearch(val) {
      console.log(val);
      const { data } = await getVmList({
        innerCode: val,
      });
      console.log(data);
      this.$message.success("查询成功");
      this.nodeData.currentPageRecords = data.currentPageRecords;
    },
    // 智能排货弹框
    showSort() {
      this.sortShowDialog = true;
    },

    // 展示新增
    async showAdd() {
      const { data } = await getVmType();
      const res = await editVmList();
      this.addressList = res.data.currentPageRecords;
      this.typeList = data.currentPageRecords;
      this.addShowDialog = true;
    },
  },
};
</script>
