// controllers/contact.js 
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET /contacts
const getAll = async(req, res) => {
    //#swagger.tags=['Contact']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content_Type', 'application/json');
        res.status(200).json(contacts)
    })
    .catch((err) => {
        // If an error occurs, send a 500 status
    res.status(500).json({ error: 'Failed to fetch contacts' });
    });
};

// GET /contacts/:id
const getSingle = async(req, res) => {
    //#swagger.tags=['Contact']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content_Type', 'application/json');
        res.status(200).json(contacts[0])
    })
    .catch((err) => {
        // If an error occurs, send a 500 status
    res.status(500).json({ error: 'Failed to fetch contacts' });
    });
};

// POST /contacts
// Creates a new contact. All fields are required.
const createContact = async (req, res, next) => {
    //#swagger.tags=['Contact']
  try {
    const { 
        firstName, 
        lastName, 
        email, 
        favoriteColor, 
        birthday 
    } = req.body;
    // Validate required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const db = mongodb.getDatabase().db();
    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });
    // Return the new contact's ID
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    next(err);
  }
};

// PUT /contacts/:id
// Updates an existing contact by its ID
const updateContact = async (req, res, next) => {
    //#swagger.tags=['Contact']
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const payload = req.body;
    delete payload._id; // Ensure _id is not modified
    const db = mongodb.getDatabase().db();
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: payload }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    // 204 No Content indicates success with no body
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// DELETE /contacts/:id
// Deletes a contact by its ID
const deleteContact = async (req, res, next) => {
    //#swagger.tags=['Contact']
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const db = mongodb.getDatabase().db();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    // 204 No Content indicates successful deletion
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};