import {
  getCategoryList
} from '../../api/basic.js';

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    navActive: 0,
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
    distance: 0,
    selectedCar: [],
    floorCost: 0,
    parkingCost: 0,
    distanceCost: 0,
    specialTimeCost: 0,
    config: {},
    cart: [],
    carNum: 0,
    total: 0,
    hide_good_box: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.getAllCategory();
    let min_hour = 6;
    let max_month = 1;
    let startDate = this.getStartDate(min_hour);
    let endDate = this.getEndDate(max_month);
    this.busPos = {};
    this.busPos['x'] = app.globalData.ww * 0.9;
    this.busPos['y'] = app.globalData.hh * 0.9;
    this.setData({
      startDate: startDate,
      endDate: endDate,
    });
  },
  touchOnGoods: function (e) {
    // 如果good_box正在运动
    if (!this.data.hide_good_box) return;
    this.finger = {};
    var topPoint = {};
    this.finger['x'] = app.globalData.ww - e.touches["0"].clientX;
    this.finger['y'] = e.touches["0"].clientY;
    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }
    topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2 + this.finger['x'];
    this.linePos = app.bezier([this.finger, topPoint, this.busPos], 30);
    this.startAnimation();
  },
  startAnimation: function () {
    var index = 0,
      that = this,
      bezier_points = that.linePos['bezier_points'];
    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    this.timer = setInterval(function () {
      index++;
      that.setData({
        bus_x: app.globalData.ww - bezier_points[index]['x'],
        bus_y: bezier_points[index]['y']
      })
      if (index >= 29) {
        clearInterval(that.timer);
        that.setData({
          hide_good_box: true,
          hideCount: false,
          total: that.data.total + 1
        })
      }
    }, 33);
  },
  getAllCategory: function () {
    let that = this;
    getCategoryList().then(res => {
      let addressFrom = wx.getStorageSync('addressFrom');
      if (addressFrom) {
        this.setData({
          addressFrom: addressFrom,
          flagFrom: true
        })
      }
      let addressTo = wx.getStorageSync('addressTo');
      if (addressTo) {
        this.setData({
          addressTo: addressTo,
          flagTo: true
        })
      }
      let cart = wx.getStorageSync('cart');
      console.log('onload', cart);
      let total = 0;
      //如果存在缓存
      if (cart && cart.length > 0) {
        //购物车中，后台存在的有价格物品，刷新名称和单价；不存在的物品，不做改动。
        that.refreshCart(res.data, cart);
        cart.find(function (ele) {
          total += parseInt(ele.num);
        })
      }
      this.setData({
        products: res.data,
        total: total
      });
      that.infoScroll();
    })
  },
  getCost: function () {
    let carNum = 0;
    let that = this;
    let selectedCar = [];
    let cartList = this.data.cartList;
    let len2 = cartList.length;
    for (let i = 0; i < len2; i++) {
      let id = cartList[i].id.toString();
      if (id.startsWith('car_')) {
        selectedCar.push(cartList[i]);
        carNum = carNum + cartList[i].num;
      }
    }
    this.setData({
      carNum: carNum
    });
    app.globalData.selectedCar = JSON.parse(JSON.stringify(selectedCar));
    let floorCost = 0;
    let parkingCost = 0;
    let len = selectedCar.length;
    if (this.data.flagFrom) {
      let floorCostFrom = 0;
      let parkingCostFrom = 0;
      let floor_num = this.data.addressFrom.floor_num;
      if (this.data.addressFrom.stairs_or_elevators == '1' && floor_num > 0) {
        for (let i = 0; i < len; i++) {
          floorCostFrom = floorCostFrom + (floor_num - selectedCar[i].floor_standard + 1) * selectedCar[i].floor_price * selectedCar[i].num
        }
      }
      floorCost = floorCost + floorCostFrom;
      for (let i = 0; i < len; i++) {
        switch (this.data.addressFrom.parking_distance) {
          case 0:
            parkingCostFrom = parkingCostFrom + selectedCar[i].distance1 * selectedCar[i].num;
            break;
          case 1:
            parkingCostFrom = parkingCostFrom + selectedCar[i].distance2 * selectedCar[i].num;
            break;
          case 2:
            parkingCostFrom = parkingCostFrom + selectedCar[i].distance3 * selectedCar[i].num;
            break;
          case 3:
          case 4:
            parkingCostFrom = parkingCostFrom + selectedCar[i].distance4 * selectedCar[i].num;
            break;
          default:
            break;
        }
      }
      parkingCost = parkingCost + parkingCostFrom;
    }
    if (this.data.flagTo) {
      let floorCostTo = 0;
      let parkingCostTo = 0;
      let floor_num = this.data.addressTo.floor_num;
      if (this.data.addressTo.stairs_or_elevators == '1' && floor_num > 0) {
        for (let i = 0; i < len; i++) {
          floorCostTo = floorCostTo + (floor_num - selectedCar[i].floor_standard + 1) * selectedCar[i].floor_price * selectedCar[i].num
        }
      }
      floorCost = floorCost + floorCostTo;
      for (let i = 0; i < len; i++) {
        switch (this.data.addressTo.parking_distance) {
          case 0:
            parkingCostTo = parkingCostTo + selectedCar[i].distance1 * selectedCar[i].num;
            break;
          case 1:
            parkingCostTo = parkingCostTo + selectedCar[i].distance2 * selectedCar[i].num;
            break;
          case 2:
            parkingCostTo = parkingCostTo + selectedCar[i].distance3 * selectedCar[i].num;
            break;
          case 3:
          case 4:
            parkingCostTo = parkingCostTo + selectedCar[i].distance4 * selectedCar[i].num;
            break;
          default:
            break;
        }
      }
      parkingCost = parkingCost + parkingCostTo;
    }
    this.setData({
      floorCost: Math.round(floorCost)
    });
    this.setData({
      parkingCost: Math.round(parkingCost)
    });
    // 起终点同时存在时访问
    if (this.data.flagFrom && this.data.flagTo) {
      if (this.data.distance > 0) {
        let distanceCost = 0;

        for (let i = 0; i < len; i++) {
          if (this.data.distance > selectedCar[i].km_standard && this.data.distance <= 300) {
            distanceCost = distanceCost + selectedCar[i].km_price * (this.data.distance - selectedCar[i].km_standard) * selectedCar[i].num
          } else if (this.data.distance > 300 && this.data.distance <= 500) {
            distanceCost = distanceCost + (selectedCar[i].km_price * (this.data.distance - selectedCar[i].km_standard) * selectedCar[i].num * this.data.config.discount1) / 10
          } else if (this.data.distance > 500) {
            distanceCost = distanceCost + (selectedCar[i].km_price * (this.data.distance - selectedCar[i].km_standard) * selectedCar[i].num * this.data.config.discount2) / 10
          }
        }
        that.setData({
          distanceCost: Math.round(distanceCost)
        });
      } else {
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

            for (let i = 0; i < len; i++) {
              if (that.data.distance > selectedCar[i].km_standard && that.data.distance <= 300) {
                distanceCost = distanceCost + selectedCar[i].km_price * (that.data.distance - selectedCar[i].km_standard) * selectedCar[i].num
              } else if (that.data.distance > 300 && that.distance <= 500) {
                distanceCost = distanceCost + (selectedCar[i].km_price * (that.data.distance - selectedCar[i].km_standard) * selectedCar[i].num * that.data.config.discount1) / 10
              } else if (that.data.distance > 500) {
                distanceCost = distanceCost + (selectedCar[i].km_price * (that.data.distance - selectedCar[i].km_standard) * selectedCar[i].num * that.data.config.discount2) / 10
              }
            }
            that.setData({
              distanceCost: Math.round(distanceCost)
            });
          }
        })
      }


    }

  },
  showProduct: function () {
    this.setData({
      show: !this.data.show
    });
  },
  closeProduct: function () {
    this.setData({
      show: false
    });
  },
  clearProduct: function () {
    let that = this;
    try {
      wx.showModal({
        content: '确定要清空购物车吗？',
        success(res) {
          if (res.confirm) {
            wx.removeStorageSync('cart');
            that.setData({
              cart: [],
              total: 0,
              show: false
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } catch (e) {
      // Do something when catch error
    }
  },
  refreshCart: function (products, cart) {
    let cartLen = cart.length;
    let productsLen = products.length;
    for (let i = 0; i < cartLen; i++) {
      for (let j = 0; j < productsLen; j++) {
        if (!products[j].is_free) {
          let goodsLen = products[j].goods.length;
          for (let k = 0; k < goodsLen; k++) {
            if (products[j].goods[k].id == cart[i].id) {
              cart[i].name = products[j].goods[k].name;
              cart[i].price = products[j].goods[k].price;
            }
          }
        }
      }
    }
    try {
      wx.setStorageSync('cart', cart);
      this.setData({
        cart: cart
      });
    } catch (e) {}
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
    // if (this.data.timeArray.length > 0) {
    //   let appointTime = this.data.timeArray[this.data.appointTime];
    //   let totalCost = this.data.selectGoodsPrice + this.data.floorCost + this.data.parkingCost + this.data.distanceCost;
    //   if (appointTime) {
    //     if (appointTime >= '19:00' && appointTime <= '23:00') {
    //       specialTimeCost = totalCost * (this.data.config.add_ratio1 / 100);
    //     } else if (appointTime > '23:00' || appointTime <= '07:00') {
    //       specialTimeCost = totalCost * (this.data.config.add_ratio2 / 100);
    //     }
    //     this.setData({
    //       specialTimeCost: Math.round(specialTimeCost)
    //     });

    //   this.getTotalCost();
    //   }
    // }
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
  addCart: function (res) {
    let item = res.currentTarget.dataset.item;
    let source = res.currentTarget.dataset.source;
    let cart = this.data.cart;
    let exist = cart.find(function (ele) {
      return (ele.id == item.id) && (ele.image_url == item.image_url);
    })
    if (exist) {
      exist.num += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
        num: 1
      });
    }
    try {
      wx.setStorageSync('cart', cart);
      //如果从产品界面添加则需要抛物线动画，在球进入购物篮后才增加购物车数量
      if (source == 'product') {
        this.touchOnGoods(res);
      } else {
        this.setData({
          total: this.data.total + 1
        })
      }
      this.setData({
        cart: cart
      });
    } catch (e) {}
  },
  reduceCart: function (res) {
    let item2 = res.currentTarget.dataset.item;
    let cart = this.data.cart;
    let exist = cart.find(function (ele) {
      return (ele.id == item2.id) && (ele.image_url == item2.image_url);
    });
    if (exist) {
      if (exist.num >= 1) {
        exist.num = parseInt(exist.num) - 1;
        if (exist.num == 0) {
          wx.showModal({
            title: '删除物品',
            content: '确定删除该物品吗',
            success(res) {
              if (res.confirm) {
                cart.splice(cart.findIndex(item => item.id === item2.id), 1);
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        try {
          wx.setStorageSync('cart', cart);
          this.setData({
            cart: cart,
            total: this.data.total - 1
          });
          if (this.data.total == 0) {
            this.setData({
              show: false
            });
          }
        } catch (e) {}
      }
    }

  },
  infoScroll: function () {
    let that = this;
    let len = that.data.products.length;
    //设置商品列表高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: (res.windowHeight) * (750 / res.windowWidth)
          //res.windowHeight:获取整个窗口高度为px，*2为rpx；98为头部占据的高度；
        })
      },
    });
    var hightArr = [];
    for (var i = 0; i < len; i++) { //productList
      //获取元素所在位置
      var query = wx.createSelectorQuery().in(this);
      var idView = "#b" + i;
      query.select(idView).boundingClientRect();
      query.exec(function (res) {
        var top = res[0].top;
        hightArr.push(top);
        that.setData({
          hightArr: hightArr
        });
      });
    };
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      toView: id,
      navActive: index
    });
  },
  scroll: function (e) {
    var scrollTop = e.detail.scrollTop;
    var scrollArr = this.data.hightArr;
    for (var i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0]) {
        this.setData({
          navActive: 0,
          lastActive: 0
        })
      } else if (scrollTop >= scrollArr[i] - scrollArr[0] && scrollTop < scrollArr[i + 1] - scrollArr[0]) {
        this.setData({
          navActive: i
        })
      } else if (scrollTop >= scrollArr[scrollArr.length - 1] - scrollArr[0]) {
        this.setData({
          navActive: scrollArr.length - 1
        })
      }
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
  test: function (e) {
    let idx = e.currentTarget.dataset.idx;
    let idy = e.currentTarget.dataset.idy;
    let products = this.data.products;
    products[idx].goods[idy].image_url = products[idx].goods[idy].images[e.detail.current].url;
    this.setData({
      products: products
    });
  }
})