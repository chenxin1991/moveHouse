import {
 alert
} from '../../utils/util.js'
const app = getApp();

Page({
  data: {
    current: 0,
    attitude: false, //服务态度好
    time: false, //快速准时
    efficiency: false, //效率高
    environment: false, //风雨无阻
    professional: false, //货品完好
    userStars: [
      "/images/me-icon/rwjx.png",
      "/images/me-icon/rwjx.png",
      "/images/me-icon/rwjx.png",
      "/images/me-icon/rwjx.png",
      "/images/me-icon/rwjx.png"
    ],
    wjxScore: 5,
    // textarea
    min: 5, //最少字数
    max: 300, //最多字数 (根据自己需求改变)
    remark: '',
    imageUrls: [],
    id: 0
  },
  // 星星点击事件
  starTap: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = "/images/me-icon/rwjx.png";
        that.setData({
          wjxScore: i + 1,
        })
      } else { // 其他是空心
        tempUserStars[i] = "/images/me-icon/wjx.png"
      }
    }
    // 重新赋值就可以显示了
    that.setData({
      userStars: tempUserStars
    })
  },
  // 标签
  label: function (e) {
    var that = this;
    that.setData({
      attitude: !e.currentTarget.dataset.index
    })
  },
  label1: function (e) {
    var that = this;
    that.setData({
      professional: !e.currentTarget.dataset.index
    })
  },
  label2: function (e) {
    var that = this;
    that.setData({
      efficiency: !e.currentTarget.dataset.index
    })
  },
  label3: function (e) {
    var that = this;
    that.setData({
      environment: !e.currentTarget.dataset.index
    })
  },
  label4: function (e) {
    var that = this;
    that.setData({
      time: !e.currentTarget.dataset.index
    })
  },
  // 留言
  //字数限制
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len,
      remark: value
    });
  },
  // 图片
  choose: function (e) { //这里是选取图片的方法
    var that = this;
    var imageUrls = that.data.imageUrls;
    wx.chooseImage({
      count: 5 - imageUrls.length, //最多5张
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePath = res.tempFilePaths;
        for (let i = 0; i < tempFilePath.length; i++) {
          wx.uploadFile({
            url: app.api_root + 'category/uploadImage', //仅为示例，非真实的接口地址
            filePath: tempFilePath[i],
            name: 'file',
            header: {
              'content-type': 'application/json'
            },
            formData: {
              'wxapp_id': 10001,
              'token': wx.getStorageSync('token')
            },
            success(res) {
              const data = JSON.parse(res.data);
              if (data.code === -1) {
                // 登录态失效, 重新登录
                app.doLogin();
              }
              if (data.code === -2) {
                app.getMobile();
              }
              if (data.code == 1) {
                let imageUrls = that.data.imageUrls;
                imageUrls.push(data.image_url);
                that.setData({
                  imageUrls: imageUrls
                })
              }
            }
          });
        }
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imageUrls = this.data.imageUrls;
    var index = e.currentTarget.dataset.index;
    imageUrls.splice(index, 1);
    this.setData({
      imageUrls: imageUrls
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imageUrls = this.data.imageUrls;
    wx.previewImage({
      //当前显示图片
      current: imageUrls[index],
      //所有图片
      urls: imageUrls
    })
  },
  submitComment() {
    let that = this;
    let comment = {
      score: this.data.wjxScore,
      content: {
        attitude: this.data.attitude,
        professional: this.data.professional,
        efficiency: this.data.efficiency,
        environment: this.data.environment,
        time: this.data.time
      },
      imageUrls: this.data.imageUrls,
      remark: this.data.remark
    };
    app._post_form('user/order/comment/' + that.data.id, {
      comment: JSON.stringify(comment)
    }, result => {
      if (result.code === 1) {
        alert('评价成功', '', result => {
          wx.navigateBack({
            delta: 1,
          })
        })
 
      }
    });

  }
})