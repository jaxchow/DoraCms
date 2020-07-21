const xss = require("xss");
const _ = require('lodash');

const shopRule = (ctx) => {
    return {
        
        name: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("门店名称")])
        },

      
        address: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("地址")])
        },

      
        devices: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("硬件IDS")])
        },

      
        userId: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("所属用户")])
        },

      
    }
}



let ShopController = {

    async list(ctx) {

        try {

            let payload = ctx.query;
            let queryObj = {};

            let shopList = await ctx.service.shop.find(payload, {
                query: queryObj,
            });

            ctx.helper.renderSuccess(ctx, {
                data: shopList
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
                
     
        name:fields.name, 

  
      
     
        address:fields.address, 

  
      
     
        devices:fields.devices, 

  
      
     
        userId:fields.userId, 

  
      
                createTime: new Date()
            }


            ctx.validate(shopRule(ctx), formObj);



            await ctx.service.shop.create(formObj);

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

            let targetItem = await ctx.service.shop.item(ctx, {
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
                
     
        name:fields.name, 

  
      
     
        address:fields.address, 

  
      
     
        devices:fields.devices, 

  
      
     
        userId:fields.userId, 

  
      
                updateTime: new Date()
            }


            ctx.validate(shopRule(ctx), formObj);



            await ctx.service.shop.update(ctx, fields._id, formObj);

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
            await ctx.service.shop.removes(ctx, targetIds);
            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },

}

module.exports = ShopController;