require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const port = 4000;
const app = express();

// Connecting to the database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database successfully connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Person Model
const Person = mongoose.model('Person', personSchema);

// Creating a Person
const person = new Person({
  name: 'Ameth Ndiaye',
  age: 22,
  favoriteFoods: ['Thiebou Dieune', 'Lakh']
});

person
  .save()
  .then(() => {
    console.log('Person added successfully.');
  })
  .catch((err) => {
    console.error(err);
  });

// Creating an Array of Persons
const arrayOfPeople = [
  { name: 'Khady Ndiaye', age: 27, favoriteFoods: ['Thiebou Yapp', 'Chicken'] },
  { name: 'Adja Ndiaye', age: 16, favoriteFoods: ['Soup Kandja', 'Rissole'] },
  { name: 'Fatima Ndiaye', age: 3, favoriteFoods: ['Yassa'] }
];

Person
  .insertMany(arrayOfPeople)
  .then(() => {
    console.log('People added successfully.');
  })
  .catch((err) => {
    console.error(err);
  });

// Getting Persons
Person
  .find()
  .then((docs) => {
    console.log('People Found:', docs);
  })
  .catch((err) => {
    console.error(err);
  });

// Getting Persons by Favorite Food "Mafe"
Person
  .findOne({ favoriteFoods: { $in: ['Mafe'] } })
  .then((doc) => {
    console.log('Person found:', doc);
  })
  .catch((err) => {
    console.error(err);
  });

// Getting Person by ID
const idUser = '646d241b4520b282ebf828b0';

Person
  .findById(idUser)
  .then((doc) => {
    console.log('Person found:', doc);
  })
  .catch((err) => {
    console.error(err);
  });

// Search by ID and Add New Favorite Food
const id = '646d241b4520b282ebf828b0';

Person
  .findById(id)
  .then((doc) => {
    doc.favoriteFoods.push('Hamburger');
    doc.save();
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// Find By Name And Update Age
Person
  .findOneAndUpdate({ name: 'Khady Ndiaye' }, { age: 27 }, { new: true })
  .then((doc) => {
    console.log('Age updated:', doc);
  })
  .catch((err) => {
    console.error(err);
  });

// Delete Person with ID 
const idDel = '646d241b4520b282ebf828af';

Person
  .findByIdAndRemove(idDel)
  .then(() => {
    console.log(`Person with ID ${idDel} has been deleted.`);
  })
  .catch((err) => {
    console.error(err);
  });

// Delete People With Name "Khady Ndiaye"
Person
  .deleteMany({ name: 'Khady Ndiaye' })
  .then(() => {
    console.log('Khady Ndiaye successfully deleted.');
  })
  .catch((err) => {
    console.error(err);
  });

// Finding People who like Yassa
Person
  .find({ favoriteFoods: { $in: ['Yassa'] } })
  .sort('name')
  .limit(2)
  .select()
  .then((docs) => {
    console.log('People who like Yassa:', docs);
  })
  .catch((err) => {
    console.error(err);
  });

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});