// pages/MyAccount/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mobile:options.mobile
    })
  },
  //解绑手机号
  unbindPhone() {
    wx.showModal({
      title: '提示',
      content: '是否解绑手机号',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          App._post_form('user/unbindPhone', {}, result => {
            wx.showToast({
              title: '解绑成功',
              icon: 'success',
              duration: 1000,
              complete: function () {
                setTimeout(function () {
                  wx.removeStorageSync('mobile');
                  wx.navigateBack();
                }, 1000);
              }
            })

          })
        } else {}
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