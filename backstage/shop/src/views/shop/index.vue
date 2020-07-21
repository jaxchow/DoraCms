<template>
  <div :class="classObj" class="adminUser">
    <div class="main-container">
      <ShopForm :device="device" :dialogState="formState" ref="contentFrom"></ShopForm>
      <el-row class="dr-datatable">
        <el-col :span="24">
          <TopBar type="shop" :pageInfo="shopList.pageInfo"></TopBar>
          <DataTable :pageInfo="shopList.pageInfo" :dataList="shopList.docs"></DataTable>
          <Pagination :device="device" :pageInfo="shopList.pageInfo" pageType="shop"></Pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ShopForm from "./form";
import DataTable from "./dataTable.vue";
import TopBar from "../common/TopBar.vue";
import Pagination from "../common/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { initEvent } from "@root/publicMethods/events";

export default {
  name: "shop",
  data() {
    return {
      sidebarOpened: true,
      device: "desktop"
    };
  },
  components: {
    DataTable,
    TopBar,
    ShopForm,
    Pagination
  },
  methods: {},
  computed: {
    ...mapGetters(["shopList"]),
    formState() {
      return this.$store.getters.shopFormState;
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
    this.$store.dispatch("shop/getShopList");
  }
};
</script>

<style lang="">
</style>