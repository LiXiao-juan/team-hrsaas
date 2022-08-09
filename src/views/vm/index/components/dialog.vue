<template>
  <el-dialog :title="title" :visible="Visible" @close="$emit('closeEdit')">
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">
        机器编号：{{ device.innerCode }}
      </div></el-col
    >
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">
        提供时间：{{ device.createTime }}
      </div></el-col
    >
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">
        设备类型：{{ device.type && device.type.name }}
      </div></el-col
    >
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">
        设备容量：{{ device.type && device.type.channelMaxCapacity }}
      </div></el-col
    >
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">
        设备点位：
        <el-select v-model="address" placeholder="请选择活动区域">
          <el-option
            :label="item.name"
            :value="item.name"
            v-for="(item, index) in addressList"
            :key="index"
          ></el-option>
        </el-select></div
    ></el-col>
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">
        合作商：{{ device.ownerName }}
      </div></el-col
    >
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">
        所属区域：{{ device.region && device.region.name }}
      </div></el-col
    >
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">
        设备地址：{{ device.node && device.node.name }}
      </div></el-col
    >
    <center>
      <el-button @click="$emit('closeEdit')">取 消</el-button>
      <el-button
        type="primary"
        @click="onSave"
        style="background-color: #f4672f; border: unset"
        >确 定</el-button
      >
    </center>
  </el-dialog>
</template>

<script>
import { editNode } from "@/api/vm";
export default {
  components: {},
  data() {
    return {
      device: {},
      // 修改内部地址列表
      addressList: [],
      //
      address: "",
    };
  },
  props: {
    Visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "提示",
    },
  },
  created() {},
  methods: {
    // 设置修改的数据
    setEditData(val, list) {
      this.device = val;
      this.addressList = list;
      this.address = val.node.name;
    },

    // 确认修改---发送请求
    async onSave() {
      const id = this.device.id;
      try {
        await editNode(id, this.device.nodeId);
        this.$message.success("修改成功");
        this.$emit("closeEdit");
      } catch (error) {
        this.$message.warning(error.response.data);
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  border-radius: 10px;
  width: 630px;
}
</style>
