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
}
