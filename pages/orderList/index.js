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
        title:"待确认"
      },
      {
        id:2,
        title:"待派单"
      },
      {
        id:3,
        title:"待开工"
      },
      {
        id:4,
        title:"待完工"
      },
      {
        id:5,
        title:"待评价"
      }
    ],
    activeIndex:0,
    moduleId:0,
    ids:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option){
    var _this=this;
  //  console.log(this.data.tabList)
  _this.ids=option.id
  },
  setTabIndex(e){
    var _this=this;
    let activeIndex = $attr(e, 'id')
    let moduleId=$attr(e,'id')
    // console.log('1111',activeIndex)
    // console.log('moduleId',moduleId)
    _this.setData({
      activeIndex,
      moduleId
    })
  },
  onMyEvent: function(e){
    e.detail // 自定义组件触发事件时提供的detail对象
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
    let activeIndex = Number(this.ids)
    console.log('2222',activeIndex)
    this.setData({
      activeIndex
    })
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