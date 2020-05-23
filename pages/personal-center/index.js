import http from '../../common/http'
import beHaviorData from '../../common/beHavior'
import regeneratorRuntime from '../../common/runtime.js'
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'我的',
    isLogin:false,
    count:{
      customerCount:0,
      goodsCount:0,
      goodsAllCount:0
    }
  },
  onShow(){
    if(wx.getStorageSync('token')){
      //初始化变量
      this.setData({
        isLogin:true,
      })
      http.requestSync("/getData", 'GET', {}).then((res) => {
        this.setData({
          count: res.content
        })
      });
    }
    if (typeof this.getTabBar == 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 1
      })
    }
  },
  getPhoneNumber(e){
    wx.login({
      async success(res) {
        if (res.code) {
          const content = await http.requestSync("/getSessionKey",'GET',{code:res.code});
          const data = {
            encrypt: encodeURIComponent(e.detail.encryptedData),
            iv: encodeURIComponent(e.detail.iv),
            sessionKey: encodeURIComponent(content.session_key)
          }
          http.requestSync("/getMobile",'POST',data).then(res=>{
            if(res.code == 200){
              wx.showToast({
                title: '登陆成功',
                icon: 'none'
              })
              http.requestSync("/getData", 'GET', {}).then((res) => {
                this.setData({
                  count: res.content
                })
              });
            }
          })
        }
      },
      fail(err) {
        console.log('wxLogin错误:', err);
      }
    })
  },
})