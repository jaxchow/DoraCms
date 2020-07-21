<template>
  <div :class="classObj" class="adminUser">
    <div class="main-container">
      <WechatForm :device="device" :dialogState="formState" ref="contentFrom"></WechatForm>
      <el-row class="dr-datatable">
        <el-col :span="24">
          <TopBar type="wechat" :pageInfo="wechatList.pageInfo"></TopBar>
          <DataTable :pageInfo="wechatList.pageInfo" :dataList="wechatList.docs"></DataTable>
          <Pagination :device="device" :pageInfo="wechatList.pageInfo" pageType="wechat"></Pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import WechatForm from "./form";
import DataTable from "./dataTable.vue";
import TopBar from "../common/TopBar.vue";
import Pagination from "../common/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { initEvent } from "@root/publicMethods/events";

export default {
  name: "wechat",
  data() {
    return {
      sidebarOpened: true,
      device: "desktop"
    };
  },
  components: {
    DataTable,
    TopBar,
    WechatForm,
    Pagination
  },
  methods: {},
  computed: {
    ...mapGetters(["wechatList"]),
    formState() {
      return this.$store.getters.wechatFormState;
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
    this.$store.dispatch("wechat/getWechatList");
  }
};
</script>

<style lang="">
</style>