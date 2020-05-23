
import regeneratorRuntime from './common/runtime'
App({
  onLaunch () {
    //获取状态栏高度，用于头部自定义导航样式
    wx.getSystemInfo({
      success (res) {
        wx.setStorageSync('statusBarHeight', res.statusBarHeight)
        if (res.model.search('iPhone X') != -1) {
          wx.setStorageSync('isIphoneX', 1)
        }
      }
    })
  },
})