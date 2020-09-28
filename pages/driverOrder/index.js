// pages/myOrder/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      type: 'all',
      title: "全部"
    },    
    {
      type: 'start',
      title: "待开工"
    },
    {
      type: 'complete',
      title: "待完工"
    } 
  ],
  list: [],
  type: 'all'
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
    let type=e.currentTarget.dataset.type
    // console.log(type)
    this.setData({
      type 
    });
    // 获取订单列表
    this.getOrderList(type);
  },
    /**
   * 获取订单列表
   */
  getOrderList: function (type) {
    let _this = this;
    App._get('driver/order/list/' + type, {}, function (result) {
      _this.setData(result.data);
      result.data.list.length && wx.pageScrollTo({
        scrollTop: 0
      });
    });
  },
    //订单详情
    driverDetails: function (e) {
      // console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/driverDetails/index?id=' + e.currentTarget.dataset.id,
      })
    },
    //生成收款码
    paymentCode(e){
          App._get('driver/order/payUrl/' + e.currentTarget.dataset.id, {}, function (result) {
        let code_url=encodeURIComponent(result.data.code_url)
              wx.navigateTo({
                url: '/pages/paymentCode/index?code_url=' + `${code_url}`,
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