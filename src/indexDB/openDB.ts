import getDB from "./getDB";
import * as utils from "./utils";
import Brand from "./migrations/version_1";

const DB = getDB("cars");

DB.onupgradeneeded = (event) => {
  switch (event.oldVersion) {
    case 0:
      break;

    default:
      // update indexDB
      break;
  }
};

DB.onerror = () => {};

DB.onsuccess = () => {
  const connection = DB.result;
  window.db = connection;
  window.Brand = Brand
  window.brand = new window.Brand(window.db);
  window.wrapPromiseDB = utils.wrapPromiseDB;

  connection.onversionchange = () => {
    connection.close();
    alert("Database is outdated, please reload the page.");
  };
};

DB.onblocked = () => {};
