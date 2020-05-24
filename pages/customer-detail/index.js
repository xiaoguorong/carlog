import http from '../../common/http'
import beHaviorData from '../../common/beHavior'
import regeneratorRuntime from '../../common/runtime.js'
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'客户详情',
    detail:{}
  },
  onShow(){
    const data = {
      id: getCurrentPages()[getCurrentPages().length - 1].options.id
    }
    http.requestSync("/customer/detail", 'GET', data).then((res) => {
      if(res.code == 200){
        this.setData({
          detail:res.content
        })
      }
    })
  },
})