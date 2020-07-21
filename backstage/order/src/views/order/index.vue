<template>
  <div :class="classObj" class="adminUser">
    <div class="main-container">
      <OrderForm :device="device" :dialogState="formState" ref="contentFrom"></OrderForm>
      <el-row class="dr-datatable">
        <el-col :span="24">
          <TopBar type="order" :pageInfo="orderList.pageInfo"></TopBar>
          <DataTable :pageInfo="orderList.pageInfo" :dataList="orderList.docs"></DataTable>
          <Pagination :device="device" :pageInfo="orderList.pageInfo" pageType="order"></Pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import OrderForm from "./form";
import DataTable from "./dataTable.vue";
import TopBar from "../common/TopBar.vue";
import Pagination from "../common/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { initEvent } from "@root/publicMethods/events";

export default {
  name: "order",
  data() {
    return {
      sidebarOpened: true,
      device: "desktop"
    };
  },
  components: {
    DataTable,
    TopBar,
    OrderForm,
    Pagination
  },
  methods: {},
  computed: {
    ...mapGetters(["orderList"]),
    formState() {
      return this.$store.getters.orderFormState;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebarOpened,
        openSidebar: this.sidebarOpened,
        withoutAnimation: "false",
        mobile: this.device === "mobile"
      };
    }
  },
  mounted() {
    initEvent(this);
    this.$store.dispatch("order/getOrderList");
  }
};
</script>

<style lang="">
</style>