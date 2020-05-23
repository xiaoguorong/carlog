import beHaviorData from '../../common/beHavior'
import http from '../../common/http'
import regeneratorRuntime from '../../common/runtime.js'

Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'新增商品',
    name:'',
    count:0,
  },
  add(){
    const data = {
      name:this.data.name,
      count:this.data.count,
    }
    http.requestSync("/add/goods",'POST',data).then((r)=>{
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
  }
})