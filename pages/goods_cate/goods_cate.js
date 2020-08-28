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
    cars: [], //用车
    goodsCost: 0, //物品总价
    distanceCost: 0, //超公里数费
    floorCost: 0, //楼层费
    parkingCost: 0, //停车位距离费
    specialTimeCost: 0, //特殊时间段费
    totalCost: 0, //总报价
    setting: {},
    cart: [],
    carNum: 0,
    goodsNum: 0,
    hide_good_box: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.init();
  },
  init: function () {
    let that = this;
    getCategoryList().then(res => {
      let cart = wx.getStorageSync('cart');
      let goodsNum = 0;
      let carNum = 0;
      //如果存在缓存
      if (cart && cart.length > 0) {
        //购物车中，后台存在的有价格物品，刷新名称和单价；不存在的物品，不做改动。
        that.refreshCart(res.data.category, cart);
        cart.find(function (ele) {
          goodsNum += parseInt(ele.num);
          let id = ele.id.toString();
          if (id.startsWith('car_')) {
            carNum += ele.num;
          }
        })
      }
      this.setData({
        products: res.data.category,
        goodsNum: goodsNum,
        carNum: carNum,
        setting: res.data.setting
      });
      //初始化物品展示前端架构
      that.infoScroll();
      //初始化时间
      let min_hour = 6;
      let max_month = 1;
      let startDate = this.getStartDate(min_hour);
      let endDate = this.getEndDate(max_month);
      this.setData({
        startDate: startDate,
        endDate: endDate,
      });
      //初始化购物篮位置（反向）
      this.busPos = {};
      this.busPos['x'] = app.globalData.ww * 0.9;
      this.busPos['y'] = app.globalData.hh * 0.9;
      //获取缓存起始地
      this.initAddress();
    });
  },
  //上传图片
  chooseImage: function (e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    let cart = this.data.cart;
    wx.chooseImage({
      count: 1, //默认选择1张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (res.tempFilePaths.count == 0) {
          return;
        }
        let tempFilePaths = res.tempFilePaths[0]; //获取到的图片路径
        //上传图片 循环提交
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image_url: tempFilePaths,
          num: 1
        });
        that.setData({
          cart: cart,
          goodsNum: that.data.goodsNum + 1
        });
        wx.setStorageSync('cart', cart);
        that.getTotalCost();
      }
    })
  },
  //轮播箭头向左
  prevImg: function (e) {
    let swiper = e.currentTarget.dataset.item;
    // var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current > 0 ? current - 1 : swiper.imgUrls.length - 1;
    this.setData({
      swiper: swiper,
    })
  },
  //轮播箭头向右
  nextImg: function (e) {
    console.log(2);
    let swiper = e.currentTarget.dataset.item;

    // var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current < (swiper.imgUrls.length - 1) ? current + 1 : 0;
    this.setData({
      swiper: swiper,
    })
  },
  refreshCart: function (products, cart) {
    let cartLen = cart.length;
    let productsLen = products.length;
    let cars = [];
    for (let i = 0; i < cartLen; i++) {
      for (let j = 0; j < productsLen; j++) {
        if (!products[j].is_free) {
          let goodsLen = products[j].goods.length;
          for (let k = 0; k < goodsLen; k++) {
            if (products[j].goods[k].id == cart[i].id) {
              cart[i].name = products[j].goods[k].name;
              cart[i].price = products[j].goods[k].price;
              let id = cart[i].id.toString();
              if (id.startsWith('car_')) {
                products[j].goods[k].num = cart[i].num;
                cars.push(products[j].goods[k]);
              }
            }
          }
        }
      }
    }
    try {
      wx.setStorageSync('cart', cart);
      this.setData({
        cart: cart,
        cars: cars
      });
      app.globalData.cars = cars;
    } catch (e) {}
  },
  initAddress: function () {
    let that = this;
    let cart = this.data.cart;
    let flag = false;
    let addressFrom = wx.getStorageSync('addressFrom');
    if (addressFrom) {
      if (JSON.stringify(this.data.addressFrom) !== "{}") {
        if ((this.data.addressFrom.address.latitude != addressFrom.address.latitude) || (this.data.addressFrom.address.longitude != addressFrom.address.longitude)) {
          flag = true;
        }
      } else {
        flag = true;
      }
      this.setData({
        addressFrom: addressFrom,
        flagFrom: true
      });
    }
    let addressTo = wx.getStorageSync('addressTo');
    if (addressTo) {
      if (JSON.stringify(this.data.addressTo) !== "{}") {
        if ((this.data.addressTo.address.latitude != addressTo.address.latitude) || (this.data.addressTo.address.longitude != addressTo.address.longitude)) {
          flag = true;
        }
      } else {
        flag = true;
      }
      this.setData({
        addressTo: addressTo,
        flagTo: true
      });
    }
    //如果地址发生改变，需要重新计算距离
    if (this.data.flagFrom && this.data.flagTo && flag) {
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
          that.getTotalCost();
        }
      });
    } else {
      //初始化总报价
      if (cart && cart.length > 0) {
        this.getTotalCost();
      }
    }
  },
  addCart: function (res) {
    // 如果good_box正在运动,不允许继续添加
    if (!this.data.hide_good_box && res.currentTarget.dataset.source == 'product') return;
    let item = res.currentTarget.dataset.item;
    let source = res.currentTarget.dataset.source;
    let cart = this.data.cart;
    let carNum = this.data.carNum;
    let id = item.id.toString();
    if (id.startsWith('car_')) {
      carNum += 1;
      let cars = this.data.cars;
      let carExist = cars.find(function (ele) {
        return (ele.id == item.id);
      });
      if (carExist) {
        carExist.num += 1;
      } else {
        item.num = 1;
        cars.push(item);
      }
      this.setData({
        cars: cars
      });
      app.globalData.cars = cars;
    }
    let exist = cart.find(function (ele) {
      return (ele.id == item.id) && (ele.image_url == item.image_url);
    });
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
          goodsNum: this.data.goodsNum + 1
        })
      }
      this.setData({
        cart: cart,
        carNum: carNum
      });
    } catch (e) {}
    this.getTotalCost();
  },
  reduceCart: function (res) {
    let item = res.currentTarget.dataset.item;
    let cart = this.data.cart;
    let carNum = this.data.carNum;
    let id = item.id.toString();
    if (id.startsWith('car_')) {
      carNum -= 1;
      let cars = this.data.cars;
      let carExist = cars.find(function (ele) {
        return (ele.id == item.id);
      });
      if (carExist) {
        if (carExist.num >= 1) {
          carExist.num = parseInt(carExist.num) - 1;
          if (carExist.num == 0) {
            cars.splice(cars.findIndex(e => e.id === item.id), 1);
          }
        }
      }
      this.setData({
        cars: cars
      });
      app.globalData.cars = cars;
    }
    let exist = cart.find(function (ele) {
      return (ele.id == item.id) && (ele.image_url == item.image_url);
    });
    if (exist) {
      if (exist.num >= 1) {
        exist.num = parseInt(exist.num) - 1;
        if (exist.num == 0) {
          cart.splice(cart.findIndex(e => e.id === item.id && e.image_url == item.image_url), 1);
        }
        try {
          wx.setStorageSync('cart', cart);
          this.setData({
            cart: cart,
            goodsNum: this.data.goodsNum - 1,
            carNum: carNum
          });
          if (this.data.goodsNum == 0) {
            this.setData({
              show: false
            });
          }
        } catch (e) {}
      }
    }
    this.getTotalCost();
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
              goodsNum: 0,
              show: false,
              carNum: 0,
              cars: []
            });
            app.globalData.cars = [];
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } catch (e) {
      // Do something when catch error
    }
  },
  getDistanceCost: function () {
    let distanceCost = 0;
    let cars = this.data.cars;
    let distance = this.data.distance;
    let setting = this.data.setting;
    if (this.data.flagFrom && this.data.flagTo) {
      if (distance > 0) {
        cars.forEach(function (val) {
          if (distance > val.km_standard && distance <= 300) {
            distanceCost += val.km_price * (distance - val.km_standard) * val.num
          } else if (distance > 300 && distance <= 500) {
            distanceCost += (val.km_price * (distance - val.km_standard) * val.num * setting.discount1) / 10
          } else if (distance > 500) {
            distanceCost += (val.km_price * (distance - val.km_standard) * val.num * setting.discount2) / 10
          }
        });
        this.setData({
          distanceCost: Math.round(distanceCost)
        });
        return distanceCost;
      }
    }
  },
  getFloorCost: function (address) {
    let floorCost = 0;
    let cars = this.data.cars;
    if (address.stairs_or_elevators == '1' && address.floor_num > 0) {
      cars.forEach(function (val) {
        floorCost += (address.floor_num - val.floor_standard + 1) * val.floor_price * val.num;
      });
    }
    return floorCost;
  },
  getParkingCost: function (address) {
    let parkingCost = 0;
    let cars = this.data.cars;
    cars.forEach(function (val) {
      switch (address.parking_distance) {
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
    return parkingCost;
  },
  getTotalCost: function () {
    let cart = this.data.cart;
    let totalCost = 0;
    cart.forEach(function (val) {
      totalCost += parseFloat(val.price) * parseInt(val.num);
    });
    totalCost += this.getDistanceCost();
    if (this.data.carNum > 0) {
      if (this.data.flagFrom) {
        totalCost += this.getFloorCost(this.data.addressFrom);
        totalCost += this.getParkingCost(this.data.addressFrom);
      }
      if (this.data.flagTo) {
        totalCost += this.getFloorCost(this.data.addressTo);
        totalCost += this.getParkingCost(this.data.addressTo);
      }
    }
    this.setData({
      totalCost: totalCost
    });
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
  changeImage: function (e) {
    let idx = e.currentTarget.dataset.idx;
    let idy = e.currentTarget.dataset.idy;
    let products = this.data.products;
    products[idx].goods[idy].image_url = products[idx].goods[idy].images[e.detail.current].url;
    products[idx].goods[idy].current = e.detail.current;
    this.setData({
      products: products
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取缓存起始地
    this.initAddress();
    if (this.data.cart && this.data.cart.length > 0) {
      this.getTotalCost();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
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
  infoScroll: function () {
    let that = this;
    let len = that.data.products.length;
    //设置商品列表高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: (res.windowHeight) * (750 / res.windowWidth)
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
  touchOnGoods: function (e) {
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
          goodsNum: that.data.goodsNum + 1
        })
      }
    }, 20);
  },
  toOrder: function () {
    wx.navigateTo({
      url: '../order/order'
    });
  }
})