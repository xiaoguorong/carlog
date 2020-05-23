import http from './../../common/http'
import beHaviorData from '../../common/beHavior'
Page({
  behaviors: [beHaviorData.height],
  data: {
    phone:'',
    password:'',
    title:'账号登录',
    isPassword:true,
  },
  changeType(){
    this.setData({
      isPassword:!this.data.isPassword
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
  findPassword(){
    wx.navigateTo({
      url: '/pages/change-password/index',
    })
  },
  clear(){
    this.setData({
      phone:''
    })
  },
  inputBind(e){
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let obj = {};
    obj[name] = value;
    this.setData(obj)
  },
  login(){
    if(!this.data.phone){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
      });
      return;
    }
    if(!this.data.password){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
      });
      return;
    }
    var data = {
      mobile:this.data.phone,
      password:this.data.password
    }
    http.requestSync("/login",'POST',data).then(res=>{
      if(res.code == 200){
        wx.setStorageSync('userInfo', res.content.user_info)
        wx.setStorageSync('campusInfo', res.content.campus_info)
        wx.setStorageSync('authInfo', res.content.content)
        wx.setStorageSync('campus', res.content.campus_info[0])
        wx.switchTab({
          url: './../personal-center/index',
        })
      }
    })
  }
})