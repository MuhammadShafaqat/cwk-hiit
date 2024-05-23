 // Timer variables
 let timer;
 let startTime = null;
 let elapsedTime = 0;
 let isPaused = false;
 let currentWorkout = null;

 // DOM elements
 const edit = document.querySelector('#edit-time');
 const pause = document.querySelector('#pause-timer');
 const resume = document.querySelector('#resume-timer');
 const newWorkoutSection = document.getElementById('new-workout-section');

 function startStopWatch() {
     startTime = Date.now() - elapsedTime;

     function updateStopwatch() {
         if (!isPaused) {
             elapsedTime = Date.now() - startTime;

             const totalSeconds = Math.floor(elapsedTime / 1000);
             const hours = Math.floor(totalSeconds / 3600);
             const minutes = Math.floor((totalSeconds % 3600) / 60);
             const seconds = totalSeconds % 60;

             edit.textContent = `${hours}:${minutes}:${seconds}`;
         }
         timer = requestAnimationFrame(updateStopwatch);
     }
     timer = requestAnimationFrame(updateStopwatch);
 }

 startStopWatch();

 function pauseWatch() {
     pause.addEventListener('click', function () {
         isPaused = true;
         cancelAnimationFrame(timer);
         if (currentWorkout) {
             currentWorkout.pausedTime = currentWorkout.remainingTime;
         }
     });
 }

 pauseWatch();

 function resumeWatch() {
     resume.addEventListener('click', function () {
         if (isPaused) {
             isPaused = false;
             startTime = Date.now() - elapsedTime;
             startStopWatch();
             if (currentWorkout) {
                 manageWorkoutTimer(currentWorkout.timerElement, currentWorkout.pausedTime);
             }
         }
     });
 }

 resumeWatch();

 function delay(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
 }

 async function showWorkouts() {
     const workouts = [
         { id: 'squat', time: 30 },
         { id: 'lunge', time: 30 },
         { id: 'bicep-curls', time: 30 }
     ];

     for (let i = 0; i < workouts.length; i++) {
         const workout = document.getElementById(workouts[i].id);
         const timerElement = workout.querySelector('.workout-timer');

         workout.style.display = 'block';
         await manageWorkoutTimer(timerElement, workouts[i].time);
         workout.style.display = 'none';

         if (i < workouts.length - 1) {
             const rest = document.getElementById('rest');
             const restTimerElement = rest.querySelector('.workout-timer');
             rest.style.display = 'block';
             await manageWorkoutTimer(restTimerElement, 10);
             rest.style.display = 'none';
         }
     }

     newWorkoutSection.style.display = 'block';
 }

 async function manageWorkoutTimer(timerElement, time) {
     return new Promise(resolve => {
         currentWorkout = {
             timerElement,
             remainingTime: time,
             pausedTime: time
         };

         const startTime = Date.now();

         function updateWorkoutTimer() {
             if (!isPaused) {
                 const elapsed = Math.floor((Date.now() - startTime) / 1000);
                 currentWorkout.remainingTime = currentWorkout.pausedTime - elapsed;
                 timerElement.textContent = `Time left: ${currentWorkout.remainingTime} seconds`;

                 if (currentWorkout.remainingTime < 0) {
                     resolve();
                     return;
                 }
             }
             currentWorkout.animationFrameId = requestAnimationFrame(updateWorkoutTimer);
         }
         currentWorkout.animationFrameId = requestAnimationFrame(updateWorkoutTimer);
     });
 }

 showWorkouts();

 async function prepareAndSendData(event) {
     event.preventDefault();
     console.log('Preparing and sending data...');

     const data = {};

     // Collect predefined workouts data
     document.querySelectorAll('#predefined-workouts .workout-description').forEach(section => {
         if (section.style.display !== 'none') {
             const workoutType = section.id;
             const description = section.querySelector('p').innerText;
             const time = section.querySelector('.workout-timer').getAttribute('data-time');
             data[workoutType] = { description, time };
         }
     });

     // Collect dynamically added workouts data
     document.querySelectorAll('#workout-container .workout-description').forEach(section => {
         const workoutType = section.id.replace('workout-board-', '');
         const description = section.querySelector('p').innerText;
         const time = section.querySelector('.workout-timer').textContent.match(/\d+/)[0]; // Extract the time from text content
         data[workoutType] = { description, time };
     });

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

 const submitButton = document.querySelector('#submit-button');
 submitButton.addEventListener('click', prepareAndSendData);

 function addNewWorkout() {
     const workoutContainer = document.getElementById('workout-container');
     const newWorkoutSection = document.getElementById('new-workout-section');
     const newWorkoutNameInput = document.getElementById('new-workout-name');
     const newWorkoutDescriptionInput = document.getElementById('new-workout-description');
     const newWorkoutTimeInput = document.getElementById('new-workout-time');

     newWorkoutSection.style.display = 'none';

     const workoutName = newWorkoutNameInput.value.trim().toLowerCase().replace(/\s+/g, '-');
     const workoutDescription = newWorkoutDescriptionInput.value.trim();
     const workoutTime = parseInt(newWorkoutTimeInput.value.trim());

     if (workoutName === '' || workoutDescription === '' || isNaN(workoutTime)) {
         alert('Please enter valid workout details.');
         return;
     }

     const existingSection = document.getElementById(`workout-board-${workoutName}`);
     if (existingSection) {
         alert('Workout already exists.');
         return;
     }

     const workoutSection = document.createElement('div');
     workoutSection.id = `workout-board-${workoutName}`;
     workoutSection.className = 'workout-description';
     workoutSection.style.display = 'none';
     workoutSection.innerHTML = `
         <h1>${workoutName}</h1>
         <p>${workoutDescription}</p>
         <p class="workout-timer" data-time="${workoutTime}"></p>
     `;

     const predefinedWorkouts = document.getElementById('predefined-workouts');
     predefinedWorkouts.insertBefore(workoutSection, predefinedWorkouts.firstChild);

     (async () => {
         workoutSection.style.display = 'block';
         const timerElement = workoutSection.querySelector('.workout-timer');
         await manageWorkoutTimer(timerElement, workoutTime);
         workoutSection.style.display = 'none';
         newWorkoutSection.style.display = 'block';
     })();
 }

 const addWorkoutButton = document.getElementById('add-new-workout');
 addWorkoutButton.addEventListener('click', addNewWorkout);

