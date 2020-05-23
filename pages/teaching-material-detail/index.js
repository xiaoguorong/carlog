import http from '../../common/http'
import beHaviorData from '../../common/beHavior'
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:"教材",
    select:0,
    list:[]
  },
  onShow(e){
    const router = getCurrentPages()[getCurrentPages().length-1];
    const select = router.options.select;
    const id = router.options.id;
    this.setData({
      title:router.options.name
    })
    const data = {
      classify_id:id
    }
    if(select == 0){
      http.requestSync("/teacher/list","GET",data).then(res=>{
        if(res.code == 200){
          var list = res.content.map((v)=>{
						var ramdom = Math.ceil(Math.random()*1000);
						v.random = ramdom;
						v.random_total = ramdom*Math.ceil(Math.random()+1.3);
						return v;
					})
          this.setData({
            list
          })
        }
      })
    }else{ 
      http.requestSync("/teaching/list","GET",data).then(res=>{
        if(res.code == 200){
          var list = res.content.map((v)=>{
						var ramdom = Math.ceil(Math.random()*1000);
						v.random = ramdom;
						v.random_total = ramdom*Math.ceil(Math.random()+1.3);
						return v;
					})
          this.setData({
            list
          })
        }
      })
    }
  },
  change0(){
    this.setData({
      select:0
    })
  },
  change1(){
    this.setData({
      select:1
    })
  },
  goDetail(e){
      wx.showLoading({
        title: '加载中',
      })
      wx.downloadFile({
        url: "https://static.solearn.cn/"+e.currentTarget.dataset.url,
        success: function(res) {
          var filePath = res.tempFilePath;
          wx.openDocument({
            filePath: filePath,
            fileType: 'pdf',
            success: function(res) {
              wx.hideLoading();
            },
            fail: function(res) {
                
            },
            complete: function(res) {
                
            }
          })
        },
        fail: function(res) {
            console.log('文件下载失败');
        },
        complete: function(res) {},
      })
  }
})