interface ILocalStorageService {
  readonly get: (key: string) => string | null;
  readonly set: (key: string, value: string) => void;
  readonly remove: (key: string) => void;
}

const localStorageService: ILocalStorageService = {
  get(key: string): string | null {
    if (localStorage.getItemkey !== null) {
      return localStorage.getItem(key) as string;
    } else {
      return null;
    }
  },
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
};

export default localStorageService;
