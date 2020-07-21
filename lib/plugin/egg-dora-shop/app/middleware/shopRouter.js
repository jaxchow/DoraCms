const _ = require('lodash');
const shopAdminController = require('../controller/manage/shop')

module.exports = (options, app) => {

    return async function shopRouter(ctx, next) {

        let pluginConfig = app.config.doraShop;
        await app.initPluginRouter(ctx, pluginConfig, shopAdminController);
        await next();

    }

}