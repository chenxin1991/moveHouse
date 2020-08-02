import {
  getCategoryList
} from '../../api/basic.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isAllSelect: true,
    selectGoodsPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  /**
   * 去购物
   */
  goShopping() {
    wx.switchTab({
      url: '../goods_cate/goods_cate',
    });
  },

  addCart: function (res) {
    let id = res.currentTarget.dataset.id;
    let selectGoodsPrice = this.data.selectGoodsPrice;
    let cart = this.data.cartList;
    let exist = cart.find(function (ele) {
      return ele.id === id;
    })
    if (exist) {
      exist.num = parseInt(exist.num) + 1;
      selectGoodsPrice = selectGoodsPrice + parseFloat(exist.price);
    }
    this.setData({
      cartList: cart,
      selectGoodsPrice: selectGoodsPrice
    });
    //购物车的图标右上方提示购物车中有多少商品
    let total = 0;
    cart.find(function (ele) {
      total += parseInt(ele.num);
    })
    wx.setStorage({
      key: 'cart',
      data: cart
    })
    wx.setStorage({
      key: 'cartNum',
      data: total.toString()
    })
    wx.setTabBarBadge({
      index: 2,
      text: total.toString()
    })
  },
  reduceCart: function (option) {
    let that = this;
    let selectGoodsPrice = this.data.selectGoodsPrice;
    let id = option.currentTarget.dataset.id;
    let cart = this.data.cartList;
    let exist = cart.find(function (ele) {
      return ele.id === id;
    })
    if (exist) {
      selectGoodsPrice = selectGoodsPrice - parseFloat(exist.price);
      if (exist.num > 1) {
        exist.num = parseInt(exist.num) - 1;
        that.setData({
          cartList: cart,
          selectGoodsPrice: selectGoodsPrice
        });
        let total = 0;
        cart.find(function (ele) {
          total += parseInt(ele.num);
        })
        wx.setStorage({
          key: 'cart',
          data: cart
        })
        wx.setStorage({
          key: 'cartNum',
          data: total.toString()
        })
        wx.setTabBarBadge({
          index: 2,
          text: total.toString()
        })
      } else if (exist.num == 1) {
        wx.showModal({
          title: '删除物品',
          content: '确定删除该物品吗',
          success(res) {
            if (res.confirm) {
              cart.splice(cart.findIndex(item => item.id === id), 1)
              that.setData({
                cartList: cart,
                selectGoodsPrice: selectGoodsPrice
              });
              let flag = true;
              let len = cart.length;
              for (let i = 0; i < len; i++) {
                if (cart[i].checked == "") {
                  flag = false;
                  break;
                }
              }
              if (flag) {
                that.setData({
                  isAllSelect: true
                });
              }
              let total = 0;
              cart.find(function (ele) {
                total += parseInt(ele.num);
              })
              wx.setStorage({
                key: 'cart',
                data: cart
              })
              if (total > 0) {
                wx.setTabBarBadge({
                  index: 2,
                  text: total.toString()
                })
                wx.setStorage({
                  key: 'cartNum',
                  data: total.toString()
                })
              } else {
                wx.removeTabBarBadge({
                  index: 2
                })
                wx.removeStorage({
                  key: 'cartNum',
                })
              }
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },
  checkboxClick: function (event) {
    let item = event.currentTarget.dataset;
    let cartList = this.data.cartList;
    let selectGoodsPrice = this.data.selectGoodsPrice;
    if (item.checked == "true") {
      cartList[item.index].checked = "";
      selectGoodsPrice = selectGoodsPrice - parseFloat(cartList[item.index].price * cartList[item.index].num);
      this.setData({
        isAllSelect: false
      });
    } else {
      cartList[item.index].checked = "true";
      selectGoodsPrice = selectGoodsPrice + parseFloat(cartList[item.index].price * cartList[item.index].num);
      let flag = true;
      let len = cartList.length;
      for (let i = 0; i < len; i++) {
        if (cartList[i].checked == "") {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.setData({
          isAllSelect: true
        });
      }
    }
    this.setData({
      cartList: cartList,
      selectGoodsPrice: selectGoodsPrice
    });
    wx.setStorage({
      key: 'cart',
      data: cartList
    })
  },
  checkboxAllChange: function (event) {
    let cartList = this.data.cartList;
    let len = cartList.length;
    let selectGoodsPrice = 0;
    if (event.detail.value.length > 0) {
      for (let i = 0; i < len; i++) {
        cartList[i].checked = "true";
        selectGoodsPrice = selectGoodsPrice + parseFloat(cartList[i].price * cartList[i].num);
      }
    } else {
      for (let i = 0; i < len; i++) {
        cartList[i].checked = "";
      }
    }
    this.setData({
      cartList: cartList,
      selectGoodsPrice: selectGoodsPrice
    });
    wx.setStorage({
      key: 'cart',
      data: cartList
    })
  },
  delItem: function () {
    let that = this;
    let cartList = this.data.cartList;
    let len = cartList.length;
    let selectGoodsPrice = this.data.selectGoodsPrice;
    wx.showModal({
      title: '删除物品',
      content: '确定删除选中的物品吗',
      success(res) {
        if (res.confirm) {
          while (len--) {
            if (cartList[len].checked == "true") {
              selectGoodsPrice = selectGoodsPrice - cartList[len].price * cartList[len].num;
              cartList.splice(len, 1);
            }
          }
          that.setData({
            cartList: cartList,
            selectGoodsPrice: selectGoodsPrice
          });
          let total = 0;
          cartList.find(function (ele) {
            total += parseInt(ele.num);
          })
          wx.setStorage({
            key: 'cart',
            data: cartList
          })
          if (total > 0) {
            wx.setTabBarBadge({
              index: 2,
              text: total.toString()
            })
            wx.setStorage({
              key: 'cartNum',
              data: total.toString()
            })
          } else {
            wx.removeTabBarBadge({
              index: 2
            })
            wx.removeStorage({
              key: 'cartNum',
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  toOrder: function () {
    let selectedGoods = [];
    let selectedCar = [];
    let selectedNum = 0;
    let cartList = this.data.cartList;
    let len = cartList.length;
    let carSelect = false
    for (let i = 0; i < len; i++) {
      if (cartList[i].checked != "") {
        let id = cartList[i].id.toString();
        if (id.startsWith('car_')) {
          selectedCar.push(cartList[i]);
          carSelect = true;
        }
        selectedGoods.push(cartList[i]);
        selectedNum += parseInt(cartList[i].num);
      }
    }
    if (selectedGoods.length) {
      if (carSelect) {
        app.globalData.selectedGoods = selectedGoods;
        app.globalData.selectedCar = selectedCar;
        app.globalData.selectedNum = selectedNum;
        app.globalData.selectGoodsPrice = this.data.selectGoodsPrice;
        wx.navigateTo({
          url: '../order/order'
        });
      } else {
        wx.showToast({
          title: '请选择用车',
          icon: 'none',
          duration: 2000
        });
      }

    } else {
      wx.showToast({
        title: '没有选中任何物品',
        icon: 'none',
        duration: 2000
      });
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
    let cartList = wx.getStorageSync('cart');
    let len = cartList.length;
    if (len > 0) {
      getCategoryList().then(res => {
        that.refreshCart(res.data, cartList);
        cartList = that.data.cartList;
        let selectGoodsPrice = 0;
        for (let i = 0; i < len; i++) {
          if (cartList[i].checked == "") {
            this.setData({
              isAllSelect: false
            });
          } else {
            selectGoodsPrice = selectGoodsPrice + parseFloat(cartList[i].price * cartList[i].num);
          }
        }
        this.setData({
          selectGoodsPrice: selectGoodsPrice
        });
      })
    }
  },
  refreshCart: function (products, cart) {
    let refreshCart = [];
    let len = products.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < products[i].goods.length; j++) {
        for (let k = 0; k < cart.length; k++) {
          if (products[i].goods[j].id == cart[k].id) {
            products[i].goods[j].num = cart[k].num;
            products[i].goods[j].checked = cart[k].checked;
            refreshCart.push(products[i].goods[j]);
          }
        }
      }
    }
    let total = 0;
    refreshCart.find(function (ele) {
      total += parseInt(ele.num);
    })
    wx.setStorage({
      key: 'cart',
      data: refreshCart
    })
    this.setData({
      cartList: refreshCart
    });
    if (total > 0) {
      wx.setStorage({
        key: 'cartNum',
        data: total.toString()
      })
    }
    if (total > 0) {
      wx.setTabBarBadge({
        index: 2,
        text: total.toString()
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