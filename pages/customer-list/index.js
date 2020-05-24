import http from '../../common/http'
import login from '../../common/login'
import beHaviorData from '../../common/beHavior'

Page({
  behaviors: [beHaviorData.height],
  data: {
    keyword:'',
    list:[],
    x:0,
    y:0,
    right:-230,
    touchIndex:''
  },
  onShow(){
    this.getData()
  },
  getData(){
    this.setData({
      list:[]
    })
    const data = {
      keyword: this.data.keyword,
    }
    http.requestSync("/customer/list",'GET',data).then((res)=>{
      if(res.code == 200){
        this.setData({
          list:res.content
        })
      }
    })
  },
  touchStart(e){
    console.log(e)
    this.setData({
      x:e.changedTouches[0].pageX,
      right:-200,
      touchIndex:e.currentTarget.dataset.index
    })
  },
  touchMove(e){
    console.log(this.data.x)
    console.log(this.data.x - e.changedTouches[0].pageX)
    if (this.data.x - e.changedTouches[0].pageX < 80){
      this.setData({
        right: -200 + (this.data.x - e.changedTouches[0].pageX)*2
      })
    } else if (this.data.x - e.changedTouches[0].pageX >=80 && this.data.x - e.changedTouches[0].pageX <= 100){
      this.setData({
        right: 0
      })
    }
  },
  touchEnd(e){
    this.setData({
      x:0,
    })
  },
  del(){
    const data = {
      id:this.data.list[this.data.touchIndex].id
    }
    http.requestSync("/customer/del", 'delete', data).then((res) => {
      if(res.code == 200){
        let list = this.data.list;
        list.splice(this.data.touchIndex,1)
        this.setData({
          list
        })
      }
    })
  },
  edit() {
    wx.navigateTo({
      url: '/pages/customer-add-edit/index?id='+this.data.list[this.data.touchIndex].id,
    })
  }
})
