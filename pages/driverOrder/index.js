// pages/myOrder/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      type: 'driverAll',
      title: "全部"
    },    
    {
      type: 'driverStart',
      title: "待开工"
    },
    {
      type: 'driverComplete',
      title: "待完工"
    } 
  ],
  list: [],
  type: 'driverAll'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      type: options.type
    });
  },
  //tab切换
  setTabIndex(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    });
    // 获取订单列表
    this.getOrderList(e.target.dataset.type);
  },
    /**
   * 获取订单列表
   */
  getOrderList: function (type) {
    let _this = this;
    App._get('user/order/list/' + type, {}, function (result) {
      _this.setData(result.data);
      result.data.list.length && wx.pageScrollTo({
        scrollTop: 0
      });
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
  onShow: function () {
    this.getOrderList(this.data.type);
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