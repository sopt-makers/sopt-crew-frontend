import LocalStorageKey from '@/store/localStorage/LocalStorageKey';

class LocalStorage {
  static getItem(key: LocalStorageKey) {
    const item = localStorage.getItem(key);
    if (item == null) return null;

    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  }

  static setItem<T>(key: LocalStorageKey, value: T) {
    if (value == null) {
      // value가 null, undefined 이면 저장하지 않고 삭제
      LocalStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  static removeItem(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
