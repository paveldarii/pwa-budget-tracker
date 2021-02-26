//general function that can be used to post, get, or delete all data from the indexedDB
function useIndexedDb(databaseName, storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(databaseName, 1);
    let db, tx, store;

    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
    };

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log("error");
      };
      if (method === "put") {
        store.put(object);
      } else if (method === "get") {
        const all = store.getAll();
        all.onsuccess = function () {
          resolve(all.result);
        };
      } else if (method === "delete") {
        store.clear();
      }
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
