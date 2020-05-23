import beHaviorData from '../../common/beHavior'
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'关于我们',
  },
  call(){
    wx.makePhoneCall({
      phoneNumber:'18915517987'
    })
  }
})