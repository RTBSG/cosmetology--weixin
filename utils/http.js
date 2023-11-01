/**
 * 
 */ // 登录请求头
 var header = {
  "content-type": "application/json;charset=utf-8", // 请求数据类型根据需求自行更改
  os: "android/ios",
  version: "1.0.0",
};
// url请求前缀（这里是开发配置，线上环境和上线测试应使用域名）
const BaseUrl = "http://localhost:8080/"

/**
* function: 根据需求处理请求参数：添加固定参数配置等
* @params 请求参数
*/
function dealParams(params) {
  console.log("请求参数:", params);
  return params;
}

/**
* 供外部get请求调用
*/
function get(url, params, onSuccess, onFailed, useToken) {
  // console.log("请求方式：", "GET");
  request(url, params, "GET", onSuccess, onFailed, useToken);
}

/**
* 供外部post请求调用
*/
function post(url, params, onSuccess, onFailed, useToken) {
  // console.log("请求方式：", "POST");
  request(url, params, "POST", onSuccess, onFailed, useToken);
}

/**
* function: 封装网络请求
* @url URL地址
* @params 请求参数
* @method 请求方式：GET/POST
* @onSuccess 成功回调
* @onFailed  失败回调
* @useToken 是否使用token（不使用token调用时填入任意参数即可  如1）
*/

function request(url, params, method, onSuccess, onFailed, useToken) {
  // 判断是否携带token，token在用户登录后保存在app.js定义的对象中可根据自己保存策略获取。

  // 读本地缓存
  useToken == null || useToken == "undefined" ?
      (header["Authorization"] =wx.getStorageSync("token")): 
      
      delete header.Authorization;

  // 读全局的globalData
  //  useToken == null || useToken == "undefined" ?
  //   (header["Authorization"] = "Bearer " + getApp().globalData.token) :
  //   delete header.Authorization;

  wx.showLoading({
      title: "正在加载中...",
  });
  // console.log("请求头：", header);
  wx.request({
      url: BaseUrl + url,
      data: dealParams(params),
      method: method,
      header: header,
      success: function (res) {
          wx.hideLoading();
          console.log("响应：", res.data);
          if (res.data) {
              /** start 根据需求 接口的返回状态码进行处理 */
              if (res.statusCode == 200) {
                  onSuccess(res.data); //request success
              } else {
                  onFailed(res.data.message); //request failed
              }
              /** end 处理结束*/
          }
      },
      fail: function (error) {
          // onFailed(""); //failure for other reasons
          console.log(error);

          wx.showLoading({
              title: "网络连接失败",
          });
      },
  });
}

// 1.通过module.exports方式提供给外部调用
module.exports = {
  postRequest: post,
  getRequest: get
};
