// const { delete } = require("request")

// pages/priceDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showParticulars: false, //总价明细弹框
    totalCost: 555, //明细总价
    goodsCost:333,//套餐费用
    distanceCost: 0, //超公里数费
    floorCost: 0, //楼层费
    parkingCost: 0, //停车位距离费
    specialTimeCost: 0, //特殊时间段费
    cart: [], //明细列表
    cars:[],//用车
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    // console.log(options.parkingCost)
    let distanceCost=options.distanceCost
    let floorCost=options.floorCost
    let parkingCost=options.parkingCost
    let specialTimeCost=options.specialTimeCost
    let goodsCost=options.goodsCost
    let totalCost=options.totalCost
    let cars=JSON.parse(options.cars)
    let cart = wx.getStorageSync('cart');
    let goods=this.data.goods
    // console.log(cars)
    // console.log(cart)
    
    cart.find(function (ele) {
      let id = ele.id.toString();  
      if (!id.startsWith('car_')) {
        goods.push(ele);
      }
    })

    // console.log(goods);

    this.setData({
      cart,
      distanceCost,
      floorCost,
      parkingCost,
      specialTimeCost,
      goodsCost,
      totalCost ,
      cars,
      goods
    })
  },
  toSchedule(){
 
    wx.navigateTo({
      url: '/pages/scheduleFee/index?',
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