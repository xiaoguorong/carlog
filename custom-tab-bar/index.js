Component({
  options: {
    styleIsolation: 'isolated'
  },
  data:{
    select:0,
    isIphoneX:wx.getStorageSync('isIphoneX'),
    list:[
      {
        "iconPath":"/image/data_unselect.png",
        "selectedIconPath":"/image/data_select.png",
        "text":"首页",
        "pagePath":"/pages/index/index"
      },
      {
        "iconPath":"/image/people_unselect.png",
        "selectedIconPath":"/image/people_select.png",
        "text":"我的",
        "pagePath":"/pages/personal-center/index"
      }
    ],
    popup:false
  },
  methods:{
    switchTab(e){
      const index = e.currentTarget.dataset.index;
      wx.switchTab({
        url: this.data.list[index].pagePath,
      })
      this.setData({
        select:index
      })
    },
    showPopup(){
      this.setData({
        popup:true
      })
    },
    closePopup(){
      this.setData({
        popup:false
      })
    },
    addCus(){
      this.closePopup();
      wx.navigateTo({
        url: '/pages/customer-add-edit/index',
      })
    },
    addStock(){
      this.closePopup();
      wx.navigateTo({
        url: '/pages/stock/index',
      })
    },
    addGoods(){
      this.closePopup();
      wx.navigateTo({
        url: '/pages/goods/index',
      })
    }
  }
})