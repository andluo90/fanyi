import md5 from './md5.min.js'

const appid = '20180802000191219'
const key = '02LMiYALQE2vR4q0kaef'



function translate(q, { from = 'auto', to = 'auto' } = { from: 'auto', to: 'auto' }) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.showLoading({
        title: '翻译中'
    })
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        if (res.data && res.data.trans_result) {
          wx.hideLoading()
          console.log("翻译成功")
          console.log(res.data)
          resolve(res.data)
        } else {
            wx.hideLoading()
            reject({ status: 'error', msg: res.data })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() {
        reject({ status: 'error', msg: '翻译出错' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000

        })
      }
    })
  })
}
module.exports.translate = translate