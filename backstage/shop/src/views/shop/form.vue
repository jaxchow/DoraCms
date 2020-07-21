<template>
  <div class="dr-ShopForm">
    <el-dialog
      :xs="20"
      :sm="20"
      :md="6"
      :lg="6"
      :xl="6"
      width="70%"
      title="编辑"
      :visible.sync="dialogState.show"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dialogState.formData"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'"
      >
        
        <el-form-item :label="$t('shop.name')" prop="name">

          <el-input size="small" v-model="dialogState.formData.name"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('shop.address')" prop="address">

          <el-input size="small" v-model="dialogState.formData.address"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('shop.devices')" prop="devices">

          <el-input size="small" v-model="dialogState.formData.devices"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('shop.userId')" prop="userId">

          <el-input size="small" v-model="dialogState.formData.userId"></el-input>

        </el-form-item>

      
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="submitForm('ruleForm')"
          >{{dialogState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addShop, updateShop } from "@/api/shop";

import _ from "lodash";
export default {
  props: {
    dialogState: Object,
    groups: Array,
    device: String
  },
  data() {
    return {
      rules: {
        
        name: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        address: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        devices: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        userId: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
      }
    };
  },
  components: {},
  methods: {
    confirm() {
      this.$store.dispatch("shop/hideShopForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            updateShop(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("shop/hideShopForm");
                this.$store.dispatch("shop/getShopList");
                this.$message({
                  message: this.$t("main.updateSuccess"),
                  type: "success"
                });
              } else {
                this.$message.error(result.message);
              }
            });
          } else {
            // 新增
            addShop(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("shop/hideShopForm");
                this.$store.dispatch("shop/getShopList");
                this.$message({
                  message: this.$t("main.addSuccess"),
                  type: "success"
                });
              } else {
                this.$message.error(result.message);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.edui-default .edui-toolbar {
  line-height: 20px !important;
}
</style>