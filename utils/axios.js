class Axios {
  constructor (options) {
    this.baseURL = options.baseURL || 'https://movie.yaojunrong.com'
  }
  sendMsg (url, data, method) {
    const _this = this
    const header = {}
    const token = wx.getStorageSync('token')
    if (token) {
      header.token = token
    }
    return new Promise ((resolve, reject) => {
      wx.request({
        url: _this.baseURL + url,
        data,
        method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header, // 设置请求的 header
        success: function(res){
          // success
          resolve(res.data)
        },
        fail: function(err) {
          // fail
          reject(err)
        },
        complete: function() {
          // complete
        }
      })
    })
  }
  get (url, data) {
    return this.sendMsg(url, data, 'GET')
  }
  post (url, data) {
    return this.sendMsg(url, data, 'POST')
  }
}

const axios = new Axios({
  baseURL: 'https://movie.yaojunrong.com'
})

module.exports = axios 