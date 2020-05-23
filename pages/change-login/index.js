import http from '../../common/http'
import login from '../../common/login'
import beHaviorData from '../../common/beHavior'
import constant from '../../common/constant'
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'账号登录'
  },

  onShow(){
    //清空storage
    wx.removeStorageSync('token')
    wx.removeStorageSync('campus')
    wx.removeStorageSync('authInfo')
    wx.removeStorageSync('campusInfo')
    wx.removeStorageSync('userInfo')
  },

  goLogin(){
    wx.navigateTo({
      url: './../login/index',
    })
  },
  goAgree1(){
    wx.navigateTo({
      url: '/pages/agreement1/index',
    })
  },
  goAgree2(){
    wx.navigateTo({
      url: '/pages/agreement2/index',
    })
  },
  getuserinfo(e){
    if(e.detail.errMsg != 'getUserInfo:ok') return;
    login.fn().then(res=>{
      if(res.data.code == 305){
        var data = {
          session_key:res.data.content.session_key,
          iv:e.detail.iv,
          encryptedData:e.detail.encryptedData
        }
        wx.request({
          url: constant.domain+'/wxuserinfo', 
          method:'POST',
          data,
          success (res) {
            if(res.statusCode == 200 && res.data.code != 200 && res.data.code != 305 && res.data.code != 303 && route != '/qiniu/token'){
              wx.showToast({
                title:res.data.msg,
                icon:'none'
              })
            }
            if(res.data.code == 200 && res.data.token_info && res.data.token_info.refresh_token == 1){
              wx.setStorageSync('token',res.data.token_info.token)
            }
            if(res.data.code == '303'){
              wx.navigateTo({
                url: './../change-login/index',
              }) 
            }
            if(res.data.code == 200){
              wx.setStorageSync('userInfo', res.data.content.user_info)
              wx.setStorageSync('campusInfo', res.data.content.campus_info)
              wx.setStorageSync('authInfo', res.data.content.content)
              wx.setStorageSync('campus', res.data.content.campus_info[0])
              setTimeout(() => { 
                wx.switchTab({
                  url: './../personal-center/index',
                })
              }, 1);
            }
          }
        })
      }else if(res.data.code == 200){
        wx.switchTab({
          url: './../personal-center/index',
        })
      }else{
        wx.showToast({
          title:res.data.msg,
          icon:'none'
        })
      }
    })
  },
})
