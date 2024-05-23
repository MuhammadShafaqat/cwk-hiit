document.addEventListener('DOMContentLoaded', () => {
    fetchWorkoutData();
});

function fetchWorkoutData() {
    fetch('http://localhost:8080/users')  // Replace with the actual API endpoint
        .then(response => response.json())
        .then(data => {
            populateWorkoutContainers(data);
        })
        .catch(error => {
            console.error('Error fetching workout data:', error);
        });
}

function populateWorkoutContainers(workoutData) {
    const workoutContainer = document.getElementById('workout-container');

    const groupedData = workoutData.reduce((acc, curr) => {
        if (!acc[curr.workoutType]) {
            acc[curr.workoutType] = [];
        }
        acc[curr.workoutType].push(curr);
        return acc;
    }, {});

    for (const [workoutType, workouts] of Object.entries(groupedData)) {
        const allKeysHaveValues = workouts.every(workout => {
            return Object.values(workout).every(value => value);
        });

        if (allKeysHaveValues) {
            const container = document.createElement('div');
            container.classList.add('workout-type-container');

            const title = document.createElement('h2');
            title.textContent = workoutType.charAt(0).toUpperCase() + workoutType.slice(1);
            container.appendChild(title);

            const headers = document.createElement('div');
            headers.classList.add('workout-headers');
            headers.innerHTML = `
                <div class="header">Description</div>
                <div class="header">Session Time (seconds)</div>
            `;
            container.appendChild(headers);

            workouts.forEach(workout => {
                const allValuesNotEmpty = Object.values(workout).every(value => value);

                if (allValuesNotEmpty) {
                    const details = document.createElement('div');
                    details.classList.add('workout-details');
                    details.innerHTML = `
                        <div>${workout.description}</div>
                        <div>${workout.sessionTime}</div>
                    `;
                    container.appendChild(details);
                }
            });

            workoutContainer.appendChild(container);
        }
    }
}
