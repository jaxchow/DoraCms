<template>
  <div>
    <el-table
      align="center"
      v-loading="loading"
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      
        <el-table-column prop="unionId" :label="$t('wechat.unionId')">

        </el-table-column>

      
        <el-table-column prop="name" :label="$t('wechat.name')">

        </el-table-column>

      
        <el-table-column prop="avatar" :label="$t('wechat.avatar')">

        </el-table-column>

      
        <el-table-column prop="sex" :label="$t('wechat.sex')">

        </el-table-column>

      
        <el-table-column prop="phoneNumber" :label="$t('wechat.phoneNumber')">

        </el-table-column>

      
        <el-table-column prop="birthday" :label="$t('wechat.birthday')">

        </el-table-column>

      
        <el-table-column prop="height" :label="$t('wechat.height')">

        </el-table-column>

      
        <el-table-column prop="weight" :label="$t('wechat.weight')">

        </el-table-column>

      
        <el-table-column prop="waistline" :label="$t('wechat.waistline')">

        </el-table-column>

      
      <el-table-column prop="createTime" :label="$t('wechat.createTime')"></el-table-column>
      <el-table-column :label="$t('main.dataTableOptions')" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            round
            @click="editWechat(scope.$index, dataList)"
          >
            <svg-icon icon-class="edit" />
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            round
            @click="deleteWechat(scope.$index, dataList)"
          >
            <svg-icon icon-class="icon_delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteWechat, getOneWechat } from "@/api/wechat";

export default {
  props: {
    dataList: Array,
    pageInfo: Object
  },
  data() {
    return {
      green: { color: "#13CE66" },
      red: { color: "#FF4949" },
      loading: false,
      multipleSelection: []
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    editWechat(index, rows) {
      let rowData = rows[index];
      getOneWechat({ id: rowData._id })
        .then(result => {
          if (result.status === 200) {
            this.$store.dispatch("wechat/showWechatForm", {
              edit: true,
              formData: result.data
            });
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    },
    deleteWechat(index, rows) {
      this.$confirm(
        this.$t("main.del_notice"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning"
        }
      )
        .then(() => {
          return deleteWechat({
            ids: rows[index]._id
          });
        })
        .then(result => {
          if (result.status === 200) {
            this.$store.dispatch("wechat/getWechatList", this.pageInfo);
            this.$message({
              message: this.$t("main.scr_modal_del_succes_info"),
              type: "success"
            });
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    }
  }
};
</script>