import requestConfig from '@/utils/request'
let request = requestConfig()
export default{
  // 查询支付订单列表
  /**
   * 
   * @param {*} data 
   * @OrderStatus  1:待付款，2：待发货，3：待收货，4：已收货
   * @OrderType   1：商品， 2：盲盒， 3：会员
    */
  orderLists(data){
    return request({
      url:'/guoezu/payOrder/selectList',
      method:'post',
      data
    })
  },
}
