import requestConfig from '@/utils/request';
let request = requestConfig();
export default {
  // 轮播图列表
  fetchBannerList(data) {
    return request({
      url: '/guoezu/banner/selectList',
      method: 'post',
      data
    });
  },
  
  // 新增轮播图
  insertBanner(data) {
    return request({
      url: '/guoezu/banner/insert',
      method: 'post',
      data
    });
  },

  // 修改轮播图
  updateBanner(data) {
    return request({
      url: '/guoezu/banner/update',
      method: 'put',
      data
    });
  },

  // 删除轮播图
  deleteBanner(params) {
    return request({
      url: '/guoezu/banner/delete',
      method: 'DELETE',
      params
    });
  },

  // 查询轮播图详情
  fetchBannerInfo(data) {
    return request({
      url: '/guoezu/banner/selectInfo',
      method: 'post',
      data
    });
  }
};
