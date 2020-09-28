// pages/scheduleFee/index.js
const app = getApp();
// function clearFloat(val){
//  let num=parseFloat(val);
//  return num;
// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cars:[] ,
    setting:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
 getData(){
  app._get('carCategory', {}, res => {
     let cars=res.data.carCategory  
     let setting=res.data.setting
    //  console.log(res.data)
    //  cars.forEach((item,index)=>{
    //   //  console.log(item.price)
    //   let price= clearFloat(item.price)
    //   console.log(price)
    //  })
     this.setData({
      cars,
      setting
     })
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
    this.getData()
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