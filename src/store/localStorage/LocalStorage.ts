import LocalStorageKey from '@/store/localStorage/LocalStorageKey';

class LocalStorage {
  static getItem(key: LocalStorageKey) {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  }

  static setItem<T>(key: LocalStorageKey, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static removeItem(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
