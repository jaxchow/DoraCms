module.exports = app => {
    const mongoose = app.mongoose
    var shortid = require('shortid');
    var path = require('path');
    var Schema = mongoose.Schema;
    var moment = require('moment')

    var ShopSchema = new Schema({
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
        name: String,// 门店名称 
address: String,// 地址 
devices: String,// 硬件IDS 
userId: String,// 所属用户 

    });

    ShopSchema.set('toJSON', {
        getters: true,
        virtuals: true
    });
    ShopSchema.set('toObject', {
        getters: true,
        virtuals: true
    });

    ShopSchema.path('createTime').get(function (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
    });
    ShopSchema.path('updateTime').get(function (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
    });

    return mongoose.model("Shop", ShopSchema, 'shops');

}