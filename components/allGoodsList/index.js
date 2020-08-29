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
    orderList:[
      {
        orderTime:'下单时间：2020-08-27',
        orderStatus:'待派单',
        orderImage:[{
          imageUrl:'/images/complete.png'
        },
        {
          imageUrl:'/images/complete.png'
        }],
        goodsNum:'2',
        allPrice:'178.99'
      },
      
    ],
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    orderDetails(){
      wx.navigateTo({
        url: '/pages/orderDetails/index',
     
      })
    }
  }
})
