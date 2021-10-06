import { wxService, routeService, dialogService, WxBindRes } from '@util';
import * as dayjs from 'dayjs';
import { TimerBehavior } from '@util/timers/index';

Page({
  behaviors: [TimerBehavior],
  data: {
    updateDate: ''
  },
  // 监听页面加载 (生命周期：https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)
  onLoad(options: any) {
    console.log(options);
    wxService.setPageTitle('首页');

    // 首次加载时间
    this.changeData();
  },
  // 监听页面初次渲染完成
  onReady() {
    // 倒计时
    (this as any).$setInterval(() => {
      this.changeData();
    }, 1000);
  },

  //#region method
  // 页面跳转
  toPage(e: WxBindRes) {
    routeService.navigate(e.currentTarget.dataset.page, { from: 'home' });
  },
  toTabPage() {
    routeService.tab('user');
  },
  toView() {
    routeService.navigate('web-view');
  },
  // 显示alert
  showAlert() {
    dialogService.alert('提示信息');
  },
  changeData() {
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.setData({
      updateDate: date
    });
  }
  //#endregion
});
