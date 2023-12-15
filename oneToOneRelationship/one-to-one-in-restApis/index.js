const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/zkoder_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to MongoDB."))
.catch(err => console.error("Connection error", err));

// Import Mongoose models
const { Customer, Identifier } = require('./models');

// Create a new customer
app.post('/api/customers', async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    const customer = new Customer({ name, age, gender });
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new identifier
app.post('/api/identifiers', async (req, res) => {
  try {
    const { customerCode, customerId } = req.body;
    console.log(customerId,"customerId")
    const customer = await Customer.findById(customerId);
    console.log(customer,"customer+++");
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const identifier = new Identifier({ customerCode, customer });
    console.log(identifier,"identifier");
    const savedIdentifier = await identifier.save();
    res.status(201).json(savedIdentifier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all identifiers
app.get('/api/identifiers', async (req, res) => {
  try {
    const identifiers = await Identifier.find();
    res.json(identifiers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
