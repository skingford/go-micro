import { common } from '@config';
import { routeService, WxBindRes } from '@util';

Page({
  data: {
    //#region data
    flavs: [],
    empty: common.emptyText
    //#endregion
  },

  /**
   * 生命周期函数--监听页面加载
   * options: any
   */
  onLoad() {},
  /**
   * 监听页面显示
   */
  onShow() {},
  //#region method
  /**
   * 页面跳转
   */
  toPage(e: WxBindRes) {
    routeService.navigate(e.currentTarget.dataset.page);
  },
  getDatas() {}
  //#endregion
});
