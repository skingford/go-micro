//获取应用实例
// import { IMyApp } from "../../app";
import { dialogService, routeService, WxBindRes, wxService } from '@util';
import Toast from '@vant/weapp/toast/toast';

// const app = getApp<IMyApp>();

Page({
  wxService: wxService,

  data: {},

  /**
   * 生命周期函数--监听页面加载
   * options: any
   */
  onLoad(options: any) {
    console.log(options);
    wxService.setPageTitle('我的');
  },

  /**
   * 页面跳转
   */
  toPage(e: WxBindRes) {
    routeService.navigate(e.currentTarget.dataset.page);
  },

  /**
   * 显示alert
   */
  showAlert() {
    Toast('我是提示文案，建议不超过十五字~');
    dialogService.toast('ni ');
    // dialogService.alert('提示信息');
  }
});
