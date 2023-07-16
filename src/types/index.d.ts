export {};

declare global {
  type Class<T> = new (...args: any[]) => T
  interface Window {
    Brand: Class;
    brand: Brand;
    db: IDBDatabase;
    wrapPromiseDB: (
      idb: IDBRequest<any> | IDBRequest<any[]>
    ) => Promise<T | T[]>;
    seedingDataBrand: () => void;
  }
}
