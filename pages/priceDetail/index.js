// pages/priceDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showParticulars: false, //总价明细弹框
    priceList: [{
        name: '大车',
        price: 222
      },
      {
        name: '大沙发',
        price: 222
      }, {
        name: '冰箱洗衣机电饭锅',
        price: 222
      }, {
        name: '起始点全程电梯或楼梯1层',
        price: 222
      }, {
        name: '里程10公里',
        price: 222
      }
    ], //明细列表
    allPrice: 555, //明细总价
    PackageFee:333,//套餐费用
    vehicleType:[
      {
        name:'货车1',
        distance:'33',
        price:'66'
      },
      {
        name:'货车2',
        distance:'33',
        price:'66'
      }, {
        name:'货车3',
        distance:'33',
        price:'66'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toSchedule(){
    wx.navigateTo({
      url: '/pages/scheduleFee/index',
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