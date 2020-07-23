// pages/order/order.js
const util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressFrom: {},
    addressTo: {},
    flagFrom: false,
    flagTo: false,
    appointDate: '',
    appointTime: '',
    startDate: util.getToday(),
    endDate: util.maxAppointDate(6),
    array: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    array1: ['电梯', '楼梯'],
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入'],
    show: false,
    selectedGoods: [],
    selectedNum: 0,
    selectCountPrice: 0,
    distance: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let selectedGoods = JSON.parse(options.selectedGoods)
    let selectedNum = options.selectedNum;
    let selectCountPrice = options.selectCountPrice;
    this.setData({
      selectedGoods: selectedGoods,
      selectedNum: selectedNum,
      selectCountPrice: selectCountPrice
    });
  },
  bindDateChange: function (e) {
    this.setData({
      appointDate: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      appointTime: e.detail.value
    })
  },
  addFrom(e) {
    wx.navigateTo({
      url: '/' + e.currentTarget.dataset.url
    })
  },
  addTo(e) {
    wx.navigateTo({
      url: '/' + e.currentTarget.dataset.url
    })
  },
  showProduct: function () {
    this.setData({
      show: true
    });
  },
  closeProduct: function () {
    this.setData({
      show: false
    });
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
    if (JSON.stringify(app.globalData.addressFrom) !== "{}") {
      this.setData({
        addressFrom: app.globalData.addressFrom,
        flagFrom: true
      })
    }
    if (JSON.stringify(app.globalData.addressTo) !== "{}") {
      this.setData({
        addressTo: app.globalData.addressTo,
        flagTo: true
      })
    }

    // 起终点同时存在时访问
    if (this.data.flagFrom && this.data.flagTo) {
      let addressFrom = this.data.addressFrom;
      let addressTo = this.data.addressTo;
      let url = `https://apis.map.qq.com/ws/direction/v1/driving/?from=${addressFrom.address.latitude},${addressFrom.address.longitude}&to=${addressTo.address.latitude},${addressTo.address.longitude}&output=json&key=OI7BZ-EGOWU-H5YVZ-4HLVW-MDUUQ-ZCFGJ`;
      wx.request({
        url: url,
        method: "GET",
        success: res => {
          that.setData({
            distance: Math.round(res.data.result.routes[0].distance / 1000)
          });
        }
      })
    }
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