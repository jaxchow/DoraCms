/*
 * @Author: doramart 
 * @Date: 2019-09-26 09:19:25 
 * @Last Modified by: doramart
 * @Last Modified time: 2020-04-01 09:32:02
 */
const _ = require('lodash');
const WXBizDataCrypt = require('../../utils/crypto')

const APP_ID = 'wx9b131ef491a04d81'
const APP_SECRET = 'b960b3273c51bfdbf3b65555882aa1f7'

/********** 业务处理开始 **********/

// 获取解密SessionKey
const getSessionKey = (code) => {
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid='
        + APP_ID + '&secret=' + APP_SECRET + '&js_code=' + code
        + '&grant_type=authorization_code'
    return new Promise(function (reslove, reject) {

        Request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log("remote error", error)
                console.log('getSessionKey:', body, typeof (body))

                //				console.log("replace:",body.replace(/\//g,"\\\/"))
                const data = JSON.parse(body)
                console.log("remote data", data)
                if (!data.session_key) {
                    reject({
                        code: 1,
                        message: data.errmsg
                    })
                } else {
                    reslove(data)
                }
            } else {
                reject({
                    code: 1,
                    message: error
                })
            }
        })
    })
}

// 解密
const decrypt = (sessionKey, encryptedData, iv, callback) => {
    return new Promise(function (reslove, reject) {
        try {
            const pc = new WXBizDataCrypt(APP_ID, sessionKey)
            const data = pc.decryptData(encryptedData, iv)
            console.log('decrypted:', data)
            reslove(data)
        } catch (e) {
            console.log("decrypt", e)
            reject({
                code: 1,
                message: e
            })
        }
    })
}

let WechatController = {


    /**
     * @api {get} /api/wechat/connect 连接创建用户
     * @apiDescription 连接微信帐号创建用户，已存在更新信息
     * @apiName /wechat/connect
     * @apiGroup wechat 
     * @apiParam {json}
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "status": 200,
     *      "message": "wechat",
     *      "server_time": 1542116428394,
     *      "data": {
     *      }
     *  }
     * @apiSampleRequest http://localhost:8080/api/wechat/connect
     * @apiVersion 1.0.0
     */
    async connect(ctx, app) {
        const data = ctx.request.body
        let wechatService = await ctx.service.ads
        if (!data.code) {
            ctx.helper.renderFail(ctx, {
                message: '缺少参数：code'
            });
            return
        } else if (!data.encryptedData) {
            ctx.helper.renderFail(ctx, {
                message: '缺少参数：encryptedData'
            });
            return
        } else if (!data.iv) {
            ctx.helper.renderFail(ctx, {
                message: '缺少参数：iv'
            });
            return
        }

        // 获取sessionkey
        const rethh = await getSessionKey(data.code)
        const ret = await decrypt(rethh.session_key, data.encryptedData, data.iv)

        const people = {
            sex: ret.gender,
            unionId: (ret.unionId) ? ret.unionId : ret.openId,
            name: ret.nickName,
            avatar: ret.avatarUrl
        }
        console.log("ret:", ret)
        let user = await wechatService.item(ctx, {
            query: {
                unionId: ret.openId
            }
        });
        let u = null
        if (user.length > 0) {
            let us = await wechatService.update(ctx, user[0]._id, people)
            u = us[0]
        } else {
            u = await wechatService.create(people);
        }
        // console.log("body", u)

        ctx.helper.renderSuccess(ctx, {
            data: u
        });
    }

}

module.exports = WechatController;