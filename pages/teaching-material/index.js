import http from '../../common/http'
import beHaviorData from '../../common/beHavior'
import regeneratorRuntime from '../../common/runtime.js'
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:"教材",
    select:0,
    isLogin:false,
    bookData:[],
    coursewareData:[],
    hasBookAuth:false,
    hasCoursewareAuth:false,
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

  onLoad(){
    console.log('B_onload')
  },

  async onShow(){
    console.log('B_onshow')

    if (typeof this.getTabBar == 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 1
      })
    }
    if (wx.getStorageSync('token')) {
      this.setData({
        isLogin: true,
        hasBookAuth: (wx.getStorageSync('campus').auth['/api/teacher/type'] ? (wx.getStorageSync('campus').auth['/api/teacher/list'] ? true : false) : false),
        hasCoursewareAuth: (wx.getStorageSync('campus').auth['/api/teaching/type'] ? (wx.getStorageSync('campus').auth['/api/teaching/list'] ? true : false) : false)
      })
      if(this.data.hasBookAuth){
        this.setData({
          bookData:[]
        })
        const res = await http.requestSync("/teacher/type","GET",{})
        if(res.code == 200){
          this.setData({
            bookData:res.content
          })
        }
      }
      if(this.data.hasCoursewareAuth){
        const res = await http.requestSync("/teaching/type","GET",{})
        this.setData({
          coursewareData:[]
        })
        if(res.code == 200){
          this.setData({
            coursewareData:res.content
          })
        }
      }
    }else{
        this.setData({
          isLogin:false,
      })
    }
  },

  onHide(){
    console.log('B_onhide')
  },

  onunload(){
    console.log('B_onunload')
  },


  goDetail(e){
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/teaching-material-detail/index?id='+id+'&select='+this.data.select+'&name='+name,
    })
  },
  login(){
    wx.navigateTo({
      url: '/pages/change-login/index',
    })
  }
})