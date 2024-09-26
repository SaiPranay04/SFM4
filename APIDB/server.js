const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors= require('cors');
const routes = require('./routes');
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { 
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
 });

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to handle contact form submission
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

