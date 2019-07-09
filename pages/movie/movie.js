// pages/movie/movie.js
const axios = require('../../utils/axios')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: [],
    movie: [],
    pn: 1,
    size: 12
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMovies () {
    axios.get('/movies', {
      pn: this.data.pn,
      size: this.data.size
    }).then(res => {
      console.log(res)
      this.setData({
        movie: [...this.data.movie,...res.data]
      })
    })
  },
  getSwiper () {
    axios.get('/swiper').then(res => {
      console.log(res)
      this.setData({
        swiper: res.data
      })
    })
  },
  onLoad: function (options) {
    this.getSwiper()
    this.getMovies()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.setData({
      swiper: [],
      movie: [],
      pn: 1
    })
    this.getSwiper()
    this.getMovies()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pn: this.data.pn + 1
    })
    this.getMovies()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})