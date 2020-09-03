//app.js
App({
  onLaunch: function () {
    this.screenSize();
  },
  screenSize: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var ww = res.windowWidth;
        var hh = res.windowHeight;
        that.globalData.ww = ww;
        that.globalData.hh = hh;
      }
    })
  },
  bezier: function (points, times) {
    // 0、以3个控制点为例，点A,B,C,AB上设置点D,BC上设置点E,DE连线上设置点F,则最终的贝塞尔曲线是点F的坐标轨迹。
    // 1、计算相邻控制点间距。
    // 2、根据完成时间,计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离。
    // 3、时间每递增100ms，则D,E在指定方向上发生位移, F在DE上的位移则可通过AD/AB = DF/DE得出。
    // 4、根据DE的正余弦值和DE的值计算出F的坐标。
    // 邻控制AB点间距
    var bezier_points = [];
    var points_D = [];
    var points_E = [];
    const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
    // 邻控制BC点间距
    const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
    // D每次在AB方向上移动的距离
    const EACH_MOVE_AD = DIST_AB / times;
    // E每次在BC方向上移动的距离 
    const EACH_MOVE_BE = DIST_BC / times;
    // 点AB的正切
    const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
    // 点BC的正切
    const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
    // 点AB的弧度值
    const RADIUS_AB = Math.atan(TAN_AB);
    // 点BC的弧度值
    const RADIUS_BC = Math.atan(TAN_BC);
    // 每次执行
    for (var i = 1; i <= times; i++) {
      // AD的距离
      var dist_AD = EACH_MOVE_AD * i;
      // BE的距离
      var dist_BE = EACH_MOVE_BE * i;
      // D点的坐标
      var point_D = {};
      point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
      point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
      points_D.push(point_D);
      // E点的坐标
      var point_E = {};
      point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
      point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
      points_E.push(point_E);
      // 此时线段DE的正切值
      var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
      // tan_DE的弧度值
      var radius_DE = Math.atan(tan_DE);
      // 地市DE的间距
      var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']), 2));
      // 此时DF的距离
      var dist_DF = (dist_AD / DIST_AB) * dist_DE;
      // 此时DF点的坐标
      var point_F = {};
      point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
      point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
      bezier_points.push(point_F);
    }
    return {
      'bezier_points': bezier_points
    };
  },
  /**
   * 全局变量
   */
  globalData: {
    userInfo: null,
    cars: [],
    distance: 0,
    goodsCost: 0,
    distanceCost: 0,
    floorCost: 0,
    parkingCost: 0,
    specialTimeCost: 0,
    totalCost: 0,
    appointDate: '',
    appointTime: '',
    carNum: 0,
    goodsNum: 0
  },
  // api_root: 'http://demo.tp6.cn/index.php/api/', 
  api_root: 'https://demo.wjdhbq.com/index.php/api/', 
    /**
   * 执行用户登录
   */
  doLogin() {
    // 保存当前页面
    let pages = getCurrentPages();
    if (pages.length) {
      let currentPage = pages[pages.length - 1];
      "pages/login/login" != currentPage.route &&
        wx.setStorageSync("currentPage", currentPage);
    }
    // 跳转授权页面
    wx.navigateTo({
      url: "/pages/login/login"
    });
  },

  /**
   * 当前用户id
   */
  getUserId() {
    return wx.getStorageSync('user_id') || 0;
  },
  /**
   * 显示成功提示框
   */
  showSuccess(msg, callback) {
    wx.showToast({
      title: msg,
      icon: 'success',
      success() {
        callback && (setTimeout(() => {
          callback();
        }, 1500));
      }
    });
  },

  /**
   * 显示失败提示框
   */
  showError(msg, callback) {
    wx.showModal({
      title: '友情提示',
      content: msg,
      showCancel: false,
      success(res) {
        // callback && (setTimeout(() => {
        //   callback();
        // }, 1500));
        callback && callback();
      }
    });
  },
/**
   * get请求
   */
  _get(url, data, success, fail, complete, check_login) {
    let App = this;
    wx.showNavigationBarLoading();

    // 构造请求参数
    data = Object.assign({
      wxapp_id: 10001,
      token: wx.getStorageSync('token')
    }, data);

    // if (typeof check_login === 'undefined')
    //   check_login = true;

    // 构造get请求
    let request = () => {
      data.token = wx.getStorageSync('token');
      wx.request({
        url: App.api_root + url,
        header: {
          'content-type': 'application/json'
        },
        data,
        success(res) {
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            console.log(res);
            App.showError('网络请求出错');
            return false;
          }
          if (res.data.code === -1) {
            // 登录态失效, 重新登录
            wx.hideNavigationBarLoading();
            App.doLogin();
          } else if (res.data.code === 0) {
            App.showError(res.data.msg);
            return false;
          } else {
            success && success(res.data);
          }
        },
        fail(res) {
          // console.log(res);
          App.showError(res.errMsg, () => {
            fail && fail(res);
          });
        },
        complete(res) {
          wx.hideNavigationBarLoading();
          complete && complete(res);
        },
      });
    };
    // 判断是否需要验证登录
    check_login ? App.doLogin(request) : request();
  },

  /**
   * post提交
   */
  _post_form(url, data, success, fail, complete) {
    wx.showNavigationBarLoading();
    let App = this;
    // 构造请求参数
    data = Object.assign({
      wxapp_id: 10001,
      token: wx.getStorageSync('token')
    }, data);
    wx.request({
      url: App.api_root + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      data,
      success(res) {
        if (res.statusCode !== 200 || typeof res.data !== 'object') {
          App.showError('网络请求出错');
          return false;
        }
        if (res.data.code === -1) {
          // 登录态失效, 重新登录
          App.doLogin(() => {
            App._post_form(url, data, success, fail);
          });
          return false;
        } else if (res.data.code === 0) {
          App.showError(res.data.msg, () => {
            fail && fail(res);
          });
          return false;
        }
        success && success(res.data);
      },
      fail(res) {
        // console.log(res);
        App.showError(res.errMsg, () => {
          fail && fail(res);
        });
      },
      complete(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        complete && complete(res);
      }
    });
  },

  /**
   * 验证是否存在user_info
   */
  validateUserInfo() {
    let user_info = wx.getStorageSync('user_info');
    return !!wx.getStorageSync('user_info');
  },

  /**
   * 验证登录
   */
  checkIsLogin() {
    return wx.getStorageSync('token') != '' && wx.getStorageSync('user_id') != '';
  },
  /**
   * 授权登录
   */
  getUserInfo(e, callback) {
    let App = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({
      title: "正在登录",
      mask: true
    });
    // 执行微信登录
    wx.login({
      success(res) {
        // 发送用户信息
        App._post_form('user/login', {
          code: res.code,
          user_info: e.detail.rawData,
          encrypted_data: e.detail.encryptedData,
          iv: e.detail.iv,
          signature: e.detail.signature
        }, result => {
          // 记录token user_id
          wx.setStorageSync('token', result.data.token);
          wx.setStorageSync('user_id', result.data.user_id);
          // 执行回调函数
          callback && callback();
        }, false, () => {
          wx.hideLoading();
        });
      }
    });
  }
})