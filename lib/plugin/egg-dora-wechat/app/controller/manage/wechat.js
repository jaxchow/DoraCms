const xss = require("xss");
const _ = require('lodash');

const wechatRule = (ctx) => {
    return {

        unionId: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("唯一")])
        },


        name: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("名称")])
        },


        avatar: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("头像")])
        },


        sex: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("性别")])
        },


        phoneNumber: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("手机号")])
        },


        birthday: {
            type: "date",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("生日")])
        },

    }
}



let WechatController = {

    async list(ctx) {

        try {

            let payload = ctx.query;
            let queryObj = {};

            let wechatList = await ctx.service.wechat.find(payload, {
                query: queryObj,
            });

            ctx.helper.renderSuccess(ctx, {
                data: wechatList
            });

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }
    },

    async create(ctx) {


        try {

            let fields = ctx.request.body || {};
            const formObj = {


                unionId: fields.unionId,




                name: fields.name,




                avatar: fields.avatar,




                sex: fields.sex,




                phoneNumber: fields.phoneNumber,




                birthday: fields.birthday,




                height: fields.height,




                weight: fields.weight,




                waistline: fields.waistline,



                createTime: new Date()
            }


            ctx.validate(wechatRule(ctx), formObj);



            await ctx.service.wechat.create(formObj);

            ctx.helper.renderSuccess(ctx);

        } catch (err) {
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },

    async getOne(ctx) {

        try {
            let _id = ctx.query.id;

            let targetItem = await ctx.service.wechat.item(ctx, {
                query: {
                    _id: _id
                }
            });

            ctx.helper.renderSuccess(ctx, {
                data: targetItem
            });

        } catch (err) {
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }

    },


    async update(ctx) {


        try {

            let fields = ctx.request.body || {};
            const formObj = {


                unionId: fields.unionId,




                name: fields.name,




                avatar: fields.avatar,




                sex: fields.sex,




                phoneNumber: fields.phoneNumber,




                birthday: fields.birthday,




                height: fields.height,




                weight: fields.weight,




                waistline: fields.waistline,



                updateTime: new Date()
            }


            ctx.validate(wechatRule(ctx), formObj);



            await ctx.service.wechat.update(ctx, fields._id, formObj);

            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }

    },


    async removes(ctx) {

        try {
            let targetIds = ctx.query.ids;
            await ctx.service.wechat.removes(ctx, targetIds);
            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },

}

module.exports = WechatController;