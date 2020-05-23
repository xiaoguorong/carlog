import beHaviorData from '../../common/beHavior'

Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'切换校区',
    campus:{},
    campusInfo:[],
    select:0
  },

  onLoad(){
    console.log('C_onload')
  },

  onShow(){
    console.log('C_onshow')
    this.setData({
      campusInfo:wx.getStorageSync('campusInfo'),
      campus:wx.getStorageSync('campus')
    })
    this.data.campusInfo.forEach((e,i)=>{
      if(e.camid == this.data.campus.camid){
        this.setData({
          select:i
        })
      }
    })
  },

  onHide(){
    console.log('C_onhide')
  },

  onUnload(){
    console.log('C_onunload')
  },



  changeCampus(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      select:index
    })
    wx.setStorageSync('campus',this.data.campusInfo[index])

    wx.switchTab({
      url: '/pages/personal-center/index',
    })
  }
})
