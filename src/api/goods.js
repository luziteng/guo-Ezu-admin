import requestConfig from '@/utils/request'
let request = requestConfig()
export default{
categoryList(data) {
    return request({
      url: '/category/selectList',
      method: 'post',
      data
    })
  },
  // 新增分类
  createcategory(data) {
    return request({
      url:'/category/insert',
      method:'post',
      data
    })
  },
  // 删除分类
  deleteCategory(params){
    return request({
      url:'/category/delete',
      method:'delete',
      params
    })
  },
  // 修改分类
  changeCategory(data){
    return request({
      url:'/category/update',
      method:'put',
      data
    })
  },
  // 查询分类信息
  checkCategory(data){
    return request({
      url:"/category/selectInfo",
      method:'post',
      data
    })
  },
  // 新增商品
  addGoods(data){
    return request({
      url:'/product/insert',
      method:'post',
      data
    })
  },
  // 新增盲盒
  createBox(data){
    return request({
      url:'/blindBox/insert',
      method:'post',
      data
    })
  },
  // 查询商品列表
  goodsList(data){
    return request({
      url:'/product/selectList',
      method:'post',
      data
    })
  }
}
