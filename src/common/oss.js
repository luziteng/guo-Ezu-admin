import requests from '@/api/template'
import _ from 'lodash'
let OSS = require('ali-oss')
export default function ossProtype(bucket) {
  return requests.getOssToken().then(res => {
    if (res.code === 200) {
      const accessKeyId = _.get(res, 'data.data.access_key_id')
      const accessKeySecret = _.get(res, 'data.data.access_key_secret')
      const stsToken = _.get(res, 'data.data.security_token')
      let ossObj = new OSS({
        accessKeyId,
        accessKeySecret,
        stsToken,
        region: 'oss-cn-hangzhou',
        bucket: bucket
      })
      return ossObj
    } else {
      console.error(res)
      return
    }
  })

}