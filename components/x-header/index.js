Component({
  properties: {
    title: { 
      type: String,
      value: ''
    },
    isBack:{
      type:String,
      value:'true'
    },
    isIcon:{
      type:String,
      value:'true'
    }
  },
  data:{
    statusBarHeight:wx.getStorageSync('statusBarHeight')
  },
  methods:{
    back(){
      wx.navigateBack({
        delta: 1
      })
    },
    goSetting(){
      wx.navigateTo({
        url:'/pages/user-account/index'
      })
    }
  }
})