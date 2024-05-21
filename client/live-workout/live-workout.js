// Timer variables
let timer; // Holds the interval ID for the stopwatch
let sec = 0; // Seconds part of the stopwatch time
let min = 0; // Minutes part of the stopwatch time
let hour = 0; // Hours part of the stopwatch time

// DOM elements
const edit = document.querySelector('#edit-time'); // Element to display the current time
const pause = document.querySelector('#pause-timer'); // Button to pause the timer
const resume = document.querySelector('#resume-timer'); // Button to resume the timer

// Function to start the stopwatch
function stopWatch() {
    timer = setInterval(stopWatchContent, 1000); // Calls stopWatchContent every second
}

// Function to update the stopwatch content
function stopWatchContent() {
    edit.textContent = hour + ":" + min + ":" + sec; // Display the current time
    sec++; // Increment seconds

    if (sec >= 60) {
        sec = 0; // Reset seconds to 0
        min++; // Increment minutes
    }
    if (min >= 60) {
        min = 0; // Reset minutes to 0
        hour++; // Increment hours
    }
}

// Start the stopwatch
stopWatch();

// Function to pause the stopwatch
function pauseWatch() {
    pause.addEventListener('click', function () {
        clearInterval(timer); // Stop the interval
    });
}

// Attach event listener to the pause button
pauseWatch();

// Function to resume the stopwatch
function resumeWatch() {
    resume.addEventListener('click', stopWatch); // Restart the stopwatch
}

// Attach event listener to the resume button
resumeWatch();

// Function to generate selectors based on workoutType
function generateSelectors(workoutType) {
    return {
        set1Input: document.querySelector(`#set-1-${workoutType}`), // Input for set 1
        set2Inputs: document.querySelectorAll(`#set-2-${workoutType}`), // Inputs for set 2
        set3Inputs: document.querySelectorAll(`#set-4-${workoutType}`), // Inputs for set 
        checkoutCheckboxes: document.querySelectorAll(`#set-3-${workoutType}`) // Checkboxes for checkout
    };
}

// Function to prepare and send data
async function prepareAndSendData(event) {
    event.preventDefault();
    console.log('Preparing and sending data...');

    const data = {};

    document.querySelectorAll('.workout-board').forEach(section => {
        const workoutType = section.id.replace('workout-board-', '');
        const rows = section.querySelectorAll('tr');
        data[workoutType] = [];

        if (rows.length > 0) { // Only process if there are rows for this workout type
            const sessionTime = `${hour}:${min}:${sec}`;
            
            rows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs.length >= 2) {
                    const weight = inputs[0].value || '';
                    const reps = inputs[1].value || '';
                    const description = inputs[2].value || '';
                    const checked = inputs[3].checked ? 'on' : 'off';
                    data[workoutType].push({ workoutType, sessionTime, weight, reps, description, checked });
                } else {
                    console.error(`Inputs not found for ${workoutType}`);
                }
            });
        }
    });

    // Remove empty workout types from the data object
    for (const key in data) {
        if (data[key].length === 0) {
            delete data[key];
        }
    }

    console.log('Data:', data);

    // Send data to server via POST request
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Data sent successfully');
            window.location.href = "../workouts/workouts.html"; // Navigate to the specified URL
        } else {
            throw new Error('Failed to send data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Attach event listener to the submit button
const submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    prepareAndSendData(event);
});

// Function to add a new set row to a specific workout type
function addSet(workoutType) {
    const tbody = document.querySelector(`#${workoutType}-rows`);
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${tbody.children.length}</td>
       
        <td><input type='text' required id='set-1-${workoutType}'></td>
        <td><input type='text' required id='set-2-${workoutType}'></td>
        <td><input type='text' required id='set-4-${workoutType}'></td>
        <td><input type='checkbox' checked id='set-3-${workoutType}'></td>
    `;
    tbody.appendChild(newRow);

    // Show the corresponding workout board
    const workoutBoard = document.getElementById(`workout-board-${workoutType}`);
    workoutBoard.style.display = 'block';
}

// Attach event listeners to "Add Set" buttons
document.getElementById('add-set-squat').addEventListener('click', () => addSet('squat'));
document.getElementById('add-set-lunges').addEventListener('click', () => addSet('lunges'));
document.getElementById('add-set-bicep-curls').addEventListener('click', () => addSet('bicep-curls'));

// Function to dynamically add new workouts
function addNewWorkout() {
    const workoutContainer = document.getElementById('workout-container');
    const newWorkoutNameInput = document.getElementById('new-workout-name');
    const workoutName = newWorkoutNameInput.value.trim().toLowerCase().replace(/\s+/g, '-');

    if (workoutName === '') {
        alert('Please enter a workout name.');
        return;
    }

    const existingSection = document.getElementById(`workout-board-${workoutName}`);
    if (existingSection) {
        alert('Workout already exists.');
        return;
    }

    // Create new workout section
    const workoutSection = document.createElement('div');
    workoutSection.innerHTML = `
        <p id="${workoutName}" style="display: block;text-align: center; font-weight: bold;">${workoutName.replace(/-/g, ' ')}</p>
        <section id="workout-board-${workoutName}" class="workout-board" style="display: block;">
            <table id="${workoutName}-rows">
                <tr>
                    <th>Set</th>
                 
                    <th>(+kg)</th>
                    <th>Reps</th>
                    <th>description</th>
                    <th></th>
                </tr>
                <tr>
                    <td>1</td>
                   
                    <td><input type='text' required id='set-1-${workoutName}'></td>
                    <td><input type='text' required id='set-2-${workoutName}'></td>
                    <td><input type='text' required id='set-4-${workoutName}'></td>
                    <td><input type='checkbox' checked id='set-3-${workoutName}'></td>
                </tr>
            </table>
            <button id="add-set-${workoutName}">Add Set</button>
        </section>
    `;
    workoutContainer.appendChild(workoutSection);

    // Attach event listener to the new "Add Set" button
    document.getElementById(`add-set-${workoutName}`).addEventListener('click', () => addSet(workoutName));

    // Clear the input field
    newWorkoutNameInput.value = '';
}

// Attach event listener to the "Add Workout" button
document.getElementById('add-new-workout').addEventListener('click', addNewWorkout);

// Attach event listener to the dropdown menu for predefined workouts
document.getElementById('add-workout').addEventListener('change', function () {
    const selectedWorkout = this.value;
    if (selectedWorkout) {
        const workoutBoard = document.getElementById(`workout-board-${selectedWorkout}`);
        workoutBoard.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the value from localStorage
    const goal = localStorage.getItem('goal');

    // Update the Program Name element
    const programNameElement = document.getElementById('editable-name');
    if (goal) {
        programNameElement.textContent = goal; // Set the content to the retrieved value
    }
});

