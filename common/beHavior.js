let behaviorData = Behavior({
  data: {
    statusBarHeight:wx.getStorageSync('statusBarHeight'),
    isIphoneX:wx.getStorageSync('isIphoneX'),
  },
  methods: {
    inputBind(e){
      let name = e.currentTarget.dataset.name;
      let value = e.detail.value;
      let obj = {};
      obj[name] = value;
      this.setData(obj)
    },
  }
})
module.exports = {
  height:behaviorData
}