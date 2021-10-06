import { common } from '@config';
import { routeService, WxBindRes } from '@util';

Page({
  data: {
    //#region data
    id: '',
    detail: undefined,
    empty: common.emptyText
    //#endregion
  },

  /**
   * 生命周期函数--监听页面加载
   * options: any
   */
  onLoad(options: any) {
    this.data.id = options.id;
    this.getData();
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
