import requestConfig from '@/utils/request'
let request = requestConfig()
export default{
  categoryList(data) {
    return request({
      url: '/guoezu/category/selectList',
      method: 'post',
      data
    })
  },
  // 新增分类
  createcategory(data) {
    return request({
      url:'/guoezu/category/insert',
      method:'post',
      data
    })
  },
  // 删除分类
  deleteCategory(params){
    return request({
      url:'/guoezu/category/delete',
      method:'delete',
      params
    })
  },
  // 修改分类
  changeCategory(data){
    return request({
      url:'/guoezu/category/update',
      method:'put',
      data
    })
  },
  // 查询分类信息
  checkCategory(data){
    return request({
      url:"/guoezu/category/selectInfo",
      method:'post',
      data
    })
  },
  // 新增商品
  addGoods(data){
    return request({
      url:'/guoezu/product/insert',
      method:'post',
      data
    })
  },
  // 修改商品
  updateGoods(data){
    return request({
      url:'/guoezu/product/update',
      method:'put',
      data
    })
  },
  // 新增盲盒
  createBox(data){
    return request({
      url:'/guoezu/blindBox/insert',
      method:'post',
      data
    })
  },
  // 查询商品列表
  goodsList(data){
    return request({
      url:'/guoezu/product/selectList',
      method:'post',
      data
    })
  },
  // 删除商品
  deleteGoods(params){
    return request({
      url:'/guoezu/product/delete',
      method:'delete',
      params
    })
  },
  // 商品详情
  goodsDetail(data){
    return request({
      url:'/guoezu/product/selectInfo',
      method:'post',
      data
    })
  }
}
