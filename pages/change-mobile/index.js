import http from '../../common/http'
import beHaviorData from '../../common/beHavior'
Page({
  behaviors: [beHaviorData.height],
  data: {
    password:'',
    isPassword:true,
    stage:0,
    code:'',
    mobile:'',
    countDown:'获取验证码',
    
  },
  changeType(){
    this.setData({
      isPassword:!this.data.isPassword
    })
  },
  clearMobile(){
    this.setData({
      mobile:''
    })
  },
  inputBind(e){
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let obj = {};
    obj[name] = value;
    this.setData(obj)
  },
  nextStep(){
    console.log(this)
    if(this.data.password.length == 0){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
      });
      return;
    }
    const data = {
      password:this.data.password
    }
    http.requestSync("/check/password","POST",data).then(res=>{
      console.log(res)
      if(res.code == 200){
        this.setData({
          stage:1
        });
      }
    })
  },
  getCode(){
    if(this.data.mobile.length == 0){
      wx.showToast({
        title: '请输入新手机号',
        icon: 'none',
      });
      return;
    }
    if(this.data.countDown != '获取验证码'){
      wx.showToast({
        title: '请稍后再试',
        icon: 'none',
      });
      return;
    }
    const data = {
      mobile:this.data.mobile
    }
    http.requestSync("/mobile/code","POST",data).then(res=>{
      if(res.code == 200){
        let time = 199;
        let t = setInterval(() => {
          if(time == 0){
            this.setData({
              countDown:'获取验证码'
            })
            clearInterval(t);
            return;
          }
          this.setData({
            countDown:'倒计时'+time+'秒'
          })
          time --;
        }, 1000);
      }else if(res.code == 310){
        let time = res.content - 1
        let t = setInterval(() => {
          if(time == 0){
            this.setData({
              countDown:'获取验证码'
            })
            clearInterval(t);
            return;
          }
          this.setData({
            countDown:'倒计时'+time+'秒'
          })
          time --;
        }, 1000);
      }
    })
  },
  save(){
    const data = {
      mobile:this.data.mobile,
      mobile_code:this.data.code
    }
    http.requestSync("/mobile","PUT",data).then(res=>{
      console.log(res)
      if(res.code == 200){
      }
    })
  }
})