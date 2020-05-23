import http from '../../common/http'
import beHaviorData from '../../common/beHavior'
import regeneratorRuntime from '../../common/runtime.js'
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'消息通知',
    select:0,
    isLogin:false,
    bookUpdateNoticeData:[{"type":"1","name":"教师用书更新了","count":"355","update_time":"1581841548"}],
    coursewareUpdateNoticeData:[{"type":"2","name":"教材课件更新了","count":"1088","update_time":"1681841548"}],
    statusBarHeight:wx.getStorageSync('statusBarHeight')
  },

  change0(){
    this.setData({
      select:0
    })
  },
  change1(){
    this.setData({
      select:1
    })
  },

  async onShow(){
    if (typeof this.getTabBar == 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 1,
      })
    }


    const res = await http.requestSync("/msg/list","GET",{})
    if(res.code == 200){
      let bookUpdateNoticeData = []
      let coursewareUpdateNoticeData = []
      res.content.forEach((e,i)=>{
        if(e.type == 1){
          coursewareUpdateNoticeData.push(e)
        }
        if(e.type == 2){
          bookUpdateNoticeData.push(e)
        }
      })
      this.setData({
        bookUpdateNoticeData,
        coursewareUpdateNoticeData
      })
    }


    if(wx.getStorageSync('token')){
      this.setData({
        isLogin: true,
      })
    }
  },
})