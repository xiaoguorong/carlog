Page({
  data: {
    title:'校区管理',
    index:0
  },
  onLoad(){
    const router = getCurrentPages()[getCurrentPages().length-1];
    const index = router.options.index;
    this.setData({
      index
    })
  }
})