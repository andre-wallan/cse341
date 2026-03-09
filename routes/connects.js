const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connects');
const ObjectId = require('mongodb').ObjectId;
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/single', async (req, res) => {
  try {
    const contactId = new ObjectId(req.query.id);
    const db = getDb();
    const result = await db.collection('contacts').findOne({ _id: contactId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;