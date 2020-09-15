//index.js
//获取应用实例
const App = getApp();

Page({
  data: {
    isLogin: false,
    userInfo: {},
    orderCount: {},
    id: 0,
    num: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      isLogin: App.checkIsLogin()
    });
    if (this.data.isLogin) {
      // 获取当前用户信息
      this.getUserDetail();
    }
  },
  /**
   * 获取当前用户信息
   */
  getUserDetail() {
    let _this = this;
    App._get('user/detail', {}, result => {
      _this.setData(result.data);
    });
  },
  /**
   * 跳转到登录页
   */
  onLogin() {
    wx.navigateTo({
      url: '../login/login',
    });
  },
  //我的账号
  toMyAccount(){
    wx.navigateTo({
      url: '/pages/myAccount/index',
    })
  },
  //全部订单
  allOrders: function (e) {
    if (!this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/orderList/index?type=' + e.currentTarget.dataset.type,
    })
  },
  //我的订单
  driverOrder() {
    wx.navigateTo({
      url: '/pages/driverOrder/index',
    })
  },
  coupon: function () {

  },
  /**
   * 验证是否已登录
   */
  onCheckLogin() {
    let _this = this;
    if (!_this.data.isLogin) {
      App.showError('很抱歉，您还没有登录');
      return false;
    }
    return true;
  }
})