/**
 * 路由
 * 详情https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html
 */
export class RouteService {
  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * @param url tabs页面
   */
  async tab(url: string): Promise<string> {
    url = this.getPageUrl(url);
    return new Promise((resolve, reject) => {
      wx.switchTab({
        url: url,
        success: res => {
          resolve(res.errMsg);
        },
        fail: res => {
          reject(res.errMsg);
        }
      });
    });
  }
  /**
   * 页面跳转
   * 不能跳到 tabbar 页面
   */
  async navigate(url: string, json: any = {}): Promise<string> {
    url = this.getPageUrl(url, json);
    return new Promise((resolve, reject) => {
      wx.navigateTo({
        url: url,
        success: res => {
          resolve(res.errMsg);
        },
        fail: res => {
          reject(res.errMsg);
        }
      });
    });
  }
  /**
   * 返回
   * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
   */
  async back(delta = 1): Promise<string> {
    return new Promise((resolve, reject) => {
      wx.navigateBack({
        delta,
        success: res => {
          resolve(res.errMsg);
        },
        fail: res => {
          reject(res.errMsg);
        }
      });
    });
  }

  private getPageUrl(url: string, json: any = {}): string {
    if (url.indexOf('../') === -1 && url.indexOf('?') === -1) {
      url = '../' + url + '/' + url;
    }
    const jsonKeys: string[] = Object.keys(json);
    if (jsonKeys.length === 0) {
      return url;
    }
    //json转url参数
    const urlParams = jsonKeys
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
      })
      .join('&');
    if (url.indexOf('?') === -1) {
      url += '?' + urlParams;
    } else {
      url += '&' + urlParams;
    }
    return url;
  }
}

export default new RouteService();
