//index.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js')

Page({
  // 页面初始数据
  data: {
    // banner 初始化
    banner_url: fileData.getBannerData(),
    // nav 初始化
    navTopItems: fileData.getIndexNavData(),
    navSectionItems: fileData.getIndexNavSectionData(),
    childent:[],
    parent:[],
    curNavId: 1,
    curIndex: 0
  },

  onLoad: function () {
    var that = this
    // 在请求后台数据成功后，将后台数据赋值给小程序页面的data对象
    wx.request({
      url: 'http://localhost:8080/beautyItems/selectAll',
      success: function (res) {

        wx.setStorageSync('token', res.header.Authorization);

        var backendIndexData = res.data.data;
         var parent1 = backendIndexData.filter(item => item.itemTyep === "0");
        var  childent1 = backendIndexData.filter(item => item.itemTyep === "1");
     
        // 将后台数据赋值给小程序页面的data对象的index属性
        that.setData({
          navTopItems :parent1,
          navSectionItems:childent1,
          parent:parent1,
          childent:childent1
        });
      }
    });
  },
  switchTab: function (e) {
    let parentItemId = parseInt(e.detail.name);
    console.log(e)
   var list= this.data.childent.filter(item => item.parentId == parentItemId)
    this.setData({
      navSectionItems: list
    })

    if(parentItemId==0){
      this.setData({
        navSectionItems: this.data.childent
      })
    }
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?artype=' + e.currentTarget.dataset.artype
    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    var curid = this.data.curIndex

    if (this.data.navSectionItems[curid].length === 0) return

    var that = this
    that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
    that.setData({
      list: that.data.navSectionItems,
    })
  },
  // book
  bookTap: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../book/book?itemid=' + e.currentTarget.dataset.itemid
    })
  }

})