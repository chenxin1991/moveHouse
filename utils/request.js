
/**
 * 发送请求
 */
export default function request(api, method, data, {noAuth = false, noVerify = false})
{
  let Url = getApp().globalData.url;

  return new Promise((reslove, reject) => {
    wx.request({
      url: Url + '/api/' + api,
      method: method || 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: data || {},
      success: (res) => {
        if (noVerify)
          reslove(res.data, res);
        else if (res.data.status == 200)
          reslove(res.data, res);
        else if ([410000, 410001, 410002].indexOf(res.data.status) !== -1) {
        } else
          reject(res.data.msg || '系统错误');
      },
      fail: (msg) => {
        reject('请求失败');
      }
    })
  });
}

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
  request[method] = (api, data, opt) => request(api, method, data, opt || {})
});

