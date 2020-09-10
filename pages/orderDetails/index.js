// pages/orderDetails/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    array1: ['电梯', '楼梯'],
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options.id);
  this.getOrderDetail(options.id)
  },
    getOrderDetail: function (id) {
    console.log(id);
    // return;
    let ids=parseInt(id);
    console.log('ids',ids)
        let _this = this;
        App._get('user/order/detail/' + ids,{}, function (result) {
      console.log(result.data)
          _this.setData(result.data);
    console.log('order',_this.data.order);
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