import qiniu from './../../common/qiniuUploader'
import http from '../../common/http'
import beHaviorData from '../../common/beHavior'
Page({
  behaviors: [beHaviorData.height],
  data: {
    title:'个人信息',
    pic:'',
    userInfo:{},
    campus:{},
    src:'',
    width:250,//宽度
    height: 250,
    upToken:''
  },
  onShow(){
    this.setData({
      userInfo:wx.getStorageSync('userInfo'),
      campus:wx.getStorageSync('campus')
    })
  },
      cropperload(e){
          console.log("cropper初始化完成");
      },
      loadimage(e){
          console.log("图片加载完成",e.detail);
          wx.hideLoading();
          //重置图片角度、缩放、位置
          this.cropper.imgReset();
      },
      clickcut(e) {
          console.log(e.detail);
          //点击裁剪框阅览图片
          wx.previewImage({
              current: e.detail.url, // 当前显示图片的http链接
              urls: [e.detail.url] // 需要预览的图片http链接列表
          })
      },
      clear(){
        this.setData({
          src:''
        })
      },
      submit(){
        this.cropper.getImg((obj) => {
        qiniu.upload(obj.url, (res) => {
          this.setData({
            src:''
          })
          const data = {
            avatar:res.fileUrl
          }
          http.requestSync("/avatar",'PUT',data).then((r)=>{
            if(r.code == 200){
              let userInfo = wx.getStorageSync('userInfo')
              userInfo.avatar = obj.url;
              this.setData({
                userInfo
              })
              wx.setStorageSync('userInfo', userInfo)
            }
          })
          }, (error) => {
        console.log('error: ' + error);
          }, {
            region: 'ECN',
            uptoken:this.data.upToken,
          }, (res) => {
            console.log(res)
          }, () => {
            // 取消上传
          }, () => {
            // `before` 上传前执行的操作
          }, (err) => {
            // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
          });
        
    
      })
    },
  choosePic(){
    http.requestSync("/qiniu/token",'GET',{}).then((res)=>{
     this.setData({
       upToken:res.uptoken
    })
    wx.chooseImage({
      success: (r) => {
        console.log(r)
        console.log("rrrr")
        var filePath = r.tempFilePaths[0];
        this.setData({
          src:r.tempFilePaths[0]
        })
        this.cropper = this.selectComponent("#image-cropper");
      },
    })
  })
}
})