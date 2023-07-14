const getDB = (name: string, version: number = 1) => {
  return indexedDB.open(name, version);
};

const DB = getDB("cars");

DB.onupgradeneeded = (event) => {
  switch (event.oldVersion) {
    case 0:
      break;

    default:
      break;
  }
};

DB.onerror = () => {};

DB.onsuccess = () => {
  const connection = DB.result;
  connection.onversionchange = () => {
    connection.close();
    alert("Database is outdated, please reload the page.");
  };
};

DB.onblocked = () => {};

const deleteDB = (dbName: string) => {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(dbName);
    deleteRequest.onsuccess = () => {
      resolve(true);
    };
    deleteRequest.onerror = () => {
      reject(false);
    };
  });
};
