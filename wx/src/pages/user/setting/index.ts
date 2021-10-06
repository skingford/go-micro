import { common } from '@config';
import { routeService, dialogService, WxBindRes, cacheService } from '@util';

Page({
  data: {
    //#region data
    version: ''
    //#endregion
  },

  /**
   * 生命周期函数--监听页面加载
   * options: any
   */
  onLoad() {
    this.setData({
      version: common.version
    });
  },

  //#region method
  /**
   * 页面跳转
   */
  toPage(e: WxBindRes) {
    routeService.navigate(e.currentTarget.dataset.page);
  },
  clearStorage() {
    cacheService.clear();
    dialogService.toast('已清除', 'success');
  }
  //#endregion
});
