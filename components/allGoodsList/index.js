// components/allGoodsList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    orderList: [{
      id: '0',
      status: '',
      orderTime: '2020-08-27',
      orderStatus: '已完成',
      orderImage: [{
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
      ],
      goodsNum: '2',
      allPrice: '178.99'
    }, {
      id: '0',
      status: '',
      orderTime: '2020-08-27',
      orderStatus: '已完成',
      orderImage: [{
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
        {
          imageUrl: '/images/complete.png'
        },
      ],
      goodsNum: '2',
      allPrice: '178.99'
    }]
  },
  created() {
    this.data.orderList = this.data.orderList3
  },
  /**
   * 组件的方法列表
   */
  methods: {
    orderDetails() {
      wx.navigateTo({
        url: '/pages/orderDetails/index',

      })
    }
  }
})