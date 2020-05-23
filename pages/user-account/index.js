import http from '../../common/http'
import beHaviorData from '../../common/beHavior'

Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'账号管理',
    mobile:'',
    userInfo:{},
    statusBarHeight:wx.getStorageSync('statusBarHeight')
  },
  onShow(){
    if(wx.getStorageSync('token')){
      this.setData({
        userInfo:wx.getStorageSync('userInfo'),
        mobile:wx.getStorageSync('userInfo').mobile.substring(0,3)+"****"+wx.getStorageSync('userInfo').mobile.substring(7,11)
      })
    }
  },
  goLogin(){
    wx.navigateTo({
      url: './../login/index',
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  },
  logout(){
    wx.removeStorageSync('token');
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('campusInfo');
    wx.removeStorageSync('authInfo');
    wx.removeStorageSync('campus');
    wx.switchTab({
      url: '/pages/personal-center/index',
    })
  },
  changeMobile(){
    wx.navigateTo({
      url: '/pages/change-mobile/index',
    })
  },
  changePassword(){
    wx.navigateTo({
      url: '/pages/change-password/index',
    })
  }
})