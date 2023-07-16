export {};
declare global {
  interface Brand {
    createBrandStore: () => IDBObjectStore;
    seedingDataBrand: (count: number) => Promise<unknown>;
    get: <T>(condition: IDBValidKey | IDBKeyRange) => Promise<T>;
    getKey: <T>(condition: IDBValidKey | IDBKeyRange) => Promise<T>;
    getAll: <T>(condition: IDBValidKey | IDBKeyRange) => Promise<T[]>;
    getAllKeys: <T>(condition: IDBValidKey | IDBKeyRange) => Promise<T[]>;
    count: (condition: IDBValidKey | IDBKeyRange) => Promise<number>;
  }

  interface brand {
    id: number;
    name: string;
    country: string;
    establish_year: number;
  }
}
