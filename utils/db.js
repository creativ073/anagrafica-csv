const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./store/db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ csv: [], anagrafica: [] }).write();

export default db;
