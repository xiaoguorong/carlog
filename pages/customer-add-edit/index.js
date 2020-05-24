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
    title:'新增客户',
    showProvince:false,
    allProvince:['京','津','沪','渝','蒙','新','藏','宁','桂','黑','吉','辽','晋','冀','青','鲁','豫','苏','皖','浙','闽','赣','湘','鄂','粤','琼','甘','陕','贵','云','川'],
    code:'',
    province:'晋',
    mobile:'',
    content:'',
    date:'',
    showDate:false,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    price:'',
    imgList:[],
    type:[0],
    upToken:'',
    carType:''
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
    if (!getCurrentPages()[getCurrentPages().length - 1].options && !getCurrentPages()[getCurrentPages().length - 1].options.id) return;
    this.setData({
      title:'编辑客户'
    })
    const data = {
     id:
     getCurrentPages()[getCurrentPages().length - 1].options.id
    }
    http.requestSync("/customer/detail","GET",data).then(res=>{
      if(res.code == 200){
        this.setData({
          code: res.content.code,
          carType:res.content.car_type,
          province: res.content.province,
          mobile: res.content.mobile,
          content: res.content.content,
          date: res.content.date,
          price: res.content.price,
          type: res.content.type.split(","),
        })
      }
    })
  },
  openProvince(){
    this.setData({
      showProvince:true
    })
  },
  closeProvince(){
    this.setData({
      showProvince:false
    })
  },
  changeProvince(e){
    var province = e.currentTarget.dataset.pro;
    this.setData({
      province,
      showProvince:false
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
  changeDate(){
    this.setData({
      showDate:false,
      date:this.data.year+'-'+(this.data.month < 10 ? '0'+this.data.month : this.data.month)+'-'+(this.data.day < 10 ? '0'+this.data.day : this.data.day)
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
  addImg(){
    wx.chooseImage({
      success: (res) => {
        http.requestSync("/qiniu/token",'GET',{}).then((res)=>{
          this.setData({
            upToken:res
         })
        })
        var imgList = this.data.imgList;
        res.tempFilePaths.forEach(e=>{
          imgList.push(e)
        })
        this.setData({
          imgList
        })
      }
    })
  },
  delImg(e){
    const index = e.currentTarget.dataset.index;
    let list = this.data.imgList;
    list.splice(index, 1); 
    this.setData({
      imgList:list
    })
  },
  checkboxChange(e){
    this.setData({
      type:e.detail.value
    })
  },
  add(){
    var data_bank_list=[];
    var pList = [];
    this.data.imgList.forEach((e,i)=>{
      var p = new Promise((resolve,reject)=>{
        qiniu.upload(e, (res) => {
          data_bank_list.push(res.fileUrl)
          resolve();
          }, (error) => {
          }, {
            region: 'ECN',
            uptoken:this.data.upToken,
          }
        )
      })
      pList.push(p)
    })
      Promise.all(pList).then((r)=>{
        const data = {
          id: getCurrentPages()[getCurrentPages().length - 1].options.id ? getCurrentPages()[getCurrentPages().length - 1].options.id : '',
          province:this.data.province,
          code:this.data.code,
          mobile:this.data.mobile,
          type:this.data.type,
          price:this.data.price,
          date:this.data.date,
          content:this.data.content,
          imgList:data_bank_list,
          carType:this.data.car_type
        }
        if (getCurrentPages()[getCurrentPages().length - 1].options.id){
          http.requestSync("/customer/edit", 'PUT', data).then((res) => {
            if(res.code == 200){
              wx.showToast({
                title: '修改成功',
                icon: 'none',
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack()
                  }, 1000)
                }
              })
            }
          })
        }else{
          http.requestSync("/customer/add", 'POST', data).then((res) => {
            wx.showToast({
              title: '添加成功',
              icon: 'none',
              success: () => {
                setTimeout(() => {
                  wx.navigateBack()
                }, 1000)
              }
            })
          })
        }
      })
  },
})