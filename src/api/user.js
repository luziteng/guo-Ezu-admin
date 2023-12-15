import requestConfig from '@/utils/request'
let request = requestConfig()
export default{
  login(data) {
    return request({
      url: '/admin/login',
      method: 'post',
      data
    })
  },
  loginout(){
    return request({
      url: '/admin/logout',
      method: 'post',
    })
  },
  userList(data){
    return request({
      url: '/admin/selectList',
      method: 'post',
      data
    })
  },
  userUpdate(data){
    return request({
      url: '/admin/update',
      method: 'put',
      data
    })
  },
  deleteUser(data){
    return request({
      url: '/admin/update',
      method: 'put',
      data
    })
  },
  registerUser(data){
    return request({
      url: '/admin/register',
      method: 'post',
      data
    })
  },
  customerList(data){
    return request({
      url: '/user/selectList',
      method: 'post',
      data
    })
  },
  // 获取oss授权
  getOssToken(){
    return request({
      url: '/storage/getStsToken',
      method: 'get',
    })
  }

}
