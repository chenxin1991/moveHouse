// pages/orderDetails/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    array1: ['电梯', '楼梯'],
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderDetail(options.id)
  },
  getOrderDetail: function (id) {
    let _this = this;
    App._get('user/order/detail/' + id, {}, function (result) {
      _this.setData(result.data);
    });
  },
  //复制订单号
  copywxtap: function () {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: this.data.order.number,
      success: function (res) {
        wx.getClipboardData({
          //这个api是把拿到的数据放到电脑系统中的
          success: function (res) {
            // console.log(res.data) // data
          }
        })
      }
    })
  },
  //点击签到
  clickSign() {

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
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        let from = that.data.order.routes[0].location;
        let url = 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + res.latitude + ',' + res.longitude + '&to=' + from.lat + ',' + from.lng + '&output=json&key=OI7BZ-EGOWU-H5YVZ-4HLVW-MDUUQ-ZCFGJ';
        wx.request({
          url: url,
          method: "GET",
          success: res => {
            let distance = Math.round(res.data.result.routes[0].distance / 1000);
            wx.showToast({
              title: '距离为' + distance,
              icon: 'none',
              duration: 2000
            });
            // that.setData({
            //   distance: Math.round(res.data.result.routes[0].distance / 1000)
            // });
          }
        });
      }
    })
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