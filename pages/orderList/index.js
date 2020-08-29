// pages/ordersTab/index.js

function $attr(e, key) {
  return e.currentTarget.dataset[key]
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[
      {
        id:0,
        title:"全部"
      },
      {
        id:1,
        title:"代付款"
      },
      {
        id:2,
        title:"待配送"
      },
      {
        id:3,
        title:"待收货"
      },
      {
        id:4,
        title:"待评价"
      }
    ],
    activeIndex:0,
    moduleId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option){
   console.log(this.data.tabList)
  },
  setTabIndex(e){
    let activeIndex = $attr(e, 'id')
    let moduleId=$attr(e,'id')
    // console.log(activeIndex)
    console.log('moduleId',moduleId)
    this.setData({
      activeIndex,
      moduleId
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