// pages/movieDetail/movieDetail.js
const axios = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    url: '',
    activeindex: 0,
    guess: [],
    currentTime: 0,
    continueTime: 0,
    isFirst: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getGuess (id) {
    axios.get('/guess', {
      id
    }).then(res => {
      this.setData({
        guess: res.data.map(item => {
          item.actorStr = item.actors.join(" ")
          return item
        })
      })
    })
  },
  changeUrl (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      url: this.data.movie.links[index],
      activeindex: Number(index)
    })
  },
  getMovie (id) {
    axios.get(`/movies/${id}`).then(res => {
      // console.log(res)
      this.setData({
        movie: res.data,
        url: res.data.links[0]
      })
    })
  },
  getCurrentTime (e) {
    const {currentTime} = e.detail
    if (this.data.isFirst) {
      const videoCtx = wx.createVideoContext('video')
      videoCtx.seek(Number(this.data.continueTime))
      this.setData({
        isFirst: false
      })
    }
    this.setData({
      currentTime
    })
  },
  uploadPlayStatus () {
    axios.post('/movie_history', {
      movie_id: this.data.movie._id,
      continue_time: this.data.currentTime,
      index: this.data.activeindex
    })
  },
  jump () {
    this.uploadPlayStatus()
  },
  getHistory (id) {
    axios.get(`/movie_history/${id}`).then(res => {
      this.setData({
        movie: res.data.movie,
        url: res.data.movie.links[Number(res.data.index)],
        activeindex: res.data.index,
        continueTime: res.data.continueTime
      })
      const videoCtx = wx.createVideoContext('video')
      videoCtx.play()
      this.getGuess(res.data.movie._id)
    })
  },
  onLoad: function (options) {
    const {id} = options
    this.getHistory(id)
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
    this.uploadPlayStatus()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})