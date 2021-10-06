import { common } from '@config';

Page({
  data: {
    //#region data
    provinces: undefined, // 省份数据数组
    pIndex: 0, //选择的省下标
    cities: undefined, // 城市数据数组
    cIndex: 0, //选择的市下标
    areas: undefined, // 区县数数组
    aIndex: 0, //选择的区下标
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

  delete() {},
  readFromWx() {
    wx.chooseAddress({
      success: res => {
        res;
        debugger;
      }
    });
  },
  getDatas() {}
  //#endregion
});
