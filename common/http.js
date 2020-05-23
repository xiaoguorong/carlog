import constant from './constant'
function requestSync(route,method,data){
    var header = {
      'content-type':'application/json'
    }
    if(wx.getStorageSync('token')){
      header.token = wx.getStorageSync('token')
    }
    return request(route,method,data,header)
}

function request(route,method,data,header){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: constant.domain+route, 
      method,
      header,
      data,
      success (res) {
        wx.hideLoading();
        if(res.statusCode == 200 && res.data.code != 200 && route != '/qiniu/token'){
          wx.showToast({
            title:res.data.msg,
            icon:'none'
          })
        }
        if(res.data.code == 200 && res.data.token_info && res.data.token_info.refresh_token == 1){
          wx.setStorageSync('token',res.data.token_info.token)
        }
        resolve(res.data);
      },
      fail(error){
        wx.hideLoading();
        reject(error)
      },
    })
  })
}

module.exports = {
  requestSync
}
