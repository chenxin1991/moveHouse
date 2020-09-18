// pages/ordersTab/index.js
const App = getApp();

function isNull(str) {
  if (str == "" || str == undefined || str == null) return true;
}
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
        type: 'confirmed',
        title: "待确认"
      },
      {
        type: 'dispatch',
        title: "待派单"
      },
      {
        type: 'start',
        title: "待开工"
      },
      {
        type: 'complete',
        title: "待完工"
      },
      {
        type: 'comment',
        title: "待评价"
      }
    ],
    list: [],
    type: 'all',
    showModal: false, //取消订单弹框
    items: [{
        value: '价格太贵',
        name: '价格太贵'
      },
      {
        value: '客户预定时间排不下',
        name: '客户预定时间排不下'
      },
      {
        value: '3',
        name: '其他'
      }
    ],
    checkValue: '',
    moreValue: '',
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      type: option.type
    });
  },
  setTabIndex(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    });
    // 获取订单列表
    this.getOrderList(e.currentTarget.dataset.type);
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
  //订单详情
  orderDetails: function (e) {
    wx.navigateTo({
      url: '/pages/orderDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //取消订单弹框
  cancelOrder(e) {
    this.setData({
      showModal: true,
      moreValue: '',
      checkValue: '',
      id: e.currentTarget.dataset.id
    })
  },

  //取消订单原因
  radioChange(e) {
    let _this = this
    let values = e.detail.value
    // console.log('radio发生change事件，携带value值为：', values)
    const items = _this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === values
    }
    _this.setData({
      checkValue: values
    })
  },
  //取消订单原因-文本框内容
  bindTextArea: function (e) {
    let moreValue = e.detail.value
    this.setData({
      moreValue
    })
  },
  //取消订单弹框-确定
  confirmModal() {
    let _this = this
    let moreValue = _this.data.moreValue;
    let checkValue = _this.data.checkValue;
    let cancelReason = '';
    if (isNull(checkValue)) {
      wx.showToast({
        title: '请选择/输入取消订单原因',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (checkValue === '3' && isNull(moreValue)) {
      wx.showToast({
        title: '请输入取消订单原因',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (!isNull(moreValue)) {
      cancelReason = moreValue;
    } else {
      cancelReason = checkValue;
    }
    App._post_form('user/order/cancel/' + this.data.id, {
      cancelReason: cancelReason
    }, result => {
      if (result.code === 1) {
        wx.showToast({
          title: '取消订单成功',
          icon: 'none',
          duration: 2000
        });
        _this.setData({
          showModal: false
        });
      }
    });
  },
  //取消订单弹框-取消
  closeModal() {
    let _this = this
    _this.setData({
      showModal: false,
      moreValue: '',
      checkValue: ''
    })
  },
  //去评价
  toEvaluate() {
    wx.navigateTo({
      url: '/pages/evaluate/index',
    })
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
    // 获取订单列表
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