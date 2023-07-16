import { faker } from "@faker-js/faker";

export default class Brand {
  keyPath: string;
  db: IDBDatabase;
  autoIncrement: boolean;
  constructor(
    db: IDBDatabase,
    keyPath: string = "id",
    autoIncrement: boolean = true
  ) {
    this.db = db;
    this.keyPath = keyPath;
    this.autoIncrement = autoIncrement;
    this.createBrandStore();
  }

  createBrandStore() {
    if (this.db.objectStoreNames.contains("brand"))
      return this.db.transaction("brand", "readonly").objectStore("brand");
    return this.db.createObjectStore("brand", {
      keyPath: this.keyPath,
      autoIncrement: this.autoIncrement,
    });
  }

  getBrand(){
    return this.db.transaction("brand", "readonly").objectStore("brand");
  }

  seedingDataBrand(count: number = 10) {
    const transaction = this.db.transaction("brand", "readwrite");
    const brand = transaction.objectStore("brand");
    for (let i = 0; i < count; i++) {
      const resultAdd = brand.add({
        name: faker.company.name(),
        country: faker.location.country(),
        establish_year: faker.number.int({
          min: 1900,
          max: new Date().getFullYear(),
        }),
      });
      resultAdd.onerror = (event) => {
        console.log("Error insert brand!", transaction.error?.name);
        event.preventDefault();
        event.stopPropagation();
      };
    }
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        resolve(1);
      };
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  }

  get(condition: IDBValidKey | IDBKeyRange) {
    const brand = this.getBrand().get(condition);
    return window.wrapPromiseDB(brand);
  }

  getKey(condition: IDBValidKey | IDBKeyRange) {
    const brand = this.getBrand().getKey(condition);
    return window.wrapPromiseDB(brand);
  }

  getAll(condition?: IDBValidKey | IDBKeyRange, count: number = 10) {
    const brands = this.getBrand().getAll(condition, count);
    return window.wrapPromiseDB(brands);
  }

  getAllKeys(condition: IDBValidKey | IDBKeyRange) {
    const brand = this.getBrand().getAllKeys(condition);
    return window.wrapPromiseDB(brand);
  }

  count(condition: IDBValidKey | IDBKeyRange) {
    const count = this.getBrand().count(condition);
    return window.wrapPromiseDB(count);
  }
}
