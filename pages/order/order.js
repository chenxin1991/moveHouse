const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressFrom: {},
    addressTo: {},
    appointDate: '',
    appointTime: '',
    array1: ['电梯', '楼梯'],
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入'],
    show: false,
    cart: [],
    distance: 0,
    goodsCost: 0,
    distanceCost: 0,
    floorCost: 0,
    parkingCost: 0,
    specialTimeCost: 0,
    totalCost: 0,
    goodsNum: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressFrom = wx.getStorageSync('addressFrom');
    let addressTo = wx.getStorageSync('addressTo');
    let cart = wx.getStorageSync('cart');
    this.setData({
      addressFrom: addressFrom,
      addressTo: addressTo,
      distance: app.globalData.distance,
      appointDate: app.globalData.appointDate,
      appointTime: app.globalData.appointTime,
      cart: cart,
      goodsNum: app.globalData.goodsNum,
      goodsCost: app.globalData.goodsCost,
      distanceCost: app.globalData.distanceCost,
      floorCost: app.globalData.floorCost,
      parkingCost: app.globalData.parkingCost,
      specialTimeCost: app.globalData.specialTimeCost,
      totalCost: app.globalData.totalCost
    });
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
  toOrder: function () {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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