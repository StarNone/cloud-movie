//app.js
const axios = require('./utils/axios')

App({
  globalData: {
    userInfo: null
  },
  login () {
    wx.login({
      success: function(res){
        // console.log(res)
        axios.post('/login', {
          code: res.code,
          appid: 'wx8653e828e6d93806',
          secret: '234b401c1d5e208d4b836079f8754c7d'
        }).then(res => {
          wx.setStorageSync('token', res.token)
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLaunch () {
    this.login()
  }
})