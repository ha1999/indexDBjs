export const wrapPromiseDB = (idbRequest: IDBRequest<any>) => {
  return new Promise((resolve, reject) => {
    idbRequest.onerror = () => {
      reject(idbRequest.error);
    };
    idbRequest.onsuccess = () => {
      resolve(idbRequest.result);
    };
  });
};
