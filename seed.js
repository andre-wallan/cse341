const mongoose = require('mongoose');
require('dotenv').config();
const Contact = require('./models/contact');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (err) {
    console.error('❌ Connection error:', err);
    return false;
  }
};

const seedContacts = async () => {
  // Sample contacts data
  const contactsData = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: new Date('1990-01-15')
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      favoriteColor: 'Purple',
      birthday: new Date('1992-05-20')
    },
    {
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      favoriteColor: 'Green',
      birthday: new Date('1985-11-08')
    }
  ];

  try {
    // Clear existing contacts
    await Contact.deleteMany({});
    console.log('📭 Cleared existing contacts');

    // Insert new contacts
    const result = await Contact.insertMany(contactsData);
    console.log(`✅ Successfully added ${result.length} contacts`);
    console.log('📋 Contact IDs for reference:');
    result.forEach(contact => {
      console.log(`${contact.firstName} ${contact.lastName}: ${contact._id}`);
    });
  } catch (err) {
    console.error('❌ Error seeding contacts:', err);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('📴 MongoDB connection closed');
  }
};

const run = async () => {
  const connected = await connectDB();
  if (connected) {
    await seedContacts();
  }
};

run();