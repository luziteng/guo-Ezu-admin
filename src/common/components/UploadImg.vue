<!--
 * @Description:图片上传
 * @Author: duyan
 * @Date: 2021-10-27 19:44:02
 * @LastEditTime: 2022-04-14 14:59:50
 * @LastEditors: duyan
-->
<template>
    <div class="uploadImg">
      <el-upload
        :class="(maxCount>imgLength)?'uploadImgContent':'uploadImgContentNone'"
        :file-list="fileList"
        :limit="maxCount"
        :drag="isDrag"
        :http-request="onUploadFile"
        :before-upload="handleBeforeUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-error="handleError"
        :on-change="changeValue"
        action=""
        accept="image/png,image/jpg,image/jpeg"
        list-type="picture-card"
      >
        <i slot="default" class="el-icon-plus"/>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" width="100%" append-to-body>
        <img :src="dialogImageUrl" height="100%" alt="">
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { imgToBase64, base64ToFileObject } from '../upload'
  import { ossAsyncPut, ossDelete, ossProtype } from '../oss'
  import { v4 as uuidv4 } from 'uuid'
  export default {
    // 名字
    name: 'UploadImg',
    // 部件
    components: {
    },
    // 静态
    props: {
      fileList: {
        type: Array,
        default: () => []
      },
      // 是否直接上传到 OSS 服务
      isPutOss: {
        type: Boolean,
        default: false
      },
      // 是否直接从OSS 删除
      isDeleteOss: {
        type: Boolean,
        default: true
      },
  
      // 图片上传到 OSS 服务上的存储目录
      ossPathPrefix: {
        type: String,
        default: ''
      },
      // 图片上传数
      maxCount: {
        type: Number,
        default: 1
      },
      isDrag: {
        type: Boolean,
        default: false
      },
      // eslint-disable-next-line vue/require-default-prop
      afterRead: Function
    },
    // 数据
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imgLength: 0,
        deleteFile: '',
        imgList: []
      }
    },
    // 属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
      // value() {
      //   console.log('3321123123123123')
      //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //   // this.imgLength = this.fileList.length
      //   // console.log('file.list',this.fileList.length)
      //   return this.fileList
      // }
    },
    // 对象内部的属性监听，也叫深度监听
    watch: {
      fileList: {
        handler(val) {
          console.log(222222222222, val, val.length)
          this.imgLength = val.length
        },
        immediate: true
      }
    },
    // 请求数据
    created() {
        ossProtype()
    },
    mounted() {
    },
    // 方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
      // 图片上传
      onUploadFile(file) {
        // 上传完成
        // this.afterRead && this.afterRead(file)
        // 上传oss
        this.isPutOss && this.onUpload(file)
      },
      onUpload(file) {
        console.log('是否上传',file)
        file.status = 'uploading'
        file.message = '上传中...'
        this.uploaded(file.file)
          .then(response => {
            const { url } = response
            console.log('url',url)
            file.url = url
            file.status = 'done'
            file.message = '上传成功'
            this.imgList.push(file)
            this.$emit('input', this.imgList)
            this.$forceUpdate()// 强制渲染
          })
          .catch(() => {
            file.status = 'failed'
            file.message = '上传失败'
            file.url = null
            this.$forceUpdate()
          })
      },
      /**
       * 文件上传至阿里 OSS 服务
       */
      uploaded(file) {
        console.log(11111)
        return new Promise((resolve, reject) => {
          const suffix = file.type.split('/')[1]
          const fileName = `${this.ossPathPrefix}/${uuidv4()}.${suffix}`
          ossAsyncPut(fileName, file)
            .then(({ res, url }) => {
              console.log(',1111111',res)
              console.log(url)
              if (res && res.status === 200) {
                // console.log('上传成功')
                resolve({ res, url })
              } else {
                // console.log('上传失败')
                reject(new Error('图片上传 OSS 服务失败！'))
              }
            })
        })
      },
      // 图片从oss上删除
      _delete(file) {
        this.deleteFile = file
        if (file.url && this.isDeleteOss) {
          const startIndex = file.url.indexOf(this.ossPathPrefix)
          const objectName = file.url.substr(startIndex)
          ossDelete(objectName).then(res => {
          })
        }
      },
      // 手动将图片从oss上删除
      _deleteHandle() {
        const file = this.deleteFile
        if (file.url) {
          const startIndex = file.url.indexOf(this.ossPathPrefix)
          const objectName = file.url.substr(startIndex)
          ossDelete(objectName)
        }
      },
      handleBeforeUpload(file) {
        return new Promise((resolve, reject) => {
          const fileType = ['image/png', 'image/jpg', 'image/jpeg']
          if (!fileType.includes(file.type)) {
            this.$notify.warning({
              title: '警告',
              message: '请上传格式为image/png, image/jpg, image/jpeg的图片'
            })
            reject()
          }
          // 图片压缩后校验图片大小
          imgToBase64(file, 800, 800).then(base64 => {
            console.log("file",file)
            const resultFile = base64ToFileObject(base64)
            const isNeed = resultFile.size / 1024 < 200
            // console.log(resultFile)
            // console.log(resultFile.type, isNeed)
            if (!isNeed) {
              this.$notify.warning({
                title: '警告',
                message: '图片过大'
              })
              reject()
            }
            resolve()
          })
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemove(file, fileList) {
        // 将本地图片跟线上图片单独分开处理（filtList不使用双向绑定）
        const oldImgList = JSON.parse(JSON.stringify(this.imgList))
        let imgFile = null
        for (let index = 0; index < oldImgList.length; index++) {
          const element = oldImgList[index]
          if (element.file.uid === file.uid) {
            imgFile = element
            // 删除线上数据
            this.$delete(this.imgList, index)
            console.log('this.imgList----', this.imgList)
            // 做数据更新
            this.$emit('input', this.imgList)
            break
          }
        }
        if (imgFile) {
          this._delete(imgFile)
        }
        this.$forceUpdate()
      },
      handleError(err, file, fileList) {
        console.log('error:', err, file, fileList)
      },
      changeValue(file, fileList){
        console.log('=============filechange',file, fileList)
        this.imgLength = file.length
        // if(fileList.length >= 1) {
        //   fileList.splice(0, 1)
        // }
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .uploadImg{
    .uploadImgContent{
      ::v-deep .el-upload{
        display: inline-block !important ;
      }
    }
    .uploadImgContentNone{
      ::v-deep .el-upload{
        display: none !important;
      }
    }
  }
    ::v-deep .el-dialog{
      margin: 5vh 0 !important;
      background: none;
      .el-dialog__headerbtn .el-dialog__close {
        color: #dddddd;
        border: 3px solid #dddddd;
        border-radius: 50%;
        font-size: 28px;
      }
      .el-dialog__body{
        height: calc( 100vh - 20vh );
        overflow: hidden;
        padding:0px 10px 10px 10px;
        text-align: center;
      }
    }
  </style>
  