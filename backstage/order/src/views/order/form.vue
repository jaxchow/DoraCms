<template>
  <div class="dr-OrderForm">
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
        
        <el-form-item :label="$t('order.cost')" prop="cost">

          <el-input size="small" v-model="dialogState.formData.cost"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('order.unionId')" prop="unionId">

          <el-input size="small" v-model="dialogState.formData.unionId"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('order.unionSource')" prop="unionSource">

          <el-input size="small" v-model="dialogState.formData.unionSource"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('order.type')" prop="type">

          <el-input size="small" v-model="dialogState.formData.type"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('order.deviceId')" prop="deviceId">

          <el-input size="small" v-model="dialogState.formData.deviceId"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('order.deviceOwn')" prop="deviceOwn">

          <el-input size="small" v-model="dialogState.formData.deviceOwn"></el-input>

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
import { addOrder, updateOrder } from "@/api/order";

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
        
        cost: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        unionId: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        unionSource: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        type: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        deviceId: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        deviceOwn: [

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
      this.$store.dispatch("order/hideOrderForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            updateOrder(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("order/hideOrderForm");
                this.$store.dispatch("order/getOrderList");
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
            addOrder(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("order/hideOrderForm");
                this.$store.dispatch("order/getOrderList");
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