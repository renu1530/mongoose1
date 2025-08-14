var express = require('express');
var app = express();
var mongoose = require('mongoose');
var firstSchema = require('./schema');
app.use(express.json());

// MongoDB URL without specifying a database name
let dburl = 'mongodb+srv://omprasad:9008210046@omprasad0.7wwgl.mongodb.net/'

//establish connection
mongoose.connect(dburl)
  .then(() => console.log('db connected'))
  .catch((err) => console.log('DB connection error:', err));

// GET route to fetch all users
app.get('/', async function (req, res) {
  try {
    const list = await firstSchema.find();
    res.send(list);
  } catch (err) {
    console.log('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

// POST route to create a new user
app.post('/sign-up', async function (req, res) {
  try {
    const newUser = new firstSchema(req.body);
    await newUser.save();
    res.json({
      message: 'Data inserted successfully'
    });
  } catch (err) {
    console.log('Error saving data:', err);
    res.status(500).send('Error saving data');
  }
});

// PUT route to update a user's information by email
app.put('/update/:id', async function (req, res) {
  try {
    let user=await firstModel.findOne({id:req.params.id});
    if(!user){
      return res.status(404).json({message:'user not found'});
}
    const updatedUser = await firstSchema.findByIdAndUpdate(
      req.params.id,  // The user ID from the URL
      req.body,       // The data to update
      { new: true }   // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json({
      message: 'User updated successfully',
      updatedUser: updatedUser
    });
  } catch (err) {
    console.log('Error updating data:', err);
    res.status(500).send('Error updating data');
  }
});

// DELETE route to delete a user by email
app.delete('/delete/:id', async function (req, res) {
  try {
    const deletedUser = await firstSchema.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.json({
      message: 'User deleted successfully',
      deletedUser: deletedUser
    });
  } catch (err) {
    console.log('Error deleting data:', err);
    res.status(500).send('Error deleting data');
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));