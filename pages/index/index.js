//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiper: []
  },
  getSwiper () {
    wx.request({
      url: 'https://movie.yaojunrong.com/swiper_news',
      success(res) {
        console.log(res)
      },
      fail(err) {

      },
      complete() {
        console.log('无论成功还是失败都会走')
      }
    })
  },
  onLoad
})
