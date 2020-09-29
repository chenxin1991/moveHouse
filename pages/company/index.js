// import {
//   confirm,
//   alert,
//   ajax,
//   show,
//   hide,
//   toLogin,
// } from '../../../utils/util.js';
import {showToast} from '../../utils/util.js' 
var reg = /^1[3456789]\d{9}$/
const app = getApp();
Page({
  data: {
    submitData: {},
    shouquan: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  getInfo(detail) {
    this.setData({
      shouquan: false
    })
    console.log(detail)
    show("请稍等!");
    if (!app.globalData.open_id) {
      toLogin(app, res => {
        this.setData({
          shouquan: false,
        })
        hide();
        this.submit();
      })
    } else {

    }
    hide();
  },
  cancel() {
    this.setData({
      shouquan: false,
    })
  },
  submit() {
    //判断是否授权
    // if (!app.globalData.open_id) {
    //   this.setData({
    //     shouquan: true
    //   })
    //   return;
    // }
   
    if (!this.data.submitData.firm_name) return showToast('请输入单位名称');
    if (!this.data.submitData.name) return showToast('请输入联系人');    
    if (!this.data.submitData.phone) return showToast('请输入联系电话');
    if (!reg.test(this.data.submitData.phone)) return showToast('请输入正确的联系电话');
    if (!this.data.submitData.remark) return showToast('请输入需求描述');
    let o = this.data.submitData;
    ajax('/Index/User/unit_move', {
      contacts: o.name,
      firm_name: o.firm_name,
      tel: o.phone,
      des: o.remark,
      open_id:app.globalData.open_id
    }, res => {
      showToast('添加成功', '', res => {
        wx.navigateBack({
          delta: 1,
        })
      })
    },'GET')
  },
  getValue(e) {
    let label = e.target.id;
    let value = e.detail.value;
    let obj = this.data.submitData;
    console.log(value)
    obj[label] = value;
    this.setData({
      submitData: obj
    })

  },
  call() {
    confirm('', '是否拨打400-700-8942', res => {
      wx.makePhoneCall({
        phoneNumber: '400-700-8942',
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})