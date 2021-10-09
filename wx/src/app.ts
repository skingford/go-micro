/*
 * @Author: kingford
 * @Date: 2021-09-04 21:22:06
 * @LastEditTime: 2021-10-09 23:21:16
 */
import wxService from './utils/wx.service';
import { httpClient } from './utils/index';

App<IAppOption>({
  globalData: {},
  onLaunch() {
    //检查更新
    wxService.checkVersionUpdate();

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          httpClient
            .post('http://localhost:8080/v1/auth/login', { code: res.code }, true)
            .then((res: any) => {
              console.log(res);
            });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  }
});
