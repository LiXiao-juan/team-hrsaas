<template>
  <el-dialog title="货到设置" :visible="visible" width="940px" @close="onClose">
    <div class="goods-box">
      <span class="vm-row">货道行数：{{ goodData.vmRow }}</span>
      <span class="vm-col">货道列数：{{ goodData.vmRow }}</span>
      <span class="channel-max-capacity"
        >货道容量（个）：{{ goodData.vmRow }}</span
      >

      <el-button
        type="primary"
        style="margin-right: 15px; background-color: #5f84ff"
        @click="$emit('sort')"
        >智能排货</el-button
      >
    </div>

    <el-carousel
      indicator-position="outside"
      :autoplay="false"
      arrow="always"
      @change="changePage"
    >
      <!-- 第一页 -->
      <el-carousel-item>
        <el-scrollbar style="height: 100%" wrap-class="scrollbar-wrapper">
          <el-row>
            <el-col
              :span="4.8"
              v-for="(item, index) in oneGoodsList"
              :key="index"
            >
              <div class="grid-content bg-purple">
                <!-- 左上角标签 -->
                <div class="label">{{ item.channelCode }}</div>
                <!-- 商品图片--商品名 -->
                <div class="good-pic">
                  <img
                    :src="(item.sku && item.sku.skuImage) || baseImg"
                    alt=""
                  />
                  <p>{{ (item.sku && item.sku.skuName) || "暂无商品" }}</p>
                </div>
                <div class="text">
                  <span>添加</span>
                  <el-button
                    class="del"
                    @click="delBtn(item)"
                    :disabled="!item.sku"
                    >删除</el-button
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-carousel-item>
      <!-- 第二页 -->
      <el-carousel-item>
        <el-scrollbar style="height: 100%" wrap-class="scrollbar-wrapper">
          <el-row>
            <el-col
              :span="4.8"
              v-for="(item, index) in twoGoodsList"
              :key="index"
            >
              <div class="grid-content bg-purple">
                <!-- 左上角标签 -->
                <div class="label">{{ item.channelCode }}</div>
                <!-- 商品图片--商品名 -->
                <div class="good-pic">
                  <img
                    :src="(item.sku && item.sku.skuImage) || baseImg"
                    alt=""
                  />
                  <p>{{ (item.sku && item.sku.skuName) || "暂无商品" }}</p>
                </div>
                <div class="text">
                  <span>添加</span>
                  <el-button class="del" @click="delBtn(item)" :disabled="!item.sku"
                    >删除</el-button
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-carousel-item>
    </el-carousel>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSave" class="confirmBtn"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { Scrollbar } from "element-ui";
export default {
  data() {
    return {
      oneGoodsList: [],
      twoGoodsList: [],
      delList: [],
      baseImg:
        "data:image/png;base64,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",
    };
  },
  components: {
    Scrollbar,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    goodData: {
      type: Object,
    },
  },
  created() {},
  computed: {},
  methods: {
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
    },
    // 保存
    onSave() {},

    // 切换事件
    changePage(index) {
      console.log(index);
    },
    // 处理父组件传递过来的数组
    setGoodsList(list) {
      // 第一页数据
      this.oneGoodsList = list.filter(
        (item) =>
          item.channelCode[item.channelCode.length - 1] <= 5 &&
          item.channelCode[item.channelCode.length - 1] !== "0"
      );
      // 第二页数据
      this.twoGoodsList = list.filter(
        (item) =>
          item.channelCode[item.channelCode.length - 1] > 5 ||
          item.channelCode[item.channelCode.length - 1] === "0"
      );
    },

    // 删除功能
    delBtn(item) {
      item.sku = null
      this.$emit('delGoods',item)
    },
  },
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item {
  padding: 0 30px;
}

::v-deep .el-dialog {
  border-radius: 10px;
}
::v-deep .el-dialog__title {
  font-size: 16px;
  font-weight: 600;
}
::v-deep .el-dialog .el-dialog__body .el-form-item .el-form-item__content {
  width: 396px;
  line-height: 36px;
}
::v-deep label {
  font-weight: normal;
}
.el-dialog .el-dialog__body .el-form-item:last-child {
  margin-bottom: 0;
}
.el-dialog .el-dialog__footer .dialog-footer {
  padding-top: 0;
  text-align: center;
}
.el-dialog .el-dialog__footer .dialog-footer .el-button + .el-button {
  margin-left: 34px !important;
}
.channel-max-capacity {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-left: 54px;
}
.cancleBtn {
  background-color: #fbf4f0 !important;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: none;
  color: #655b56 !important;
}

.confirmBtn {
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: none;
}
::v-deep .el-input-number {
  width: 360px;
  height: 36px;
}
::v-deep .el-input {
  width: 360px;
  height: 36px;
  margin-left: 30px;
}
::v-deep .el-dialog .el-dialog__body {
  padding: 20px 20px 30px;
  color: #666;
}
::v-deep .vm-config-channel-dialog-wrapper {
  position: relative;
  width: 847px;
  margin: 0 auto;
}
.goods-box {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 847px;
  height: 56px;
  margin-bottom: 16px;
  margin-left: 20px;
  background: #f3f6fb;
}
// 轮播图样式
.vm-row {
  margin-left: 40px;
}
.vm-col {
  margin-left: 55px;
}
::v-deep .el-col {
  width: 19%;
  height: 180px;
  margin-right: 7px;
  margin-bottom: 2px;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
}

::v-deep .el-carousel__arrow {
  background-color: unset;
  color: #d8dde3;
  font-size: 50px;
}
::v-deep .el-carousel__arrow--left {
  left: -10px;
}
::v-deep .el-carousel__arrow--right {
  right: -1px;
}
.good-pic {
  height: 135px;
  padding-top: 16px;
  background-color: #f6f7fb;
  border-radius: 4px;
  text-align: center;
  img {
    display: inline-block;
    width: 84px;
    height: 78px;
    margin-bottom: 10px;
    object-fit: contain;
  }
}
.text {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #5f84ff;
  span {
    cursor: pointer;
  }
  .del {
    color: #ff5e20;
  }
}
.bg-purple {
  position: relative;
  .label {
    position: absolute;
    top: 10px;
    left: 0;
    width: 43px;
    height: 23px;
    line-height: 23px;
    background: #829bed;
    border-radius: 0 10px 10px 0;
    font-size: 12px;
    text-align: center;
    color: #fff;
  }
}

// 隐藏下角切换
::v-deep .el-carousel__indicators--outside {
  display: none;
}

.scrollbar-wrapper {
  overflow-x: hidden !important;
}

::v-deep .el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: unset;
  color: #606266;
  text-align: center;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  font-size: 14px;
}
::v-deep .el-button:hover {
  background-color: unset;
}
</style>
