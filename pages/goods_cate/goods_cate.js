// pages/goods_cate/goods_cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menulist: [{
        key: 'car',
        name: '车辆'
      },
      {
        key: 'onoff',
        name: '拆装'
      },
      {
        key: 'large',
        name: '大件'
      },
      {
        key: 'material',
        name: '材料'
      },
    ],
    cars: [{
      name: '4.2米货车',
      load: '2.00',
      size: '4.2*2.0*1.9',
      price: '400.00',
      image:'/images/car1.png'
    }],
    currentIndex: 0
  },

  switchMenu: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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