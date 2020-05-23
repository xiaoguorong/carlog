import constant from './constant'

function getCode(){
   return new  Promise((resolve, reject) => {
      wx.login({
        success(res) {
          if (res.code) {
            resolve(res);
          } else {
            reject(res);
          }
        },
        fail(err) {
          console.log('wxLogin错误:', err);
          reject(err);
        }
      })
    })
}
function getUnionId(code){
    return  new Promise((resolve, reject) => {
          wx.showLoading({
            title:  '加载中',
          })
          wx.request({
            url:  constant.domain + '/wxlogin',
            method: 'POST',
            data: { code: code },
            success (res)  {
              wx.hideLoading();
              if (res.data.code  ==  200) {
                wx.setStorageSync('userInfo',  res.data.content.user_info)
                wx.setStorageSync('campusInfo',  res.data.content.campus_info)
                wx.setStorageSync('authInfo',  res.data.content.content)
                wx.setStorageSync('campus', (res.data.content.campus_info && res.data.content.campus_info.length > 0 ? res.data.content.campus_info[0] : {}))
              }
              if (res.data.code  ==  200  &&  res.data.token_info && res.data.token_info.refresh_token  ==  1) {
                wx.setStorageSync('token', res.data.token_info.token)
              }
              resolve(res)
            },
            fail(err) {
              reject(err)
          }
    })
  })
}
function fn(){
  return new Promise((resolve1, reject1) => {
    getCode().then((res)=>{
      resolve1(getUnionId(res.code))
    })
  })
}
module.exports = {
    fn
}