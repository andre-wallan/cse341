const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json({ contacts }); // wrap in an object
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = getDb();
    const result = await db.collection('contacts').findOne({ _id: contactId });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST create contact
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const db = getDb();
    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update contact
router.put('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const db = getDb();
    const result = await db.collection('contacts').updateOne(
      { _id: contactId },
      { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE contact
router.delete('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = getDb();
    const result = await db.collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;