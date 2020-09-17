// pages/ordersTab/index.js
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
    showModal:false,//取消订单弹框
    isChecked:false,//是否选中
    items: [
      {value: '价格太贵', name: '价格太贵'},
      {value: '客户预定时间排不下', name: '客户预定时间排不下'} 
    ],
    moreValue:''
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
  cancelOrder(e){
  //  console.log(22222)
    // let list=this.data.list;
    // let ids=e.currentTarget.dataset.index;
    // list.splice(ids,1)
 
   this.setData({
    showModal:true
   })
  // console.log(this.data.list)
  },

  //取消订单原因
  radioChange(e) {
    let values=e.detail.value
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
    if(values===''){
      wx.showToast({
        title: '请选择取消订单原因',
        icon: 'none',
        duration: 2000
      })
    }
  },
    //取消订单原因-文本框
  bindTextAreaBlur: function(e) {

    // console.log(e.detail.value)
    let moreValue=e.detail.value
    if(moreValue===''){
      wx.showToast({
        title: '请输入/选择取消订单原因',
        icon: 'none',
        duration: 2000
      })
    }
  },
    //取消订单弹框-确定
    confirmModal(){
      wx.showToast({
        title: '取消订单成功',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        showModal:false
       })
    },
    //取消订单弹框-取消
    closeModal(){
      this.setData({
        showModal:false
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