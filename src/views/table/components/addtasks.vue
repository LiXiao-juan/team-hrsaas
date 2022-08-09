<template>
  <div>
    <!-- Form -->
    <el-dialog title="新增工单" :visible="Visible" width="50%" @close="close">
      <!-- 表单区域 -->
      <el-form :model="formData" :rules="formDataRules" ref="form">
        <el-form-item
          label="设备编号:"
          :label-width="formLabelWidth"
          prop="innerCode"
        >
          <el-input
            style="width: 70%"
            show-word-limit
            maxlength="15"
            v-model="formData.innerCode"
            placeholder="请输入"
            autocomplete="off"
            @input="getPeople"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="工单类型:"
          prop="productType"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="formData.productType"
            :value="typeName"
            placeholder="请选择"
            style="width: 70%"
          >
            <el-option
              v-for="item in taskType"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 补货数量 -->
        <el-form-item
          label="补货数量:"
          :label-width="formLabelWidth"
          v-if="isRepertoire"
        >
          <span class="Replenish" @click="toInventory">
            <i class="el-icon-document"></i>
            补货清单
          </span>
        </el-form-item>
        <!-- 运营人员 -->
        <el-form-item
          label="运营人员:"
          :label-width="formLabelWidth"
          prop="userId"
        >
          <el-select
            v-model="formData.userId"
            placeholder="请选择"
            style="width: 70%"
          >
            <el-option
              :label="item.userName"
              :value="item.userId"
              v-for="item in people"
              :key="item.userId"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 备注 -->
        <el-form-item label="备注:" :label-width="formLabelWidth" prop="desc">
          <el-input
            size="medium"
            show-word-limit
            maxlength="40"
            type="textarea"
            style="width: 70%"
            v-model="formData.desc"
            placeholder="请输入备注（不超过40字）"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.popup = false">取 消</el-button>
        <el-button type="primary" @click="postTask">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 补货清单弹框 -->
    <inventory :isShowInTask="isShowInTask" title="补货详情">
      <!-- 补货清单表格区域 -->
      <el-table :data="inTaskList" stripe style="width: 150%" height="450">
        <el-table-column
          v-for="(item, index) in renderTaskData"
          :key="index"
          :prop="item.key"
          :label="item.title"
          width="180"
        >
        </el-table-column>
      </el-table>
    </inventory>
  </div>
</template>

<script>
import {
  createTask,
  getTaskType,
  getSupplyAlertValue,
  getTaskDetails,
} from "@/api/tickets";
import inventory from "@/views/table/components/inventory.vue";
import { getOperatorList } from "@/api/user-tickets";
export default {
  name: "addTask",
  components: {},
  data() {
    return {
      // 补货清单弹框
      inTaskList: [],
      isShowInTask: false,
      // form对象
      formData: {
        innerCode: "",
        createType: 1,
        productType: "",
        desc: "",
        userId: "",
      },
      // 用于循环渲染补货清单的数组
      renderTaskData: [
        { title: "货道编号", key: "channelCode" },
        { title: "商品名称", key: "sku.brandName" },
        { title: "当前数量", key: "currentCapacity" },
        { title: "还可添加", key: "channelCode" },
        { title: "铺满数量", key: "channelCode" },
      ],
      typeName: "",
      people: [],
      taskList: [],
      taskType: [],
      warn: "",

      // 校验规则
      formDataRules: {
        innerCode: [
          {
            required: true,
            message: "请输入设备编号",
            trigger: "blur",
          },
        ],
        productType: [
          {
            required: true,
            message: "请选择工单类型",
            trigger: "blur",
          },
        ],
        // 人员
        userId: [
          {
            required: true,
            message: "请选择运营人员",
            trigger: "blur",
          },
        ],
        // 备注
        desc: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "200px",
    };
  },
  components: {
    inventory,
  },
  props: {
    Visible: {
      type: Boolean,
      default: false,
    },
    isRepertoire: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.getSupplyAlertValue();
  },
  methods: {
    // 发送新增工单请求
    async postTask() {
      // console.log(this.$refs.form);
      this.$refs.form.validate();
      try {
        console.log(this.formData);
        await createTask(this.formData);
        this.formData = {
          innerCode: "",
          productType: "",
          desc: "",
          createType: 1,
          userId: "",
        };
      } catch (error) {
        console.log(error);
        this.$message.warning(error.message);
      } finally {
      }
      // this.$parent.popup = false;
    },
    // 获取预警值
    async getSupplyAlertValue() {
      const { data } = await getSupplyAlertValue();
      this.warn = data;
    },
    // 获取类型
    getTaskType() {
      setTimeout(async () => {
        const { data } = await getTaskType(this.warn);
        this.taskType = data;
      }, 200);
    },

    // 获取人员
    async getPeople() {
      if (this.formData.innerCode !== "") {
        const { data } = await getOperatorList(this.formData.innerCode);
        this.people = data;
      } else {
        return this.$message.warning("请输入设备编号");
      }
    },
    close() {
      this.$parent.popup = false;
      this.$refs.form.resetFields();
      this.formData = {
        innerCode: "",
        productType: "",
        desc: "",
        createType: 1,
        userId: "",
      };
    },

    // 数据重现
    repeatData(info) {
      setTimeout(() => {
        // console.log(info);
        this.formData.innerCode = info.innerCode;
        // this.formData.productType = info.productType;
        this.formData.desc = info.desc;
        this.formData.userId = info.userId;
        this.typeName = "123";
        this.getSupplyAlertValue();
        this.getPeople();
        this.getTaskType();
      }, 200);
    },

    // 补货清单
    toInventory() {
      // 表单单项校验
      this.$refs.form.validateField("innerCode");
      // 若无运维人员---输入的设备编码无效
      if (!this.people.length) return this.$message.error("无此设备编号");
      // ------有运维人员---可以去补货清单
      this.isShowInTask = true;
      // 调用获取补货列表的方法
      this.getTaskDetails();
    },
    // 获取补货列表
    async getTaskDetails() {
      const { data } = await getTaskDetails(this.formData.innerCode);
      this.inTaskList = data;
    },
  },
};
</script>

<style scoped lang="scss">
.Replenish {
  font-size: 15px;
  color: #6286ff;
  cursor: pointer;
}
::v-deep .el-dialog {
  border-radius: 10px;
}
</style>
