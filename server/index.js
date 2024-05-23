const express = require('express');
const cors = require('cors');
const { createUsers, readUsers, deleteUser } = require('./crud');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get('/users', (req, res) => {
    readUsers((err, users) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(users);
        }
    });
});

app.post('/users', (req, res) => {
    const data = req.body;

    // Validate and process user data
    if (typeof data !== 'object' || data === null) {
        return res.status(400).send('Invalid data format');
    }

    // Process each workout entry
    for (const workoutType in data) {
        const { description, time: sessionTime } = data[workoutType];

        // Validate the object structure
        if (typeof description !== 'string' || typeof sessionTime !== 'string') {
            console.error('Invalid data format for workout type:', workoutType);
            return res.status(400).send('Invalid data format');
        }

        // Create the user entry in the database
        createUsers(description, workoutType, sessionTime, (err, userData) => {
            if (err) {
                console.error('Error creating user:', err.message);
            } else {
                console.log(`User added with ID: ${userData.id}, WorkoutType: ${workoutType}, Description: ${description}, SessionTime: ${sessionTime}`);
            }
        });
    }

    res.status(201).send('Users added successfully');
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    deleteUser(userId, (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(`User with ID ${userId} has been deleted`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
