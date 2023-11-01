var app = getApp()
const data = require('../../utils/data');
var mydata = require('../../utils/data')
var util = require('../../utils/util')
import http from '../../utils/http.js'

Page({
  data: {
    addrArray: util.replacePhone(mydata.userData().addrs, true),
    addrIndex: 0,
    bookSuccessHidden: true,
    bookFailHidden: true,
    date: '',
    dateTime: "",
    show: false,
    minHour: "10:00",
    maxHour: "20:00",
    phone: "",
    itemid: "",
    placeholder: "",
    toastFailMsg:"预定失败，请稍后再试"

  },
  onDateDisplay() {
    this.setData({
      show: true
    });
  },
  onDateClose() {
    this.setData({
      show: false
    });
  },

  formatDate(date) {
    console.log(date)
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onDateConfirm(event) {
    console.log(this.formatDate(event.detail))
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
  onLoad: function (options) {
    this.setData({
      itemid: options.itemid
    })
  },
  // 地址选择
  bindAddrPickerChange: function (e) {
    console.log('Addrpicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      addrIndex: e.detail.value
    })
  },
  bindToastTap: function () {
    // 校验日期和手机号
    if (!this.isValidDate(this.data.date)) {
      wx.showToast({
        title: '请选择预约日期',
        icon: 'none'
      });
      return;
    }
    if (!this.isValidDate(this.data.dateTime)) {
      wx.showToast({
        title: '请选择预约时间',
        icon: 'none'
      });
      return;
    }
    if (!this.isValidPhoneNumber(this.data.phone)) {
      wx.showToast({
        title: '请填写正确的联系方式',
        icon: 'none'
      });
      return;
    }
    http.postRequest('appointments/insert/appointment', {
      appointmentData: this.data.date,
      appointmentTime: this.data.time,
      beautyItemId: this.data.itemid,
      appointmentPhone: this.data.phone
    },
    (res) => {
      this.setData({
        bookSuccessHidden:false
    })
  
    },
    (res) => {
      
      this.setData({
        toastFailMsg:res,
        bookFailHidden:false
    })
    })
  },
  hideSuccessToast: function () {
    this.setData({
      bookSuccessHidden: true
    })
    console.log("即将跳转到个人页面")
    wx.switchTab({
      url: '../user/user'
    })
  },

  hideFailToast: function () {
    this.setData({
      bookFailHidden: true
    })
  },
  // 日期校验函数
  isValidDate: function (date) {
    // 检查日期是否为空
    if (!date) {
      return false;
    }
    // 日期不为空即为正确
    return true;

  },

  // 手机号校验函数
  isValidPhoneNumber: function (phone) {
    // 中国地区手机号正则表达式，这里使用常见的手机号格式
    const phonePattern = /^1[3456789]\d{9}$/;
    // 使用正则表达式检查手机号是否符合中国地区手机号格式
    return phonePattern.test(phone);
  },
  // 日期选择
  bindDateChange: function (e) {
    console.log('date picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 时间选择
  bindTimeChange: function (e) {
    console.log('time picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value,
      dateTime: e.detail.value, // 更新显示在页面的时间
    })
  }

})