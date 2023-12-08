import requests from '@/api/user'
import _ from 'lodash'
let OSS = require('ali-oss')
 
let  client = undefined;
export  function ossProtype() {
   requests.getOssToken().then(res => {
    if (res.code === 200) {
      console.log('res',res)
      const stsToken = _.get(res, 'data.securityToken')
      const accessKeyId = _.get(res,'data.accessKeyId')
      const accessKeySecret = _.get(res,'data.accessKeySecret')
      client = new OSS({
        accessKeyId,
        accessKeySecret,
        stsToken,
        region: 'oss-cn-guangzhou',
        bucket: 'guoezu'
      })
      return client
    } else {
      console.error(res)
      return
    }
  })

}


/**
 * OSS 服务文件上传单个文件
 * 同步方式：基于 async 和 await 方式，异步编程同步化。
 * @param {String} objectName 可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
 * @param {file} file 本地文件或者文件路径
 */
 export async function ossPut(objectName, file) {
  console.log('client',client)
  try {
    const result = await client.put(objectName, file)
    // console.log(result)
    return result
  } catch (error) {
    // console.log(error)
    return error
  }
}

/**
 * OSS 服务文件上传单个文件
 * 异步方式：API 接口返回 Promise
 * @param {String} objectName 可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
 * @param {file} file 本地文件或者文件路径
 */
export async function ossAsyncPut(objectName, file) {
  console.log('client',client, {objectName, file})
  return new Promise((resolve, reject) => {
    client.put(objectName, file)
      .then(res => {
        console.log('success', res,objectName,file)
        resolve(res)
      })
      .catch(error => {
        console.log('error', error,client,objectName,file)
        resolve(error)
      })
  })
}

/**
 * OSS 服务文件下载单个文件
 * 同步方式：基于 async 和 await 方式，异步编程同步化。
 * @param {String} objectName
 */
export async function ossGet(objectName) {
  try {
    const result = await client.get(objectName)
    // console.log(result)
    return result
  } catch (error) {
    // console.log(error)
    return error
  }
}

/**
 * OSS 服务文件下载单个文件
 * 异步方式：API 接口返回 Promise
 * @param {String} objectName
 */
export async function ossAsyncGet(objectName) {
  return new Promise((resolve, reject) => {
    client.get(objectName)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * OSS 服务文件删除单个文件
 * @param {String} objectName
 */
export async function ossDelete(objectName) {
  try {
    const result = await client.delete(objectName)
    return result
  } catch (error) {
    // console.log(error)
    return error
  }
}