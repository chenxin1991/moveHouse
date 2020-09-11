// pages/topay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 1,
    id: '',
    number: '',
    create_time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: options.status,
      id: options.id,
      number: options.number,
      create_time: options.create_time
    })
    if (this.data.status) {
      wx.setNavigationBarTitle({
        title: '预约成功'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '预约失败'
      })
    }
  },
  //查看订单
  checkOrder(e) {
    wx.navigateTo({
      url: '/pages/orderDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //返回首页
  backHome() {
    wx.switchTab({
      url: '/pages/index/index',
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