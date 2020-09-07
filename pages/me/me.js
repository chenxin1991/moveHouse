//index.js
//获取应用实例
const App = getApp()

function $attr(e, key) {
  return e.currentTarget.dataset[key]
}
Page({
  data: {
    isLogin: false,
    motto: 'Hello World',
    userInfo: {},
    orderCount: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id: 0,
    num:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let _this = this;
    _this.setData({
      isLogin: App.checkIsLogin()
    });
    if (_this.data.isLogin) {
      // 获取当前用户信息
      _this.getUserDetail();
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
  //全部订单
  allOrders: function (e) {
    if (!this.onCheckLogin()) {
      return false;
    }
    let id = $attr(e, 'id');
    console.log(id)
    wx.navigateTo({
      url: '/pages/orderList/index?id=' + id,
    })
  },
  //我的订单
  myOrder(){
    wx.navigateTo({
      url: '/pages/myOrder/index',
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