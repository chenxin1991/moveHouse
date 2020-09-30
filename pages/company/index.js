import {
  showToast
} from '../../utils/util.js'
var reg = /^1[3456789]\d{9}$/
const app = getApp();
Page({
  data: {
    submitData: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit() {
    let userMobile = wx.getStorageSync('mobile');
    if (!this.data.submitData.name) return showToast('请输入单位名称');
    if (!this.data.submitData.customer) return showToast('请输入联系人');
    if (!this.data.submitData.phone) return showToast('请输入联系电话');
    if (!reg.test(this.data.submitData.phone)) return showToast('请输入正确的联系电话');
    if (!this.data.submitData.description) return showToast('请输入需求描述');
    this.data.submitData.userMobile = userMobile;
    app._post_form('CompanyOrder/add', this.data.submitData, result => {
      if (result.code === 1) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          complete: function () {
            setTimeout(function () {
              wx.navigateBack();
            }, 2000);
          }
        })
      }
    });
  },
  getValue(e) {
    let label = e.target.id;
    let value = e.detail.value;
    let obj = this.data.submitData;
    obj[label] = value;
    this.setData({
      submitData: obj
    });
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