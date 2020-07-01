// components/goodList/index.js
Component({
  properties: {
    status: {
      type: String,
      value: 0,
    },
    bastList: {
      type: Object,
      value: [],
    }
  },
  data: {
    
  },
  methods: {
    addCart:function(event){
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    }
  }
})