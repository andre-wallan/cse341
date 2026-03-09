require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { initDb } = require('./db/connects');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Contacts route
app.use('/contacts', contactsRoutes);

// Start server AFTER database connects
initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});