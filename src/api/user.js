import requestConfig from '@/utils/request'
let request = requestConfig()
export default{
  login(data) {
    return request({
      url: '/guoezu/admin/login',
      method: 'post',
      data
    })
  },
  loginout(){
    return request({
      url: '/guoezu/admin/logout',
      method: 'post',
    })
  },
  userList(data){
    return request({
      url: '/guoezu/admin/selectList',
      method: 'post',
      data
    })
  },
  userUpdate(data){
    return request({
      url: '/guoezu/admin/update',
      method: 'put',
      data
    })
  },
  deleteUser(data){
    return request({
      url: '/guoezu/admin/update',
      method: 'put',
      data
    })
  },
  registerUser(data){
    return request({
      url: '/guoezu/admin/register',
      method: 'post',
      data
    })
  },
  customerList(data){
    return request({
      url: '/guoezu/user/selectList',
      method: 'post',
      data
    })
  },
  // 获取oss授权
  getOssToken(){
    return request({
      url: '/guoezu/storage/getStsToken',
      method: 'get',
    })
  }

}
