const host = 'http://39.105.12.145:3000/'

function request (url, method, contentType = 'application/json', data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      headers: {
        'content-type': contentType // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.contentType, obj.data)
}

function post (obj) {
  return request(obj.url, 'POST', obj.contentType, obj.data)
}

export default {
  request,
  get,
  post,
  host
}
