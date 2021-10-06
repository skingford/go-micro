/**
 * 缓存
 */
export class CacheService {
  /**
   * 存数据
   * @param key 标识
   * @param data 数据
   */
  async set(key: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data,
        success: () => resolve(),
        fail: () => reject()
      });
    });
  }
  /**
   * 获取数据
   * @param key 标识
   */
  async get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success: res => resolve(res.data),
        fail: res => reject(res.errMsg)
      });
    });
  }

  /**
   * 移除数据
   * @param key 标识
   */
  async remove(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      wx.removeStorage({
        key,
        success: res => resolve(res.errMsg),
        fail: res => reject(res.errMsg)
      });
    });
  }
  /**
   * 清空缓存
   * @param key 标识
   */
  async clear(): Promise<string> {
    return new Promise((resolve, reject) => {
      wx.clearStorage({
        success: res => resolve(res.errMsg),
        fail: res => reject(res.errMsg)
      });
    });
  }
}

export default new CacheService();
