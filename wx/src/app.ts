import wxService from './utils/wx.service';

App<IAppOption>({
  globalData: {},
  onLaunch() {
    //检查更新
    wxService.checkVersionUpdate();
  }
});
