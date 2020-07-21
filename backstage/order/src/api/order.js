import request from '@root/publicMethods/request'

export function orderList(params) {
  return request({
    url: '/manage/order/getList',
    params,
    method: 'get'
  })
}

export function getOneOrder(params) {
  return request({
    url: '/manage/order/getOne',
    params,
    method: 'get'
  })
}

export function addOrder(data) {
  return request({
    url: '/manage/order/addOne',
    data,
    method: 'post'
  })
}

export function updateOrder(data) {
  return request({
    url: '/manage/order/updateOne',
    data,
    method: 'post'
  })
}


export function deleteOrder(params) {
  return request({
    url: '/manage/order/delete',
    params,
    method: 'get'
  })
}