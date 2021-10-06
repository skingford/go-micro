/*
 * @Author: kingford
 * @Date: 2021-09-02 17:38:00
 * @LastEditTime: 2021-09-18 16:49:28
 */
//获取应用实例
// import { IMyApp } from "../../app";
import { httpClient, WxBindRes, routeService, wxService } from '../../utils/index';

// const app = getApp<IMyApp>();
Page({
  data: {},

  /**
   * 生命周期函数--监听页面加载
   * options: any
   */
  onLoad(options: any) {
    console.log(options);
    wxService.setPageTitle('登录');
  },

  /**
   * 页面跳转
   */
  toPage(e: WxBindRes) {
    routeService.navigate(e.currentTarget.dataset.page);
  },

  /**
   * 显示alert
   */
  showAlert() {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          httpClient
            .post('http://localhost:3000/api/v1/wechat-mini/login', { code: res.code }, true)
            .then((res: any) => {
              console.log(res);
            });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });

    // dialogService.alert();
    // alertService.alert('提示信息');
  }
});
