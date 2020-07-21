const xss = require("xss");
const _ = require('lodash');

const orderRule = (ctx) => {
    return {
        
        cost: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("费用")])
        },

      
        unionId: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("唯一身份")])
        },

      
        unionSource: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("身份来源")])
        },

      
        type: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("订单类型")])
        },

      
        deviceId: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("硬件ID")])
        },

      
        deviceOwn: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("硬件所有者")])
        },

      
    }
}



let OrderController = {

    async list(ctx) {

        try {

            let payload = ctx.query;
            let queryObj = {};

            let orderList = await ctx.service.order.find(payload, {
                query: queryObj,
            });

            ctx.helper.renderSuccess(ctx, {
                data: orderList
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
                
     
        cost:fields.cost, 

  
      
     
        unionId:fields.unionId, 

  
      
     
        unionSource:fields.unionSource, 

  
      
     
        type:fields.type, 

  
      
     
        deviceId:fields.deviceId, 

  
      
     
        deviceOwn:fields.deviceOwn, 

  
      
                createTime: new Date()
            }


            ctx.validate(orderRule(ctx), formObj);



            await ctx.service.order.create(formObj);

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

            let targetItem = await ctx.service.order.item(ctx, {
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
                
     
        cost:fields.cost, 

  
      
     
        unionId:fields.unionId, 

  
      
     
        unionSource:fields.unionSource, 

  
      
     
        type:fields.type, 

  
      
     
        deviceId:fields.deviceId, 

  
      
     
        deviceOwn:fields.deviceOwn, 

  
      
                updateTime: new Date()
            }


            ctx.validate(orderRule(ctx), formObj);



            await ctx.service.order.update(ctx, fields._id, formObj);

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
            await ctx.service.order.removes(ctx, targetIds);
            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },

}

module.exports = OrderController;