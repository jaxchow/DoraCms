import request from '@root/publicMethods/request'

export function wechatList(params) {
  return request({
    url: '/manage/wechat/getList',
    params,
    method: 'get'
  })
}

export function getOneWechat(params) {
  return request({
    url: '/manage/wechat/getOne',
    params,
    method: 'get'
  })
}

export function addWechat(data) {
  return request({
    url: '/manage/wechat/addOne',
    data,
    method: 'post'
  })
}

export function updateWechat(data) {
  return request({
    url: '/manage/wechat/updateOne',
    data,
    method: 'post'
  })
}


export function deleteWechat(params) {
  return request({
    url: '/manage/wechat/delete',
    params,
    method: 'get'
  })
}