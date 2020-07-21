const _ = require('lodash');
const wechatAdminController = require('../controller/manage/wechat')
const wechatApiController = require('../controller/api/wechat')

module.exports = (options, app) => {

    return async function wechatRouter(ctx, next) {

        let pluginConfig = app.config.doraWechat;
        await app.initPluginRouter(ctx, pluginConfig, wechatAdminController,wechatApiController);
        await next();

    }

}