// pages/appointment/appointment.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookItem: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(111)
    http.getRequest('appointments/selectUserInfo', {},
      (res) => {
        console.log('appointments',res)
        let bookItem = res.data;
        this.setData({
          bookItem:bookItem
        })

      },
    )
  },

    update: function(option) {
      console.log('option',option)
      var data=option.currentTarget.dataset;
      var appointment=this.data.bookItem.filter(item => item.appointmentId === data.appointmentId);
      let bookItemJSON = JSON.stringify(appointment);
      wx.navigateTo({
        url: '../book/book?itemid=' + option.currentTarget.dataset.itemid+'&bookItem='+bookItemJSON
      })
    }
  ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})