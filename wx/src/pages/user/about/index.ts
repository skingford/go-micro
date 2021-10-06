import { common } from '@config';
import { WxBindRes, routeService } from '@util';

Page({
  data: {
    //#region data
    detail: undefined,
    key: '',
    empty: common.emptyText
    //#endregion
  },

  /**
   * 生命周期函数--监听页面加载
   * options: any
   */
  onLoad(options: any) {
    options.key = 'aboutus';
    this.data.key = options.key;
  },

  //#region method
  /**
   * 页面跳转
   */
  toPage(e: WxBindRes) {
    routeService.navigate(e.currentTarget.dataset.page);
  },
  getData() {}
  //#endregion
});
