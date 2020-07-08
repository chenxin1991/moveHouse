// pages/balance/balance.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 去购物
   */
  goShopping() {
    wx.switchTab({
      url: '../goods_cate/goods_cate',
    });
  },

  addCart: function (res) {
    let id = res.currentTarget.dataset.id;
    let cart = wx.getStorageSync('cart') || [];
    let exist = cart.find(function (ele) {
      return ele.id === id;
    })
    if (exist) {
      exist.num = parseInt(exist.num) + 1;
    }
    this.setData({
      cartList: cart
    });
    //购物车的图标右上方提示购物车中有多少商品
    let total = 0;
    cart.find(function (ele) {
      total += parseInt(ele.num);
    })
    wx.setStorage({
      key: 'cart',
      data: cart
    })
    wx.setStorage({
      key: 'cartNum',
      data: total.toString()
    })
    wx.setTabBarBadge({
      index: 2,
      text: total.toString()
    })
  },
  reduceCart: function (option) {
    let that = this;
    let id = option.currentTarget.dataset.id;
    let cart = wx.getStorageSync('cart') || [];
    let exist = cart.find(function (ele) {
      return ele.id === id;
    })
    if (exist) {
      if (exist.num > 1) {
        exist.num = parseInt(exist.num) - 1;
        that.setData({
          cartList: cart
        });
        let total = 0;
        cart.find(function (ele) {
          total += parseInt(ele.num);
        })
        wx.setStorage({
          key: 'cart',
          data: cart
        })
        wx.setStorage({
          key: 'cartNum',
          data: total.toString()
        })
        wx.setTabBarBadge({
          index: 2,
          text: total.toString()
        })
      } else if (exist.num == 1) {
        wx.showModal({
          title: '删除物品',
          content: '确定删除该物品吗',
          success(res) {
            if (res.confirm) {
              cart.splice(cart.findIndex(item => item.id === id), 1)
              that.setData({
                cartList: cart
              });
              let total = 0;
              cart.find(function (ele) {
                total += parseInt(ele.num);
              })
              wx.setStorage({
                key: 'cart',
                data: cart
              })
              wx.setStorage({
                key: 'cartNum',
                data: total.toString()
              })
              wx.setTabBarBadge({
                index: 2,
                text: total.toString()
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
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
    this.setData({
      cartList: wx.getStorageSync('cart')
    });
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