//index.js
//获取应用实例
const app = getApp()
function $attr(e, key) {
  return e.currentTarget.dataset[key]
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderIcon:[
      {
        id:'1',
        iconUrl:'/images/dispatch.png',
        iconTitle:'待派单'
      },
      { id:'2',
        iconUrl:'/images/start.png',
        iconTitle:'待开工'
      },
      { id:'3',
        iconUrl:'/images/complete.png',
        iconTitle:'待完工'
      },
      { id:'4',
        iconUrl:'/images/comment.png',
        iconTitle:'待评价'
      }
    ],
    id:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //全部订单
  allOrders: function(e){
   let id=$attr(e,'id');
   console.log(id)
    wx.navigateTo({
      url: '/pages/orderList/index?id='+id,
    })
  }
})
