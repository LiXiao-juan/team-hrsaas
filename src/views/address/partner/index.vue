<template>
  <div class="app-container">
    <!-- 头部搜索区域 -->
    <partnerSearch @OnSearch="searchPartnerItem" />
    <!-- 主体内容区域 -->
    <partnerMain
      :partnerData="partnerData.currentPageRecords"
      @add="addPartnerItem"
      @edit="editPartnerItem"
      @remove="getPartnerList"
      @check="checkPartnerItem"
      @Rest="getPartnerList"
    />
    <!-- 分页区域 -->
    <pagenation
      :listIsShow="this.lastDisabled && this.rightDisabled"
      :taskList="partnerData"
      v-if="partnerData.totalCount"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="getLastTaskService"
      @nextPage="getNextTaskService"
    />
    <!-- 添加，修改弹窗 -->
    <addPartnerDilog
      :visible.sync="isShowAddPartner"
      @addSuccess="getPartnerList"
      ref="addPartnerDilog"
      
    />
    <!-- 重置密码弹窗 -->
    <!-- 查看详情弹窗 -->
    <checkPartnerDilog :visible.sync="checkShowDialog" :checkPartnerItemList="checkPartnerItemList" />
  </div>
</template>

<script>
import { getPartnerList } from "@/api/addressPartner";
import partnerMain from "./components/partnerMain";
import partnerSearch from "./components/partnerSearch.vue";
import pagenation from "./components/pagination.vue";
import addPartnerDilog from "./components/add-partner.vue";
import checkPartnerDilog from "./components/check-partner.vue";
export default {
  data() {
    return {
      partnerData: {}, //主体内容区域数据
      checkPartnerItemList:{},
      isShowAddPartner: false, //添加弹窗显示隐藏
      checkShowDialog:false,
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    partnerSearch,
    partnerMain,
    pagenation,
    addPartnerDilog,
    checkPartnerDilog
  },

  created() {
    this.getPartnerList();
  },
  computed: {
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.partnerData.pageIndex <= 1;
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return (
        this.partnerData.pageIndex ==
        Math.ceil(this.partnerData.totalCount / 10)
      );
    },
  },
  methods: {
    // 获取主体区域数据并渲染
    async getPartnerList() {
      const { data } = await getPartnerList(this.params);
      //  console.log(data);
      this.partnerData = data;
    },
    // 加载下一页
    async getNextTaskService() {
      this.params.pageIndex++;
      this.getPartnerList();
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.getPartnerList();
    },
    // 合作商查询
    async searchPartnerItem(val) {
      this.params.name = val;
      this.getPartnerList();
    },
    // 添加弹窗
    addPartnerItem() {
      this.isShowAddPartner = true;
    },
    // 修改合作商
    editPartnerItem(val){
      this.isShowAddPartner = true;
      this.$refs.addPartnerDilog.getPartnerItem(val)
    },
    // 查看详情
    checkPartnerItem(val){
      this.checkShowDialog = true
      this.checkPartnerItemList = val
    }
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  margin-top: 10px;
}
</style>
