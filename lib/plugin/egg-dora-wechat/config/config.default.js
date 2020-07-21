'use strict'

/**
 * egg-dora-wechat default config
 * @member Config#eggDoraWechat
 * @property {String} SOME_KEY - some description
 */

const pkgInfo = require('../package.json');
exports.doraWechat = {
    alias: 'wechat', // 插件目录，必须为英文
    pkgName: 'egg-dora-wechat', // 插件包名
    enName: 'doraWechat', // 插件名
    name: '微信用户', // 插件名称
    description: '微信用户', // 插件描述
    isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
    isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
    version: pkgInfo.version, // 版本号
    iconName: 'icon_service', // 主菜单图标名称
    adminUrl: '/wechat/js/app.js',
    adminApi: [{
        url: 'wechat/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取微信用户列表',
    }, {
        url: 'wechat/getOne',
        method: 'get',
        controllerName: 'getOne',
        details: '获取单条微信用户信息',
    }, {
        url: 'wechat/addOne',
        method: 'post',
        controllerName: 'create',
        details: '添加单个微信用户',
    }, {
        url: 'wechat/updateOne',
        method: 'post',
        controllerName: 'update',
        details: '更新微信用户信息',
    }, {
        url: 'wechat/delete',
        method: 'get',
        controllerName: 'removes',
        details: '删除微信用户',
    }],
    fontApi: [{
        url: 'wechat/connect',
        method: 'get',
        controllerName: 'getOne',
        details: '获取微信用户列表',
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
        match: [ctx => ctx.path.startsWith('/manage/wechat'), ctx => ctx.path.startsWith('/api/wechat')],\n
    },\n
    `, // 插入到 config.default.js 中的配置
}