// pages/getPhoneNumber/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getPhoneNumber(e) {
    wx.checkSession({
      success() {
        let that = this;
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          App._post_form('user/bindPhone', {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          }, result => {
            if (result.code === 1) {
              wx.setStorageSync('mobile', result.data.mobile);
              wx.navigateBack();
            }
          })
        }
      },
      fail() {
        wx.login();
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

  }
})