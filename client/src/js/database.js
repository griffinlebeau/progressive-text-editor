import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initDb = async () => // configure database 
  openDB('pte_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('pte_db')) {
        console.log('pte database already exists');
        return;
      }
      db.createObjectStore('pte_db', { keyPath: 'id', autoIncrement: true });
      console.log('pte database created');
    },
  });

export const putDb = async (content) => {
  console.log('POST to the database');
  const pteDb = await openDB('pte_db', 1);
  const tx = pteDb.transaction('text', 'readwrite');
  const store = tx.objectStore('text');
  const request = store.add({ text: content });
  const result = await request;
  console.log('data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET from the database');
  const pteDb= await openDB('pte_db', 1); // create connection
  const tx = pteDb.transaction('text', 'readonly'); // create transaction
  const store = tx.objectStore('text'); // open object store
  const request = store.getAll(); // get all data from database 
  const result = await request; // confirm the request 
  console.log('result.value', result);
  return result;

};

