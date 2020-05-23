import http from './../../common/http'
import beHaviorData from '../../common/beHavior'
import moment from './../../common/moment.js'
var app = getApp();
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'首页',
    isLogin:false,
    count: {
      customerCount: 0,
      goodsAddCount: 0,
      goodsRemoveCount: 0
    }
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
  getData(e){
    var index = e.currentTarget.dataset.index;
    console.log(index)
    if(index == 0){
      var data = {
        start: moment().startOf('day').valueOf()/1000,
        end: (moment().endOf('day').valueOf()+1)/1000-1
      }
    }else if(index == 1){
      var data = {
        start: moment().startOf('week').add(1, 'day').format('X'),
        end: moment().endOf('week').add(1, 'day').format('X')
      }
    }else if(index == 2){
      var data = {
        start: moment().startOf('month').format('X'),
        end: moment().endOf('month').format('X')
      }
    }
    http.requestSync("/getCrm", 'GET', data).then((res) => {
      this.setData({
        count: res.content
      })
    });
  }
})