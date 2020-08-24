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
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入'],
    cars: [],
    floorCost: 0,
    parkingCost: 0
  },
  formSubmit: function (e) {
    let address = this.data.address;
    if (JSON.stringify(address) === "{}") {
      wx.showToast({
        title: '请选择搬入点',
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

    let addressTo = {};
    addressTo.address = address;
    addressTo.stairs_or_elevators = stairs_or_elevators;
    addressTo.parking_distance = parking_distance;
    addressTo.room_number = room_number;
    addressTo.floor_num = floor_num;
    app.globalData.addressTo = addressTo;
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cars: app.globalData.cars
    });
    let addressTo = app.globalData.addressTo;
    if (addressTo) {
      this.setData({
        address: addressTo.address,
        room_number: addressTo.room_number,
        stairs_or_elevators: addressTo.stairs_or_elevators,
        floor_num: addressTo.floor_num,
        parking_distance: addressTo.parking_distance
      })
      this.getFloorCost();
      this.getParkingCost();
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
              duration: 1000
            })
          }
        })
      }
    })
  },
  getInput(e) {
    this.setData({
      floor_num: e.detail.value
    });
    this.getFloorCost();
  },
  setType(e) {
    this.setData({
      stairs_or_elevators: e.currentTarget.dataset.index
    });
    this.getFloorCost();
  },
  setType2(e) {
    this.setData({
      parking_distance: e.currentTarget.dataset.index
    });
    this.getParkingCost();
  },
  getFloorCost() {
    let floorCost = 0;
    let cars = this.data.cars;
    let floor_num = this.data.floor_num;
    if (this.data.stairs_or_elevators == '1' && floor_num > 0) {
      cars.forEach(function (val) {
        floorCost += (floor_num - val.floor_standard + 1) * val.floor_price * val.num
      });
    }
    this.setData({
      floorCost: Math.round(floorCost)
    });
  },
  getParkingCost() {
    let that = this;
    let parkingCost = 0;
    let cars = this.data.cars;
    cars.forEach(function (val) {
      switch (that.data.parking_distance) {
        case 0:
          parkingCost += val.distance1 * val.num;
          break;
        case 1:
          parkingCost += val.distance2 * val.num;
          break;
        case 2:
          parkingCost += val.distance3 * val.num;
          break;
        case 3:
        case 4:
          parkingCost += val.distance4 * val.num;
          break;
        default:
          break;
      }
    });
    this.setData({
      parkingCost: Math.round(parkingCost)
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