//index.js
//获取应用实例
const app = getApp()
const axios = require('../../utils/axios')

Page({
  data: {
    swiper: [],
    news: []
  },
  getSwiper () {
    axios.get('/swiper_news').then(res => {
      // console.log(res)
      this.setData({
        swiper: res.data
      })
    })
  },
  getNews () {
    axios.get('/news', {size: 5}).then(res => {
      // console.log(res)
      this.setData({
        news: res.data.map(item => {
          item.timeStr = new Date(item.update_time).toLocaleString()
          return item
        })
      })
    })
  },
  onLoad () {
    this.getSwiper()
    this.getNews()
  },
  onShow () {

  }
})
