const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    productList: [{
        id: 18,
        cate_name: "用车",
        goods: [{
          id: 1,
          title: '货车',
          type: '载重2吨，长宽高4.2*2.0*1.9米',
          price: 400.00,
          image_url: '/images/car1.png'
        }]
      },
      {
        id: 19,
        cate_name: "拆装"
      },
      {
        id: 20,
        cate_name: "大件"
      },
      {
        id: 21,
        cate_name: "材料"
      }
    ],
    navActive: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.infoScroll();
  },
  infoScroll: function () {
    let that = this;
    let len = that.data.productList.length;
    //设置商品列表高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: (res.windowHeight) * (750 / res.windowWidth) - 98
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
        console.log(top)
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

  searchSubmitValue: function (e) {
    if (e.detail.value.length > 0)
      wx.navigateTo({
        url: '/pages/goods_list/goods_list?searchValue=' + e.detail.value
      })
    else
      return app.Tips({
        title: '请填写要搜索的产品信息'
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

  }
})