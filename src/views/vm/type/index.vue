<template>
  <div class="app-container">
    <!-- 头部搜索区域 -->
    <typeSearch @OnSearch="typeSearchItem" />
    <!-- 主体内容 -->
    <typeMain
      :vmTypeListData="vmTypeListData.currentPageRecords"
      @add="addTypeItem"
      @edit="editTypeItem"
      @remove="getVmTypeList"
    />
    <!-- 底部分页 -->
    <pagenation
      :listIsShow="this.lastDisabled && this.rightDisabled"
      :taskList="vmTypeListData"
      v-if="vmTypeListData.totalCount"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="getLastTaskService"
      @nextPage="getNextTaskService"
    />
    <!-- 新建弹窗 -->
    <addDilog :visiable.sync="isShowAddDilog" @addSuccess="getVmTypeList" ref="addDilog" />
  </div>
</template>

<script>
import { getVmTypeList } from "@/api/vmType";
import typeSearch from "./components/typeSearch.vue";
import typeMain from "./components/typeMain.vue";
import pagenation from "./components/pagination.vue";
import addDilog from "./components/addDilog.vue";
export default {
  data() {
    return {
      vmTypeListData: {}, //主体列表内容
      isShowAddDilog: false, //新建弹窗
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    typeSearch,
    typeMain,
    pagenation,
    addDilog,
  },
  created() {
    this.getVmTypeList();
  },
  computed: {
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.vmTypeListData.pageIndex <= 1;
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return (
        this.vmTypeListData.pageIndex ==
        Math.ceil(this.vmTypeListData.totalCount / 10)
      );
    },
  },
  methods: {
    // 获取主体列表数据渲染
    async getVmTypeList() {
      const { data } = await getVmTypeList(this.params);
      // console.log(data);
      this.vmTypeListData = data;
    },
    // 加载下一页
    async getNextTaskService() {
      this.params.pageIndex++;
      this.getVmTypeList();
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.getVmTypeList();
    },
    // 头部搜索
    typeSearchItem(val) {
      this.params.name = val;
      this.getVmTypeList();
    },
    // 新建设备类型
    addTypeItem() {
      this.isShowAddDilog = true;
    },
    // 修改售货机类型,传ID
    editTypeItem(val){
      this.isShowAddDilog = true
      this.$refs.addDilog.getTypeItemId(val)
    }
  },
};
</script>
