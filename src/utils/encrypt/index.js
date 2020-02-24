let ImgCompressor = require('img-compressor')
function blobToDataURL (blob, callback) {
  let a = new FileReader()
  a.onload = function (e) { callback(e.target.result) }
  a.readAsDataURL(blob)
}
function dataURLtoFile (dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
function xplImgCom (file, option = {}, callback) {
  let imgCompressor = new ImgCompressor.Create(option)
  imgCompressor.compress(file, {
    success: (result) => {
      blobToDataURL(result, (base) => {
        if (callback && typeof callback === 'function') {
          callback(base)
        }
      })
    }
  })
}
export default {}
