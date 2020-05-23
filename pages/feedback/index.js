import http from '../../common/http'
import beHaviorData from '../../common/beHavior'
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'意见反馈',
    btnTitlt:'提交反馈',
    select:1,
    mobile:'',
    content:''
  },
  onShow(){
    this.setData({
      mobile:wx.getStorageSync('userInfo').mobile
    })
  },
  changeSelect(e){
    this.setData({
      select:e.currentTarget.dataset.select
    })
  },
  inputBind(e){
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let obj = {};
    obj[name] = value;
    this.setData(obj)
  },
  feedback(){
    if(!this.data.content){
      wx.showToast({
        title: '反馈内容不能为空',
        icon: 'none',
      });
      return;
    }
    if(!this.data.mobile){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
      });
      return;
    }
    const data = {
      type:this.data.select,
      content:this.data.content,
      mobile:this.data.mobile
    }
    http.requestSync("/feedback","POST",data).then(res=>{
      if(res.code == 200){
        wx.switchTab({
          url: '/pages/personal-center/index',
        })
        wx.showToast({
          title: '反馈已提交',
          icon: 'none',
        });
      }
    })
  }
})