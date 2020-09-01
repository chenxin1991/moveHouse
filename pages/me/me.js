//index.js
//获取应用实例
const app = getApp()

function $attr(e, key) {
  return e.currentTarget.dataset[key]
}
Page({
  data: {
    isLogin: false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderIcon: [{
        id: '1',
        iconUrl: '/images/dispatch.png',
        iconTitle: '待派单'
      },
      {
        id: '2',
        iconUrl: '/images/start.png',
        iconTitle: '待开工'
      },
      {
        id: '3',
        iconUrl: '/images/complete.png',
        iconTitle: '待完工'
      },
      {
        id: '4',
        iconUrl: '/images/comment.png',
        iconTitle: '待评价'
      }
    ],
    id: 0
  },
  onLoad: function () {
    let _this = this;
    _this.setData({
      isLogin: app.checkIsLogin()
    });
    if (_this.data.isLogin) {
      // 获取当前用户信息
      _this.getUserDetail();
    }
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
    let id = $attr(e, 'id');
    console.log(id)
    wx.navigateTo({
      url: '/pages/orderList/index?id=' + id,
    })
  }
})