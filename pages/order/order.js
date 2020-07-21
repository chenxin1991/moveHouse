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
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入']
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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