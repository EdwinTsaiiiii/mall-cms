enum cacheType {
  Local,
  Session
}

class MyCache {
  storage: Storage;
  constructor(type: cacheType) {
    this.storage = type === cacheType.Local ? localStorage : sessionStorage;
  }
  setCache(key: string, value: any) {
    // 注意这里不能只写value，否则设置是否保存密码为false时不执行
    if (value !== null || undefined) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }
  getCache(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  removeCache(key: string) {
    this.storage.removeItem(key);
  }
  clearCache() {
    this.storage.clear();
  }
}

const localCache = new MyCache(cacheType.Local);
const sessionCache = new MyCache(cacheType.Session);

export { localCache, sessionCache };
