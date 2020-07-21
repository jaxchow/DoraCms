module.exports = app => {
    const mongoose = app.mongoose
    var shortid = require('shortid');
    var path = require('path');
    var Schema = mongoose.Schema;
    var moment = require('moment')

    var WechatSchema = new Schema({
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
        unionId: String,// 唯一 
        name: String,// 名称 
        avatar: String,// 头像 
        sex: String,// 性别 
        phoneNumber: String,// 手机号 
        birthday: Date,// 生日 
        height: Number,// 身高 
        weight: Number,// 体重 
        waistline: Number,// 腰围 

    });

    WechatSchema.set('toJSON', {
        getters: true,
        virtuals: true
    });
    WechatSchema.set('toObject', {
        getters: true,
        virtuals: true
    });

    WechatSchema.path('createTime').get(function (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
    });
    WechatSchema.path('updateTime').get(function (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
    });

    return mongoose.model("Wechat", WechatSchema, 'wechats');

}