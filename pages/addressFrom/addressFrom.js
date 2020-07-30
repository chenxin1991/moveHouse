// pages/addressFrom/addressFrom.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    room_number: '',
    stairs_or_elevators: '',
    floor_num: '',
    parking_distance: '',
    array1: ['电梯', '楼梯'],
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入']
  },
  formSubmit: function (e) {
    let address = this.data.address;
    if (JSON.stringify(address) === "{}") {
      wx.showToast({
        title: '请选择搬出点',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    let room_number = e.detail.value.room_number;
    if (room_number === "") {
      wx.showToast({
        title: '请填写门牌号',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    let stairs_or_elevators = this.data.stairs_or_elevators;
    if (stairs_or_elevators === "") {
      wx.showToast({
        title: '请选择楼梯类型',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    let floor_num = e.detail.value.floor_num;
    if (floor_num === "") {
      wx.showToast({
        title: '请填写楼层数',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    let parking_distance = this.data.parking_distance;
    if (parking_distance === "") {
      wx.showToast({
        title: '请选择停车位距离',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    let addressFrom = {};
    addressFrom.address = address;
    addressFrom.stairs_or_elevators = stairs_or_elevators;
    addressFrom.parking_distance = parking_distance;
    addressFrom.room_number = room_number;
    addressFrom.floor_num = floor_num;
    app.globalData.addressFrom = addressFrom;
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (JSON.stringify(app.globalData.addressFrom) !== "{}") {
      let addressFrom = app.globalData.addressFrom;
      this.setData({
        address: addressFrom.address,
        room_number: addressFrom.room_number,
        stairs_or_elevators: addressFrom.stairs_or_elevators,
        floor_num: addressFrom.floor_num,
        parking_distance: addressFrom.parking_distance
      })
    }
  },
  choosePlace(e) {
    let that = this
    wx.chooseLocation({
      success: res => {
        if (!res.address || !res.name) {
          wx.showToast({
            title: '请选择地址',
            icon: 'none',
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
                            duration: 2000
                          })
                          //授权成功之后，再调用chooseLocation选择地方

                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                            duration: 2000
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
              duration: 2000
            })
          }
        })
      }
    })

  },
  getInput(e) {
    
    // this.setData({
    //   floor_num: e.detail.value
    // });
  },
  setType(e) {
    this.setData({
      stairs_or_elevators: e.currentTarget.dataset.index
    });
  },
  setType2(e) {
    this.setData({
      parking_distance: e.currentTarget.dataset.index
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