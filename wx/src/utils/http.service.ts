import dialogService from './dialog.service';

export class HttpService {
  //#region data
  private dialogService = dialogService;
  private header = { 'content-type': 'application/x-www-form-urlencoded' };
  //#endregion

  public async get(url: string, params?: any, loading = false): Promise<any> {
    return this.request(url, params, 'GET', loading);
  }
  public async post(url: string, params?: any, loading = false): Promise<any> {
    return this.request(url, params, 'POST', loading);
  }
  public async put(url: string, params?: any, loading = false): Promise<any> {
    return this.request(url, params, 'PUT', loading);
  }
  public async delete(url: string, params?: any, loading = false): Promise<any> {
    return this.request(url, params, 'DELETE', loading);
  }

  private request(
    url: string,
    params?: string | ArrayBuffer,
    method?: any,
    loading = false
  ): Promise<any> {
    const that = this;
    if (loading) {
      that.dialogService.loading('loading...');
    }

    return new Promise((resolve, reject) => {
      wx.request({
        url: that.getReqUrl(url),
        data: params,
        header: this.header,
        method,
        dataType: 'json',
        responseType: 'text',
        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject();
          }
        },
        fail: res => {
          reject(res);
        },
        complete() {
          loading && that.dialogService.closeLoading();
        }
      });
    });
  }

  /**
   * 整合Url
   */
  private getReqUrl(url: string): string {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      return url;
    }
    return url;
  }
}

export default new HttpService();
