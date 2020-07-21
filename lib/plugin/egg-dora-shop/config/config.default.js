'use strict'

/**
 * egg-dora-shop default config
 * @member Config#eggDoraShop
 * @property {String} SOME_KEY - some description
 */

const pkgInfo = require('../package.json');
exports.doraShop = {
    alias: 'shop', // 插件目录，必须为英文
    pkgName: 'egg-dora-shop', // 插件包名
    enName: 'doraShop', // 插件名
    name: '门店', // 插件名称
    description: '门店', // 插件描述
    isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
    isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
    version: pkgInfo.version, // 版本号
    iconName: 'icon_service', // 主菜单图标名称
    adminUrl: '/shop/js/app.js',
    adminApi: [{
        url: 'shop/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取门店列表',
    }, {
        url: 'shop/getOne',
        method: 'get',
        controllerName: 'getOne',
        details: '获取单条门店信息',
    }, {
        url: 'shop/addOne',
        method: 'post',
        controllerName: 'create',
        details: '添加单个门店',
    }, {
        url: 'shop/updateOne',
        method: 'post',
        controllerName: 'update',
        details: '更新门店信息',
    }, {
        url: 'shop/delete',
        method: 'get',
        controllerName: 'removes',
        details: '删除门店',
    }],
    fontApi: [{
        url: 'shop/getOne',
        method: 'get',
        controllerName: 'getOne',
        details: '获取门店列表',
    }],

    initData: '', // 初始化数据脚本
    pluginsConfig: ` 
    module.exports = {\n
        enable: true,\n
         \n
    };\n
    `, // 插入到 plugins.js 中的配置
    defaultConfig: `
    module.exports = {\n
        match: [ctx => ctx.path.startsWith('/manage/shop'), ctx => ctx.path.startsWith('/api/shop')],\n
    },\n
    `, // 插入到 config.default.js 中的配置
}