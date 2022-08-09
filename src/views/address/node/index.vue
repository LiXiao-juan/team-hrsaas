<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <nodeSearch :regionlist="regionlist" @onSearch="searchList" />
    <!-- 主体区域 -->
    <nodeMain
      v-model="loading"
      :nodeList="nodeData.currentPageRecords"
      @add="addDialog"
      @remove="getNodeList"
      @edit="editNode"
      @check="checkNode"
    />
    <!-- 分页区 -->
    <pagenation
      :listIsShow="listIsShow"
      :taskList="nodeData"
      v-if="nodeData.totalCount"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="getLastTaskService"
      @nextPage="getNextTaskService"
    />
    <!-- 新建弹窗 -->
    <addNode
      :visible.sync="addShowDialog"
      :regionlist="regionlist"
      :businessType="businessType"
      :ownerName="ownerName"
      @addSuccess="getNodeList"
      @editDilog="editDilog"
      ref="addnode"
    />
    <!-- 查看详情弹窗 -->
    <checkNodeItem
      :visible.sync="checkShowDialog"
      :nodeItemList="nodeItemList"
    />
  </div>
</template>

<script>
import {
  getNodeRegionList,
  getBusinessTypeList,
  getOwnerNameList,
  checkNodeApi,
} from "@/api/addressNode";
import { getNodeList } from "@/api/address";
import nodeSearch from "./components/nodeSearch.vue";
import nodeMain from "./components/nodeMain.vue";
import pagenation from "./components/pagination.vue";
import addNode from "./components/add-node.vue";
import checkNodeItem from "./components/check-node.vue";
export default {
  data() {
    return {
      nodeData: {}, //主体内容数据
      loading: false,
      addShowDialog: false, //控制添加弹窗
      regionlist: [], //所选区域下拉列表
      businessType: [], //商圈类型下拉列表
      ownerName: [], //归属合作商下拉列表
      nodeItemList: [], //查看详情列表数据
      checkShowDialog: false, //查看详情弹窗
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    nodeSearch,
    nodeMain,
    pagenation,
    addNode,
    checkNodeItem,
  },
  created() {
    this.getNodeList();
  },
  computed: {
    //控制列表数量显示隐藏
    listIsShow() {
      return !this.nodeData.currentPageRecords?.[0];
    },
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
    // 获取主体列表数据
    async getNodeList() {
      this.loading = true;
      const res = await getNodeList(this.params);
      const rel = await getNodeRegionList(1, 100);
      // console.log(rel.data);
      this.regionlist = rel.data.currentPageRecords;
      // console.log(res);
      this.nodeData = res.data;
      this.loading = false;
    },
    // 加载下一页
    async getNextTaskService() {
      this.params.pageIndex++;
      this.getNodeList();
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.getNodeList();
    },
    // 添加点位弹窗
    async addDialog() {
      this.addShowDialog = true;
      // 获取所有下拉列表数据
      const rel = await getNodeRegionList(1, 100);
      // console.log(rel.data);
      this.regionlist = rel.data.currentPageRecords;
      const bt = await getBusinessTypeList();
      // console.log(bt.data);
      this.businessType = bt.data;
      const on = await getOwnerNameList(1, 100);
      // console.log(on);
      this.ownerName = on.data.currentPageRecords;
    },
    // 修改点位传ID
    editNode(val) {
      this.addShowDialog = true;
      this.$refs.addnode.getNodeItem(val);
    },
    // 获取修改时的下拉列表
    async editDilog() {
      // 获取所有下拉列表数据
      const rel = await getNodeRegionList(1, 100);
      // console.log(rel.data);
      this.regionlist = rel.data.currentPageRecords;
      const bt = await getBusinessTypeList();
      // console.log(bt.data);
      this.businessType = bt.data;
      const on = await getOwnerNameList(1, 100);
      // console.log(on);
      this.ownerName = on.data.currentPageRecords;
    },
    // 获取查看详情数据
    async checkNode(val) {
      this.checkShowDialog = true;
      const res = await checkNodeApi(val.id);
      this.nodeItemList = res.data;
      // console.log(res);
    },
    // 点位查询
    searchList(val){
      this.params.name = val.name
      this.params.regionId = val.regionId
      this.getNodeList()
    },
    
  },
};
</script>

<style scoped></style>
