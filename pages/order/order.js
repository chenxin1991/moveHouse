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
    cars: [],
    cart: [],
    distance: 0,
    carCost: 0,
    largeCost: 0,
    goodsCost: 0,
    distanceCost: 0,
    floorCost: 0,
    parkingCost: 0,
    specialTimeCost: 0,
    totalCost: 0,
    carNum: 0,
    goodsNum: 0,
    mobile: '',
    remark: '',
    isOrigin:false//价格'起'
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
      cars: app.globalData.cars,
      cart: cart,
      carNum: app.globalData.carNum,
      goodsNum: app.globalData.goodsNum,
      carCost: app.globalData.carCost,
      largeCost: app.globalData.goodsCost - app.globalData.carCost,
      goodsCost: app.globalData.goodsCost,
      distanceCost: app.globalData.distanceCost,
      floorCost: app.globalData.floorCost,
      parkingCost: app.globalData.parkingCost,
      specialTimeCost: app.globalData.specialTimeCost,
      totalCost: app.globalData.totalCost,
      isOrigin:app.globalData.isOrigin
    });
  },
  getMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getRemark: function (e) {
    this.setData({
      remark: e.detail.value
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
  toOrder: function () {
    if (!app.checkIsLogin()) {
      app.doLogin();
      return false;
    }
    if (!/^1[3456789]\d{9}$/.test(this.data.mobile)) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    app._post_form('ResidentOrder/add', {
      appointDate: this.data.appointDate,
      appointTime: this.data.appointTime,
      addressFrom: JSON.stringify(this.data.addressFrom),
      addressTo: JSON.stringify(this.data.addressTo),
      distance: this.data.distance,
      cars: JSON.stringify(this.data.cars),
      cart: JSON.stringify(this.data.cart),
      mobile: this.data.mobile,
      carCost: this.data.carCost,
      largeCost: this.data.largeCost,
      distanceCost: this.data.distanceCost,
      floorCost: this.data.floorCost,
      parkingCost: this.data.parkingCost,
      specialTimeCost: this.data.specialTimeCost,
      totalCost: this.data.totalCost
    }, result => {
      if (result.code === 1) {
        try {
          wx.removeStorageSync('cart');
          wx.removeStorageSync('addressFrom');
          wx.removeStorageSync('addressTo');
          wx.navigateTo({
            url: '/pages/topay/index?status=1&id=' + result.data.id + '&number=' + result.data.number + '&create_time=' + result.data.create_time
          })
        } catch (e) {
          // Do something when catch error
        }

      }
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