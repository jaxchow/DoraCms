const _ = require('lodash');
const orderAdminController = require('../controller/manage/order')

module.exports = (options, app) => {

    return async function orderRouter(ctx, next) {

        let pluginConfig = app.config.doraOrder;
        await app.initPluginRouter(ctx, pluginConfig, orderAdminController);
        await next();

    }

}