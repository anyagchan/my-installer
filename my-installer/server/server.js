const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://anyagchan:anya@cluster0.2necosn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const storeSchema = new mongoose.Schema({
    name: String,
    address: String,
  });

const Store = mongoose.model('Store', storeSchema, 'Stores');

app.get('/stores', async (req, res) => {
    try {
      const data = await Store.find(); 
      res.json(data); // Return data as JSON
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
})

app.listen(4000, () => {
	console.log("Server started on port 4000")
})