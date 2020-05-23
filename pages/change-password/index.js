import http from '../../common/http'
import login from '../../common/login'
import beHaviorData from '../../common/beHavior'

Page({
  behaviors: [beHaviorData.height],
  data: {
    password:'',
    isPassword:true,
    nPassword:'',
    isPassword1:true,
  },
  inputBind(e){
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let obj = {};
    obj[name] = value;
    this.setData(obj)
  },
  changeType(){
    this.setData({
      isPassword:!this.data.isPassword
    })
  },
  changeType1(){
    this.setData({
      isPassword1:!this.data.isPassword1
    })
  },
  save(){
    if(this.data.password.length == 0){
      wx.showToast({
        title: '输入原密码',
        icon: 'none',
      });
      return;
    }
    if(this.data.nPassword.length == 0){
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
      });
      return;
    }
    const data = {
      password:this.data.nPassword,
      old_password:this.data.password
    }
    http.requestSync("/password",'PUT',data).then((res)=>{
      if(res.code == 200){
        wx.switchTab({
          url: './../personal-center/index',
        })
        wx.showToast({
          title: '修改成功',
          icon: 'none',
        });
      }
    })
  },
})
