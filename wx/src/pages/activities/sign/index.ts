import { common } from '../../../configs/index';
import { routeService, dialogService, WxBindRes } from '../../../utils/index';

Page({
  data: {
    //#region data
    minDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    empty: common.emptyText
    //#endregion
  },

  /**
   * 生命周期函数--监听页面加载
   * options: any
   */
  onLoad(): void {},
  /**
   * 监听页面显示
   */
  onShow(): void {},
  //#region method
  /**
   * 页面跳转
   */
  toPage(e: WxBindRes) {
    routeService.navigate(e.currentTarget.dataset.page);
  },
  // 签到
  sign() {
    dialogService.loading();
    setTimeout(() => {
      dialogService.closeLoading();
    }, 2000);
  },
  getDatas() {}
  //#endregion
});
