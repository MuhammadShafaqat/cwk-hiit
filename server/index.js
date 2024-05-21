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

    // Process each user entry in each workout type
    for (const workoutType in data) {
        if (Array.isArray(data[workoutType])) {
            data[workoutType].forEach(rowData => {
                const { weight, reps, description, checked, sessionTime } = rowData;

                // Validate the object structure
                if (typeof weight !== 'string' || typeof reps !== 'string' || typeof description !== 'string' || typeof checked !== 'string' || typeof sessionTime !== 'string') {
                    console.error('Invalid data format in row:', rowData);
                    return;
                }

                // Create the user entry in the database
                createUsers(weight, reps, description, checked, workoutType, sessionTime, (err, data) => {
                    if (err) {
                        console.error('Error creating user:', err.message);
                    } else {
                        console.log(`User added with ID: ${data.id}, Weight: ${weight}, Reps: ${reps}, Description: ${description}, Checked: ${checked}, WorkoutType: ${workoutType}, SessionTime: ${sessionTime}`);
                    }
                });
            });
        } else {
            console.error('Invalid data format for workout type:', workoutType);
            return res.status(400).send('Invalid data format');
        }
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
