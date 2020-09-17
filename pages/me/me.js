//index.js
//获取应用实例
const App = getApp();
var toHide = function (array) {
  var mphone = array.substring(0, 3) + '****' + array.substring(7);
  return mphone;
}
Page({
  data: {
    isLogin: false,
    userInfo: {},
    orderCount: {},
    driverOrderCount:{},
    isDriver: false,
    id: 0,
    num: 0,
    mobile: ''
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
      let mobile = toHide(_this.data.userInfo.mobile)
      this.setData({
        mobile
      })
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
  //跳转到绑定手机号页面
  bindPhone() {
    wx.navigateTo({
      url: '../getPhoneNumber/index',
    });
  },
  //我的账号
  toMyAccount() {
    if (this.data.userInfo.mobile) {
      wx.navigateTo({
        url: '/pages/myAccount/index?mobile=' + this.data.mobile,
      })
    }
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
  //司机端-我的订单
  driverOrder(e) {
    if (!this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/driverOrder/index?type=' + e.currentTarget.dataset.type,
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