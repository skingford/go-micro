/**
 * 对话工具
 */
export class DialogService {
  /**
   * alert弹出框
   */
  async alert(content = '确认操作吗？', title = '温馨提示'): Promise<boolean> {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title,
        content,
        showCancel: false,
        success: () => resolve(true),
        fail: () => reject(false)
      });
    });
  }

  /**
   *  确认提示框
   */
  async confirm(content = '确认操作吗？', title = '温馨提示'): Promise<boolean> {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title,
        content,
        showCancel: true,
        success(res) {
          if (res.confirm) {
            resolve(true);
          } else if (res.cancel) {
            resolve(false);
          }
        },
        fail: () => reject(false)
      });
    });
  }

  /**
   * 全局提示
   */
  async toast(title: string, icon?: 'none' | 'success' | 'error' | 'loading'): Promise<void> {
    return new Promise(() => {
      wx.showToast({
        title,
        icon,
        duration: 2000
      });
    });
  }

  /**
   * 吐司水印提示框
   */
  async tipToast(title: string, duration = 2000): Promise<void> {
    return new Promise(() => {
      wx.showToast({
        title,
        duration
      });
    });
  }

  /**
   * 显示loading小提示，自动关闭
   */
  tipLoading(title = '加载中', duration = 2000): void {
    wx.showLoading({
      title
    });
    setTimeout(function () {
      wx.hideLoading();
    }, duration);
  }

  /**
   * 显示loading动画，需要调用closeLoading()手动关闭
   */
  loading(title = '加载中'): void {
    wx.showLoading({
      title
    });
  }

  /**
   * 关闭loading
   */
  closeLoading(): void {
    wx.hideLoading();
  }
}

export default new DialogService();
