// pages/orderDetails/index.js
const App = getApp();

function isNull(str) {
  if (str == "" || str == undefined || str == null) return true;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    array1: ['电梯', '楼梯'],
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入'],
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
  onLoad: function (options) {
    this.getOrderDetail(options.id)
  },
  getOrderDetail: function (id) {
    let _this = this;
    App._get('user/order/detail/' + id, {}, function (result) {
      _this.setData(result.data);
    });
  },
  //复制订单号
  copywxtap: function () {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: this.data.order.number,
      success: function (res) {
        wx.getClipboardData({
          //这个api是把拿到的数据放到电脑系统中的
          success: function (res) {
            // console.log(res.data) // data
          }
        })
      }
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
  App._post_form('user/order/cancel/' + _this.data.id, {
    cancelReason: cancelReason
  }, result => {
    if (result.code === 1) {
      wx.showToast({
        title: '取消订单成功',
        icon: 'none',
        duration: 2000
      });
      let order=_this.data.order
      order.orderStatus='已取消'
      _this.setData({
        showModal: false,
        order
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