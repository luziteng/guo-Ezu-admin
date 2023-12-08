/**
 * base64ToFileObject base64 码转 blob 二进制，再转 file 对象
 * @param  {[type]} base64 [base64码]
 * @param  {string} fileName [转码后 file 对象的名称]
 * @return {[type]} newFile[返回新的file对象]
 */
 export function base64ToFileObject(base64, fileName = 'file') {
    const mime = base64.split(',')[0].match(/:(.*?);/)[1]
    base64 = base64.split(',')[1]
    base64 = window.atob(base64)
    const u8arr = new Uint8Array(base64.length)
    for (let i = 0; i < base64.length; i++) {
      u8arr[i] = base64.charCodeAt(i)
    }
    const blob = new Blob([u8arr], { type: mime })
    const suffix = mime.split('/')[1]
    return new File([blob], `${fileName}.${suffix}`, { type: mime })
  }
  
  /**
   * imgToBase64 压缩图片
   * @param  {[type]} file      [file对象 event.target.files[0]]
   * @param  {[type]} maxWidth  [最大宽度]
   * @param  {[type]} maxHeight [最大高度]
   * @return {[type]}           [description]
   */
  
  export function imgToBase64(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      // 压缩图片需要的一些元素和对象
      const reader = new FileReader()
      const img = new Image()
      img.onload = function() {
        // 图片原始尺寸
        const originWidth = this.width
        const originHeight = this.height
        // 目标尺寸
        let targetWidth = originWidth
        let targetHeight = originHeight
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
          }
        }
        // 缩放图片需要的canvas
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight)
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight)
        const base64 = canvas.toDataURL('image/jpeg', 0.8) // 压缩后质量
        // const base64 = canvas.toDataURL()
        // console.log(canvas.toDataURL());
        resolve(base64)
      }
      reader.onload = function(e) {
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }
  