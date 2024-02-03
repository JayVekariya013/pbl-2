const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// MongoDB connection
mongoose.connect(`mongodb://127.0.0.1:27017/finance_management`, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {console.log("Connection Successful")})
//.catch( (error) => {console.log("Recieved an error")}) ;
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Define schema and model for signup data
const signupSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Signup = mongoose.model('Signup', signupSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/signup', async (req, res) => {
    try {
        const signupData = req.body;
        const signup = new Signup(signupData);
        await signup.save();
        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists in the database
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        // Check if the password is correct
        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // User authenticated successfully
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
