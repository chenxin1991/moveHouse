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
    navActive: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {

  },
  getAllCategory: function () {
    let that = this;
    getCategoryList().then(res => {
      let cart = wx.getStorageSync('cart');
      if (cart && cart.length > 0) {
        that.refreshGoods(res.data, cart);
      }else{
        this.setData({
          products: res.data
        });
      }
      that.infoScroll();
    })
  },
  refreshGoods: function (products, cart) {
    let refreshCart = [];
    let len = products.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < products[i].goods.length; j++) {
        for (let k = 0; k < cart.length; k++) {
          if (products[i].goods[j].id == cart[k].id) {
            products[i].goods[j].num = cart[k].num;
            products[i].goods[j].checked = cart[k].checked;
            refreshCart.push(products[i].goods[j]);
            if (products[i].hasOwnProperty("num")) {
              products[i].num += cart[k].num;
            } else {
              products[i].num = cart[k].num;
            }
          }
        }
      }
    }
    let total = 0;
    refreshCart.find(function (ele) {
      total += parseInt(ele.num);
    })
    this.setData({
      products: products
    });
    wx.setStorage({
      key: 'cart',
      data: refreshCart
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
  addCart: function (res) {
    let products = this.data.products;
    let idx = res.currentTarget.dataset.idx;
    let idy = res.currentTarget.dataset.idy;
    if (products[idx].hasOwnProperty("num")) {
      products[idx].num += 1;
    } else {
      products[idx].num = 1
    }
    if (products[idx].goods[idy].hasOwnProperty("num")) {
      products[idx].goods[idy].num += 1;
    } else {
      products[idx].goods[idy].num = 1
    }
    this.setData({
      products: products
    });
    let cart = wx.getStorageSync('cart') || [];
    let exist = cart.find(function (ele) {
      return ele.id === res.currentTarget.dataset.id;
    })
    if (exist) {
      exist.num = parseInt(exist.num) + 1;
    } else {
      res.currentTarget.dataset.num = 1;
      cart.push(res.currentTarget.dataset);
    }
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
  reduceCart: function (res) {
    let products = this.data.products;
    let idx = res.currentTarget.dataset.idx;
    let idy = res.currentTarget.dataset.idy;
    if (products[idx].hasOwnProperty("num") > 0) {
      products[idx].num -= 1;
    } else {
      products[idx].num = 0
    }
    if (products[idx].goods[idy].hasOwnProperty("num") > 0) {
      products[idx].goods[idy].num -= 1;
    } else {
      productOrder[idx].goods[idy].num = 0
    }
    this.setData({
      products: products
    });
    let cart = wx.getStorageSync('cart') || []; //判断cart存不存在
    let exist = cart.find(function (ele) { //find遍历cart数组
      return ele.id === res.currentTarget.dataset.id;
    })
    if (exist && exist.num > 0) {
      exist.num = parseInt(exist.num) - 1; //如果加入购物车的商品存在就增加数量
      if (exist.num == 0) {
        cart.splice(cart.findIndex(item => item.id === res.currentTarget.dataset.id), 1)
      }
    }
    //购物车的图标右上方提示购物车中有多少商品
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
    this.getAllCategory();
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

  }
})