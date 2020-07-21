'use strict'

/**
 * egg-dora-order default config
 * @member Config#eggDoraOrder
 * @property {String} SOME_KEY - some description
 */

const pkgInfo = require('../package.json');
exports.doraOrder = {
    alias: 'order', // 插件目录，必须为英文
    pkgName: 'egg-dora-order', // 插件包名
    enName: 'doraOrder', // 插件名
    name: '帮助', // 插件名称
    description: '帮助', // 插件描述
    isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
    isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
    version: pkgInfo.version, // 版本号
    iconName: 'icon_service', // 主菜单图标名称
    adminUrl: '/order/js/app.js',
    adminApi: [{
        url: 'order/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取帮助列表',
    }, {
        url: 'order/getOne',
        method: 'get',
        controllerName: 'getOne',
        details: '获取单条帮助信息',
    }, {
        url: 'order/addOne',
        method: 'post',
        controllerName: 'create',
        details: '添加单个帮助',
    }, {
        url: 'order/updateOne',
        method: 'post',
        controllerName: 'update',
        details: '更新帮助信息',
    }, {
        url: 'order/delete',
        method: 'get',
        controllerName: 'removes',
        details: '删除帮助',
    }],
    fontApi: [{
        url: 'order/getOne',
        method: 'get',
        controllerName: 'getOne',
        details: '获取帮助列表',
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
        match: [ctx => ctx.path.startsWith('/manage/order'), ctx => ctx.path.startsWith('/api/order')],\n
    },\n
    `, // 插入到 config.default.js 中的配置
}