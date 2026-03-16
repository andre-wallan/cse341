const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // Explicitly select the DB name you are using in MongoDB
      database = client.db('cse341'); // <- make sure this matches your DB
      console.log('Connected to MongoDB');
      callback(null, database);
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = { initDb, getDb };