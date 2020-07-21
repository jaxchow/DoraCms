<template>
  <div class="dr-WechatForm">
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
        
        <el-form-item :label="$t('wechat.unionId')" prop="unionId">

          <el-input size="small" v-model="dialogState.formData.unionId"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('wechat.name')" prop="name">

          <el-input size="small" v-model="dialogState.formData.name"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('wechat.avatar')" prop="avatar">

          <el-input size="small" v-model="dialogState.formData.avatar"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('wechat.sex')" prop="sex">

          <el-input size="small" v-model="dialogState.formData.sex"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('wechat.phoneNumber')" prop="phoneNumber">

          <el-input size="small" v-model="dialogState.formData.phoneNumber"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('wechat.birthday')" prop="birthday">

          <el-input size="small" v-model="dialogState.formData.birthday"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('wechat.height')" prop="height">

          <el-input size="small" v-model="dialogState.formData.height"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('wechat.weight')" prop="weight">

          <el-input size="small" v-model="dialogState.formData.weight"></el-input>

        </el-form-item>

      
        <el-form-item :label="$t('wechat.waistline')" prop="waistline">

          <el-input size="small" v-model="dialogState.formData.waistline"></el-input>

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
import { addWechat, updateWechat } from "@/api/wechat";

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
        
        unionId: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        name: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        avatar: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        sex: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        phoneNumber: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        birthday: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        height: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        weight: [

          {

            required: true,

            trigger: "blur"

          }

        ],

      
        waistline: [

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
      this.$store.dispatch("wechat/hideWechatForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            updateWechat(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("wechat/hideWechatForm");
                this.$store.dispatch("wechat/getWechatList");
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
            addWechat(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("wechat/hideWechatForm");
                this.$store.dispatch("wechat/getWechatList");
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