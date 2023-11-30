import requestConfig from '@/utils/request'
let request = requestConfig()
export default{
  login(data) {
    return request({
      url: '/api/admin/login',
      method: 'post',
      data
    })
  },
  loginout(){
    return request({
      url: '/api/admin/logout',
      method: 'post',
    })
  },
  userList(data){
    return request({
      url: '/api/admin/selectList',
      method: 'post',
      data
    })
  },
  userUpdate(data){
    return request({
      url: '/api/admin/update',
      method: 'put',
      data
    })
  },
  deleteUser(data){
    return request({
      url: '/api/admin/update',
      method: 'put',
      data
    })
  },
  registerUser(data){
    return request({
      url: '/api/admin/register',
      method: 'post',
      data
    })
  },
  customerList(data){
    return request({
      url: '/api/user/selectList',
      method: 'post',
      data
    })
  }

}
