import request from '@root/publicMethods/request'

export function shopList(params) {
  return request({
    url: '/manage/shop/getList',
    params,
    method: 'get'
  })
}

export function getOneShop(params) {
  return request({
    url: '/manage/shop/getOne',
    params,
    method: 'get'
  })
}

export function addShop(data) {
  return request({
    url: '/manage/shop/addOne',
    data,
    method: 'post'
  })
}

export function updateShop(data) {
  return request({
    url: '/manage/shop/updateOne',
    data,
    method: 'post'
  })
}


export function deleteShop(params) {
  return request({
    url: '/manage/shop/delete',
    params,
    method: 'get'
  })
}