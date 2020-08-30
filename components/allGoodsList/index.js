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
      },
      
    ],
    orderList1:[
      {
        id: '1',
        orderTime: '2020-08-27',
        orderStatus: '待派送',
        orderImage: [{
            imageUrl: '/images/complete.png'
          },
          {
            imageUrl: '/images/complete.png'
          },
        ],
        goodsNum: '2',
        allPrice: '178.99'
      }
    ],
    orderList2:[
      {
        id: '2',
        orderTime: '2020-08-27',
        orderStatus: '待开工',
        orderImage: [{
            imageUrl: '/images/complete.png'
          },
          {
            imageUrl: '/images/complete.png'
          }, {
            imageUrl: '/images/complete.png'
          },
        ],
        goodsNum: '2',
        allPrice: '178.99'
      },
    ],
    orderList3:[
      {
        id: '3',
        orderTime: '2020-08-27',
        orderStatus: '待完工',
        orderImage: [{
            imageUrl: '/images/complete.png'
          },
          {
            imageUrl: '/images/complete.png'
          }
        ],
        goodsNum: '2',
        allPrice: '178.99'
      },
    ],
    orderList4:[
      {
        id: '4',
        orderTime: '2020-08-27',
        orderStatus: '待评价',
        orderImage: [{
            imageUrl: '/images/complete.png'
          },
          {
            imageUrl: '/images/complete.png'
          },
        ],
        goodsNum: '2',
        allPrice: '178.99'
      },
    ]
  },
  created(){
    this.data.orderList= this.data.orderList3
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