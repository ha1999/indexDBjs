const getDB = (name: string, version: number = 1) => {
  return indexedDB.open(name, version);
};

export default getDB;
