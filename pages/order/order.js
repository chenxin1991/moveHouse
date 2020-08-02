import {
  getConfig
} from '../../api/basic.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressFrom: {},
    addressTo: {},
    flagFrom: false,
    flagTo: false,
    appointDate: '',
    appointTime: '',
    startDate: '',
    endDate: '',
    timeArray: [],
    todayTimeArray: [],
    nextTimeArray: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
    currentHour: 0,
    array1: ['电梯', '楼梯'],
    array2: ['低于30米', '30-50米', '50-100米', '100米以上', '地下室出入'],
    show: false,
    selectedGoods: [],
    selectedNum: 0,
    selectGoodsPrice: 0,
    distance: 0,
    selectedCar: [],
    floorCost: 0,
    parkingCost: 0,
    distanceCost: 0,
    totalCost: 0,
    specialTimeCost: 0,
    config: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let min_hour = 6;
    let max_month = 1;
    let startDate = this.getStartDate(min_hour);
    let endDate = this.getEndDate(max_month);
    this.setData({
      selectedGoods: app.globalData.selectedGoods,
      selectedNum: app.globalData.selectedNum,
      selectGoodsPrice: app.globalData.selectGoodsPrice,
      startDate: startDate,
      endDate: endDate,
      selectedCar: app.globalData.selectedCar
    });
    let totalCost = this.data.selectGoodsPrice + this.data.floorCost + this.data.parkingCost + this.data.distanceCost;
    this.setData({
      totalCost: totalCost
    });
    getConfig().then(res => {
      this.setData({
        config: res.data
      });
    });
  },
  getStartDate: function (h) {
    let todayTimeArray = [];
    let d = new Date();
    let hh = d.getHours();
    d.setHours(hh + h);
    let hour = d.getHours();
    for (let i = hour; i <= 23; i++) {
      let t = i.toString();
      t = t[1] ? t : '0' + t;
      todayTimeArray.push(t + ':00');
    }
    this.setData({
      todayTimeArray: todayTimeArray
    });
    let y = d.getFullYear();
    let m = d.getMonth() * 1 + 1;
    let to = d.getDate();
    return ([y, m, to]).map(function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }).join('-')
  },
  getEndDate: function (n) {
    let d = new Date();
    let mm = d.getMonth();
    d.setMonth(mm + n);
    let y = d.getFullYear();
    let m = d.getMonth() * 1 + 1;
    let to = d.getDate();
    return ([y, m, to]).map(function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }).join('-')
  },
  bindDateChange: function (e) {
    if (e.detail.value > this.data.startDate) {
      this.setData({
        timeArray: this.data.nextTimeArray
      });
    } else {
      this.setData({
        timeArray: this.data.todayTimeArray
      });
    }
    this.setData({
      appointDate: e.detail.value,
      appointTime: ''
    })
  },
  bindPickerChange: function (e) {
    let specialTimeCost = 0;
    this.setData({
      appointTime: e.detail.value
    })
    if (this.data.timeArray.length > 0) {
      let appointTime = this.data.timeArray[this.data.appointTime];
      let totalCost = this.data.selectGoodsPrice + this.data.floorCost + this.data.parkingCost + this.data.distanceCost;
      if (appointTime) {
        if (appointTime >= '19:00' && appointTime <= '23:00') {
          specialTimeCost = totalCost * (this.data.config.add_ratio1 / 100);
        } else if (appointTime > '23:00' || appointTime <= '07:00') {
          specialTimeCost = totalCost * (this.data.config.add_ratio2 / 100);
        }
        this.setData({
          specialTimeCost: Math.round(specialTimeCost)
        });

      this.getTotalCost();
      }
    }
  },
  addFrom(e) {
    wx.navigateTo({
      url: '/' + e.currentTarget.dataset.url
    })
  },
  addTo(e) {
    wx.navigateTo({
      url: '/' + e.currentTarget.dataset.url
    })
  },
  showProduct: function () {
    this.setData({
      show: true
    });
  },
  closeProduct: function () {
    this.setData({
      show: false
    });
  },
  getTotalCost: function () {
    let totalCost = this.data.selectGoodsPrice + this.data.floorCost + this.data.parkingCost + this.data.distanceCost + this.data.specialTimeCost;
    this.setData({
      totalCost: totalCost
    });
  },
  toOrder: function () {
    if (!this.data.flagFrom || !this.data.flagTo) {
      wx.showToast({
        title: '请选择起始地',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (!this.data.appointDate || !this.data.appointTime) {
      wx.showToast({
        title: '请选择预约时间',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
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
    let that = this;
    let floorCost = 0;
    let parkingCost = 0;
    if (JSON.stringify(app.globalData.addressFrom) !== "{}") {
      this.setData({
        addressFrom: app.globalData.addressFrom,
        flagFrom: true
      })
      floorCost = floorCost + this.data.addressFrom.floorCost;
      parkingCost = parkingCost + this.data.addressFrom.parkingCost;
    }
    if (JSON.stringify(app.globalData.addressTo) !== "{}") {
      this.setData({
        addressTo: app.globalData.addressTo,
        flagTo: true
      })
      floorCost = floorCost + this.data.addressTo.floorCost;
      parkingCost = parkingCost + this.data.addressTo.parkingCost;
    }

    this.setData({
      floorCost: floorCost,
      parkingCost: parkingCost
    })

    this.getTotalCost();

    // 起终点同时存在时访问
    if (this.data.flagFrom && this.data.flagTo) {
      let addressFrom = this.data.addressFrom;
      let addressTo = this.data.addressTo;
      let url = `https://apis.map.qq.com/ws/direction/v1/driving/?from=${addressFrom.address.latitude},${addressFrom.address.longitude}&to=${addressTo.address.latitude},${addressTo.address.longitude}&output=json&key=OI7BZ-EGOWU-H5YVZ-4HLVW-MDUUQ-ZCFGJ`;
      wx.request({
        url: url,
        method: "GET",
        success: res => {
          that.setData({
            distance: Math.round(res.data.result.routes[0].distance / 1000)
          });
          let distanceCost = 0;
          let selectedCar = [];
          let len = 0;
          selectedCar = that.data.selectedCar;
          len = selectedCar.length;
          for (let i = 0; i < len; i++) {
            if (that.data.distance > selectedCar[i].km_standard && that.data.distance <= 300) {
              distanceCost = distanceCost + selectedCar[i].km_price * (that.data.distance - selectedCar[i].km_standard) * selectedCar[i].num
            } else if (that.distance > 300 && that.distance <= 500) {
              distanceCost = distanceCost + (selectedCar[i].km_price * (that.data.distance - selectedCar[i].km_standard) * selectedCar[i].num * that.data.config.discount1) / 10
            } else if (that.distance > 500) {
              distanceCost = distanceCost + (selectedCar[i].km_price * (that.data.distance - selectedCar[i].km_standard) * selectedCar[i].num * that.data.config.discount2) / 10
            }
          }
          that.setData({
            distanceCost: Math.round(distanceCost)
          });
          that.getTotalCost();
        }
      })

    }
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