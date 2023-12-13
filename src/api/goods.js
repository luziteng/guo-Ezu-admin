import requestConfig from '@/utils/request'
let request = requestConfig()
export default{
categoryList(data) {
    return request({
      url: '/api/category/selectList',
      method: 'post',
      data
    })
  },
  // 新增分类
  createcategory(data) {
    return request({
      url:'/api/category/insert',
      method:'post',
      data
    })
  },
  // 删除分类
  deleteCategory(params){
    return request({
      url:'/api/category/delete',
      method:'delete',
      params
    })
  },
  // 修改分类
  changeCategory(data){
    return request({
      url:'/api/category/update',
      method:'put',
      data
    })
  },
  // 查询分类信息
  checkCategory(data){
    return request({
      url:"/api/category/selectInfo",
      method:'post',
      data
    })
  },
  // 新增商品
  addGoods(data){
    return request({
      url:'/api/product/insert',
      method:'post',
      data
    })
  }
}
