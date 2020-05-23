import http from './../../common/http'
import beHaviorData from '../../common/beHavior'
var app = getApp();
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'校区管理',
    isLogin:false,
    userInfo:{},
  },
  goLogin(){
    wx.navigateTo({
      url: './../login/index',
    })
  },
  onShow() {
    if(wx.getStorageSync('token')){
      this.setData({
        isLogin:true,
        userInfo:wx.getStorageSync('userInfo'),
        campus:wx.getStorageSync('campus')
      })
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select:0
      })
    }
  },
  goDetail(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/article/index?index='+index,
    })
  },
  getuserinfo(e){
    if(e.detail.errMsg != 'getUserInfo:ok') return;
    app.globalData.userInfo = e.detail.userInfo;
    var data = {
      session_key:app.globalData.sessionKey,
      iv:e.detail.iv,
      encryptedData:e.detail.encryptedData
    }
    http.requestSync("/wxuserinfo",'POST',data,(res)=>{
      if(res.code == 200){
        wx.switchTab({
          url: './../personalCenter/index',
        })
      }
    })
  },
})