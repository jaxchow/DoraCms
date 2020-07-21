module.exports = app => {
    const mongoose = app.mongoose
    var shortid = require('shortid');
    var path = require('path');
    var Schema = mongoose.Schema;
    var moment = require('moment')

    var OrderSchema = new Schema({
        _id: {
            type: String,
            'default': shortid.generate
        },
        createTime: {
            type: Date,
        },
        updateTime: {
            type: Date,
        },
        cost: String,// 费用 
unionId: String,// 唯一身份 
unionSource: String,// 身份来源 
type: String,// 订单类型 
deviceId: String,// 硬件ID 
deviceOwn: String,// 硬件所有者 

    });

    OrderSchema.set('toJSON', {
        getters: true,
        virtuals: true
    });
    OrderSchema.set('toObject', {
        getters: true,
        virtuals: true
    });

    OrderSchema.path('createTime').get(function (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
    });
    OrderSchema.path('updateTime').get(function (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
    });

    return mongoose.model("Order", OrderSchema, 'orders');

}