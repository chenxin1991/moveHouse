// pages/addressFrom/addressFrom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  choosePlace(e) {
    let that = this
    console.log(e);
    var obj = e.target.dataset;
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userLocation']) {
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
            }
          })
        } else {
          wx.chooseLocation({
            success: res => {
              if (!res.address || !res.name) {
                alert('未选择地址');
              } else {
                var carAddress = that.data.carAddress;
                carAddress[obj.id].name = res.name;
                carAddress[obj.id].latitude = res.latitude;
                carAddress[obj.id].longitude = res.longitude;
                carAddress[obj.id].address = res.address;
                // 起终点同时存在时访问
                if (carAddress.start.longitude && carAddress.end.longitude) {
                  var url = `https://restapi.amap.com/v3/direction/driving?origin=${carAddress.start.longitude},${carAddress.start.latitude}&destination=${carAddress.end.longitude},${carAddress.end.latitude}&extensions=all&output=json&key=50b0843d96197bd1e8ce4532bcf1ab37`
                  wx.request({
                    url: url,
                    method: "GET",
                    success: res => {
                      var distance = that.data.distance;
                      distance.distance = Math.round(res.data.route.paths[0].distance / 1000);
                      that.setData({
                        distance
                      });
                      that.getMoney();
                    }
                  })
                }
                console.log('ceshi',carAddress);
                that.setData({
                  carAddress
                })
              }
            },
            fail: res => {
              console.log(res, 'xxx')
              if (res.errMsg == 'chooseLocation:fail:auth denied') {
                that.setData({
                  shouquan: true,
                })
              }
            }
          })
        }
      }
    })

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