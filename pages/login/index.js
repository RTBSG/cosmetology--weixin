import http from '../../utils/http.js'
Page({
  data: {
    userInfo: ""
  },

  onLoad() {
    // 检查用户是否已经授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo
              });
              wx.showToast({
                title: '已自动登录',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  },

  onGetUserProfile(e) {
    // 获取用户信息
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: res => {
        console.log('User info:', res.userInfo);
        this.setData({
          userInfo: res.userInfo
        });
      
        // 可以在这里发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.login({
          success: loginRes => {
            if (loginRes.code) {
              console.log('Login code:', loginRes);
              console.log('userInfo:', res.userInfo);
              // 发起网络请求，用 loginRes.code 去换取 openId 等信息
              
              http.postRequest('weixin/weChat/login/getAccessToken', 
              { nickName: res.userInfo.nickName,
                code: loginRes.code},
              (res) => {
               console.log('suf ----res',res)
                that.setData({
                 
                  // userInfo: res.userInfo
                });
    
              }
            )
            } else {
              console.log('登录失败！' + loginRes.errMsg);
            }
          }
        });
      },
      fail: err => {
        console.log('获取用户信息失败', err);
        wx.showToast({
          title: '授权失败',
          icon: 'none'
        });
      }
    });
  }
});
