const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI =
  'mongodb+srv://gamasimao:@ironhack.qdtigpo.mongodb.net/recipe-app';

async function updateDatabase() {
  // Connection to the database "recipe-app"
  try {
    const x = await mongoose.connect(MONGODB_URI);
    console.log('connected to', x.connections[0].name);
    await Recipe.deleteMany();

    //Start coding here

    await Recipe.create({
      title: 'Asian Glazed Chicken Thighs',
      level: 'Amateur Chef',
      ingredients: [
        '1/2 cup rice vinegar',
        '5 tablespoons honey',
        '1/3 cup soy sauce (such as Silver Swan®)',
        '1/4 cup Asian (toasted) sesame oil',
        '3 tablespoons Asian chili garlic sauce',
        '3 tablespoons minced garlic',
        'salt to taste',
        '8 skinless, boneless chicken thighs'
      ],
      cuisine: 'Asian',
      dishType: 'main_course',
      image:
        'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 40,
      creator: 'Chef LePapu'
    });

    await Recipe.insertMany(data); // inserting the JSON array

    await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );

    await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log('Recipe successfully removed');
  } catch (e) {
    console.error('Error connecting to the database', error);
  } finally {
    mongoose.connection.close();
  }
}

updateDatabase();
