import beHaviorData from '../../common/beHavior'
import http from '../../common/http'
import qiniu from './../../common/qiniuUploader'
import regeneratorRuntime from '../../common/runtime.js'
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 2018; i <= 2088; i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'新增库存',
    count:0,
    content:'',
    date:'',
    showDate:false,
    showPopup:false,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    price:'',
    list:[],
    item:'',
    name:''
  },
  onShow(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
    month = '0' + month;
    };
    if (day < 10) {
    day = '0' + day;
    };
    this.setData({
      date:year + '-' + month + '-' + day
    })
    http.requestSync("/goodsList","GET",{}).then(res=>{
      if(res.code == 200){
        this.setData({
          list:res.content
        })
      }
    })
  },
  openDate(){
    this.setData({
      showDate:true
    })
  },
  closedate(){
    this.setData({
      showDate:false
    })
  },
  changeName(){
    this.setData({
      showDate:false,
      date:this.data.year+'-'+(this.data.month < 10 ? '0'+this.data.month : this.data.month)+'-'+(this.data.day < 10 ? '0'+this.data.day : this.data.day)
    })
  },
  changeName1(){
    this.setData({
      showPopup:false,
      name:this.data.item.name
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  bindChange1: function (e) {
    console.log(e)
    const val = e.detail.value
    this.setData({
      item:this.data.list[val[0]]
    })
  },
  add(){
    const data = {
      gid:this.data.item.id,
      count:this.data.count,
      price:this.data.price,
      date:this.data.date,
      content:this.data.content
    }
    http.requestSync("/add/stock",'POST',data).then((r)=>{
      if(r.code == 200){
        wx.showToast({
          title:'添加成功',
          icon:'none',
          success:()=>{ 
            setTimeout(()=>{
              wx.navigateBack()
            },1000)
          }
        })
      }
    })
  },
  openPopup(){
    this.setData({
      showPopup:true
    })
  },
  closePopup(){
    this.setData({
      showPopup:false
    })
  },
})