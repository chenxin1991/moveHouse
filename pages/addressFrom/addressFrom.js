// pages/addressFrom/addressFrom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    stairs_or_elevators: ['楼梯', '电梯'],
    parking_distance: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入'],
    active1: '',
    active2: ''
  },
  formSubmit: function(e) {
    console.info('表单提交携带数据', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  choosePlace(e) {
    let that = this

    wx.chooseLocation({
      success: res => {
        if (!res.address || !res.name) {
          wx.showToast({
            title: '请选择地址',
            duration: 2000
          });
        } else {
          that.setData({
            address: res
          })
        }
      },
      fail: res => {
        wx.getSetting({
          success: function (res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function (tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function (data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          //授权成功之后，再调用chooseLocation选择地方

                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                            duration: 1000
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    })

  },
  setType(e) {
    this.setData({
      active1: e.currentTarget.dataset.index
    });
  },
  setType2(e) {
    this.setData({
      active2: e.currentTarget.dataset.index
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