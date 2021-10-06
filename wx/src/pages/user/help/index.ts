import { common } from '@config';
import { routeService, WxBindRes } from '@util';

Page({
  data: {
    //#region data
    items: [
      {
        name: '测试1'
      },
      {
        name: '测试2'
      },
      {
        name: '测试3'
      }
    ],
    children: [
      {
        id: '123',
        title: 'title'
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

  //#region method
  /**
   * 页面跳转
   */
  toPage(e: WxBindRes) {
    routeService.navigate(e.currentTarget.dataset.page);
  },
  change() {},
  getData() {}
  //#endregion
});
