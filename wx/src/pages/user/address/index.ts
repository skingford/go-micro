import { common } from '@config';
import { routeService } from '@util';

Page({
  data: {
    //#region data
    items: [
      {
        id: '1',
        mobile: '132',
        address: '地址'
      }
    ],
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
  add() {
    routeService.navigate('../address/add');
  },
  modify(e: any) {
    routeService.navigate('../address/add?id=' + e.currentTarget.dataset.id);
  },
  delete() {},
  // 下拉刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  getDatas() {}
  //#endregion
});
