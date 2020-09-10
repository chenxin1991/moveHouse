// pages/myOrder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
      id: '0',
      status: '',
      orderTime: '2020-08-27',
      orderStatus: '已完成',
      orderImage: [{
          imageUrl: '/images/tabar-icon/banjia-icon1.png'
        },
        {
          imageUrl: '/images/tabar-icon/banjia-icon1.png'
        },
        {
          imageUrl: '/images/tabar-icon/banjia-icon1.png'
        },
        {
          imageUrl: '/images/tabar-icon/banjia-icon1.png'
        },
        {
          imageUrl: '/images/tabar-icon/banjia-icon1.png'
        },
        {
          imageUrl: '/images/tabar-icon/banjia-icon1.png'
        },
      ],
      goodsNum: '2',
      allPrice: '178.99'
    } ]
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