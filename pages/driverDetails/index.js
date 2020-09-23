// pages/orderDetails/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    array1: ['电梯', '楼梯'],
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入'],
    signSuccess:false//签到成功
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderDetail(options.id)
  },
  //获取数据
  getOrderDetail: function (id) {
 let _this=this
    App._get('user/order/detail/' + id, {}, function (result) {
      _this.setData(result.data);
    });
  },
  //点击签到
  clickSign() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        let from = that.data.order.routes[0].location;
        let distance = Number(that.juli(from.lat, from.lng, res.latitude, res.longitude));
        if (distance > 1) {
          wx.showToast({
            title: '请到起点附近签到',
            icon: 'none',
            duration: 2000
          });
        } else {
          App._post_form('user/order/signIn/' + that.data.order.id, {}, result => {
            if (result.code === 1) {
              wx.showToast({
                title: '签到成功',
                icon: 'none',
                duration: 2000
              });
              that.setData({
                signSuccess:true
              })
            }  
          });
        }
      }
    })
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

  },
  // 计算两地之间的距离
  juli: function (lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;
  }
})