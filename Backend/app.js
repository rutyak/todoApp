// ------------------------------------------Task-Database--------------------------------------
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
app.use(express.json());
app.use(cors());
let userEmail;

mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true });

// ------------------------------------------------signup/login----------------------------------

// Define User schema
//it is a structure of document within mongoDB
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
//User represents the collections in mongoDB
const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body; // distructuring username and password
  userEmail = email;
  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  //creating new on object
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  //saving in mongoDB collection
  await newUser.save();
  //sending response to frontend
  res.status(200).json({ message: 'Signup successful!' });
});

// ---------------------------------------------------Login endpoint-------------------------

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  userEmail = email;
  // Find the user by username
  const user = await User.findOne({ email });
  
  // Check if the user exists and the password is correct
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).json({ message: 'Login successful!'});
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

//---------------------------------taskForm------------------------

const taskSchema = new mongoose.Schema({
    email: String,
    task: String,
    description: String,
    time: String, 
    date: Number, 
    priority: String,
    stage: String
  });
  
  // tasks represents the collections in MongoDB
  let Task = mongoose.model('tasks', taskSchema); 
  
  app.post('/taskform', async (req, res) => {
    const {task, desc, time, dayOfMonth, priority, stage} = req.body;
    const email = userEmail;
    // creating new task object
    const newTask = new Task({ 
      email,
      task,
      description: desc,
      time,
      date: dayOfMonth, 
      priority,
      stage
    });
  
    // saving in MongoDB collection
    await newTask.save();
  
    // sending response to frontend 
    res.status(200).json({ message: `Task added successfully!`});
  });
  

// ------------------------------------task-fetching-------------------------------------

app.get('/tasks', async (req, res) => {
  try {
    const email  = userEmail;
    const tasks = await Task.find({ email }); // Fetch tasks for the specific user
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  // ------------------------------------------Delete-functionality--------------------------------------

    // Delete user
    app.get('/deleteTask/:id', async function(req, res) { 

      const id = req.params.id;

      try {
        let deletedtask = await Task.findOneAndDelete({_id: id});
        res.status(204).json(deletedtask); // No content on successful deletion
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
    });


//---------------------------edit-sections--------------------------------------------------------

app.put('/updateTask/:id', async (req, res) => {
  try {
    const id  = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }, // Use req.body to update fields based on the incoming JSON data
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

