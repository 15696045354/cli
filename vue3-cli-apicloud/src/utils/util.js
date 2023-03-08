import { showToast } from 'vant'
import 'vant/es/toast/style'
import CryptoJS from 'crypto-js'
//DES加密
let encryptByDES = (message, key) => {
  var keyHex = CryptoJS.enc.Utf8.parse(key)
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
//DES解密
let decryptByDES = (ciphertext, key) => {
  var keyHex = CryptoJS.enc.Utf8.parse(key)
  // direct decrypt ciphertext
  var decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    },
    keyHex,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  )
  return decrypted.toString(CryptoJS.enc.Utf8)
}

const fail = (message) => {
  messageSelect(message, 'fail')
}

const success = (message) => {
  messageSelect(message, 'success')
}

const messageSelect = (message, type) => {
  return showToast({
    message: message,
    position: 'top',
    duration: 0,
    type: type,
    closeOnClick: true
  })
}

export default {
  fail,
  success,
  decryptByDES,
  encryptByDES
}
