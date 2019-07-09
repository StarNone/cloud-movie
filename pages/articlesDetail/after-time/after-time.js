// pages/articlesDetail/after-time/after-time.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: String,
      observer (newVal) {
        // console.log(newVal)
        if (newVal) {
          this.getTimeStr(newVal)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dateStr: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTimeStr (time) {
      let afterDate = new Date(time)
      let nowDate = new Date()
      let zeroDate = new Date()
      let afterDateTime = Math.round(afterDate.getTime() / 1000)
      let nowDateTime = Math.round(nowDate.getTime() / 1000)
      let disTime = nowDateTime - afterDateTime
      let zeroDateTime = ''

      zeroDate.setHours(0)
      zeroDate.setMinutes(0)
      zeroDate.setSeconds(0)
      zeroDate.setMilliseconds(0)
      zeroDateTime = zeroDate.getTime() / 100

      if (disTime >= 60 && disTime < 60 * 60) {
        const min = Math.ceil(disTime / 60)
        this.setData({
          dateStr: `${min}分钟前`
        })
      } else if (disTime >= 60*60 && (zeroDateTime - afterDateTime) < 0) {
        const hour = Math.round(disTime / (60 * 60))
        this.setData({
          dateStr: `${hour}小时前`
        })
      } else if ((zeroDateTime - afterDateTime) > 0 && disTime < (60 * 60 * 24 * 30)) {
        const day = Math.ceil(disTime / (60 * 60 * 24))
        this.setData({
          dateStr: `${day}天前`
        })
      } else {
        const mouth = Math.round(disTime / (60 * 60 * 24 * 30))
        this.setData({
          dateStr: `${mouth}月前`
        })
      }
    }
  }
})
