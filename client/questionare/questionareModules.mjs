function select(selector) {
  return document.querySelector(selector);
}


export const fat = select('#losingfat');
export const maintain = select('#maintaining');
export const tone = select('#toning');
export const keepFit = select('#keeping-fit');
export const fitnessGoal = select('#first-question');
export const name = 'What\s your name?';
export const newHeader = document.createElement('h1');
newHeader.setAttribute('id', 'nameQuestion');
newHeader.textContent = 'What is your name?';

const tallQuestion = document.createElement('h1');
tallQuestion.setAttribute('id', 'tallHeight');
tallQuestion.textContent = 'How tall are you?';

const weightQuestion = document.createElement('h1');
weightQuestion.setAttribute('id', 'userWeight');
weightQuestion.textContent = 'Lastly how much do you weigh?';


const resultQuestion = document.createElement('h1');
resultQuestion.setAttribute('id', 'resultPage');
resultQuestion.textContent = 'Great so you told us the following';


const preSelect = document.createElement('h1');
preSelect.setAttribute('id', 'preSetWorkouts');
preSelect.textContent = 'Here are your workouts personally catered to you!';





/** Creates the form for user when they type in their name*/
export function formAppend() {
  const form = document.createElement('form');
  const inputText = document.createElement('input');
 // Styling the input element
inputText.style.width = '100%';
inputText.style.padding = '10px';
inputText.style.fontSize = '16px';
inputText.style.border = '2px solid #007bff'; // blue border
inputText.style.borderRadius = '5px';
inputText.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'; // subtle shadow
  inputText.placeholder = 'Enter your name here';
  inputText.id = 'userText';
  form.appendChild(inputText);
  const submitButton = document.createElement('button');
  // submitButton.style.display = 'block'; 
submitButton.style.margin = '0 auto'; // Centers the button horizontally
submitButton.style.marginTop = '10px'; // Provides some space between buttons
  submitButton.textContent = 'Enter';
  submitButton.id = 'submitText';
  form.appendChild(submitButton);
  const clearButton = document.createElement('button');
  // clearButton.style.display = 'block'; 
clearButton.style.margin = '0 2px'; // Centers the button horizontally
clearButton.style.marginTop = '10px'; // Provides some space between buttons
  clearButton.textContent = 'Clear';
  clearButton.id = 'clearForm';
  form.appendChild(clearButton);
  clearButton.addEventListener('click', function () {
    inputText.value = '';
  });
  document.body.appendChild(form);


  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const userValue = inputText.value;
    if (userValue === '') {
      inputText.placeholder = 'Please enter a name it\s required';
      return false;
    } else {
      newHeader.textContent = `Well hi there ${userValue} how old are you?`;
      form.remove();
      userAge();
      console.log(userValue);
      localStorage.setItem('name', userValue);
    }
  });
}






/** Hides the workout program buttons*/
export function buttonRemove() {
  maintain.remove();
  tone.remove();
  keepFit.remove();
  fat.remove();
}



/** Hides the inital header which is 'What is your fitness goal?'*/
export function hideHeader() {
  fitnessGoal.hidden = 'true';
  fitnessGoal.before(newHeader);
}




/** Asks for the users height and saves the result locally'*/
function weightForm() {
  let label = document.createElement('label');
  let weightInput = document.createElement('input');
  let submitButton = document.createElement('button');
  submitButton.textContent = 'submit';
  submitButton.setAttribute('id', 'weight-submit');
  weightInput.type = 'number';
  weightInput.placeholder = 'Enter your weight in kg';
  label.id = 'weight-id';
  weightInput.id = 'enter-weight';
  weightInput.type = 'number';
  label.textContent = 'kg';
  label.appendChild(weightInput);
  label.appendChild(submitButton);
  document.body.appendChild(label);
  submitButton.addEventListener('click', weightSubmit);

}


function weightSubmit() {
  let weightInput = document.querySelector('#enter-weight');
  let userHeightValue = weightInput.value;
  localStorage.setItem('weight', userHeightValue);
  //enter function here
  results();


}

function results() {
  let hideLabel = document.querySelector('#weight-id');
  hideLabel.hidden = 'true';
  weightQuestion.hidden = 'true';
  weightQuestion.before(resultQuestion);
  displayValues();

}

function displayValues() {
  const wrapper = document.createElement('label');
  const goal = document.createElement('p');
  goal.textContent = 'Goal: ';
  goal.setAttribute('id', 'userGoal');
  const goalResult = document.createElement('span');
  goalResult.textContent = 'Goal: ' + localStorage.getItem('goal');
  goal.appendChild(goalResult);
  document.body.appendChild(goalResult);

  const name = document.createElement('p');
  name.textContent = 'Name: ';
  name.setAttribute('id', 'userName');
  const nameResult = document.createElement('span');
  nameResult.textContent = localStorage.getItem('name');
  name.appendChild(nameResult);
  document.body.appendChild(name);


  const age = document.createElement('p');
  age.textContent = 'Age: ';
  age.setAttribute('id', 'userAge');
  const ageResult = document.createElement('span');
  ageResult.setAttribute('id', 'goalSpan')
  ageResult.textContent = localStorage.getItem('age');
  age.appendChild(ageResult);
  document.body.appendChild(age);

  const height = document.createElement('p');
  height.textContent = 'Height: ';
  height.setAttribute('id', 'userHeight');
  const heightResult = document.createElement('span');
  heightResult.textContent = localStorage.getItem('height') + 'cm';
  height.appendChild(heightResult);
  document.body.appendChild(height);



  const weight = document.createElement('p');
  weight.textContent = 'Weight: ';
  weight.setAttribute('id', 'userWeight');
  const weightResult = document.createElement('span');
  weightResult.textContent = localStorage.getItem('weight') + 'kg';
  weight.appendChild(weightResult);
  document.body.appendChild(weight);

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Done';
  submitButton.setAttribute('id', 'doneResult');
  submitButton.type = 'button';
  document.body.appendChild(submitButton);
  submitButton.addEventListener('click', preSelectedWorkouts);

}

function preSelectedWorkouts() {
  // resultQuestion.hidden = 'true';
  // resultQuestion.before(preSelect);

  window.location.href = '/client/live-workout/live-workout.html  ';

  // const userName = document.querySelector('#userName');
  // const userAge = document.querySelector('#userAge');
  // const userHeight = document.querySelector('#userHeight');
  // const userWeight = document.querySelector('#userWeight');
  // const goalSpan = document.querySelector('#goalSpan');
  // userName.hidden = 'true';


}





function tallForm() {
  const pDesc = document.createElement('p');
  pDesc.textContent = 'cm tall';
  const label = document.createElement('label');
  let value = document.createElement('input');
  label.textContent = 'I am';
  label.id = 'tall-id';
  value.placeholder = 'Enter your height in cm';

  value.type = 'number';
  value.minLength = '1';
  value.maxLength = '4';
  value.setAttribute('id', 'tall_value');
  document.body.appendChild(label);
  label.appendChild(value);
  label.appendChild(pDesc);

  const submitHeight = document.createElement('button');
  submitHeight.textContent = 'Submit';
  submitHeight.id = 'submitingHeight';
  label.appendChild(submitHeight);
  submitHeight.addEventListener('click', weight);
}



function weight() {
  const userHeight = document.querySelector('#tall_value');
  const label = document.querySelector('#tall-id');
  let userInput = userHeight.value;
  console.log(userInput);
  localStorage.setItem('height', userInput);
  if (userInput.length >= 4) {
    const error = document.createElement('p');
    error.textContent = 'Enter cm only up to 3 digits to continue please';
    label.appendChild(error);

  } else if (userInput.length <= 3) {
    label.hidden = 'true';
    tallQuestion.hidden = 'true';
    tallQuestion.before(weightQuestion);
    weightForm();
  }

}





/** Creates the age selection dropdown menu for the user and allows them to pick an age between 16 and 100*/
export function userAge() {
  const label = document.createElement('label');
  label.style.fontSize = '18px';
  label.textContent = 'Your age: ';
  
  label.id = 'user-age';

  const select = document.createElement('select');

  select.id = 'ageNumb';

  const defaultOption = document.createElement('option');
// Apply some basic styles
defaultOption.style.width = '100%';
defaultOption.style.padding = '10px';
defaultOption.style.backgroundColor = '#007bff';
defaultOption.style.color = '#fff';
defaultOption.style.fontWeight = 'bold';
defaultOption.style.marginLeft = '7px'
  defaultOption.value = '';
  defaultOption.textContent = 'Please select';

  select.appendChild(defaultOption);
  label.appendChild(select);
  document.body.appendChild(label);

  const selectedElement = document.querySelector('#ageNumb');
  for (let age = 16; age <= 100; age++) {
    const option = document.createElement('option');
    option.value = age;
    option.textContent = age;
    selectedElement.appendChild(option);
  }
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'submit';
  submitButton.id = 'age-submit';
  document.body.appendChild(submitButton);

  submitButton.addEventListener('click', tall);
  localStorage.getItem('age');
}






/**When the age is submitted the whole thing dissapears*/
export function tall() {
  const ageOption = document.querySelector('#ageNumb');
  if (ageOption.value !== '') {
    const userAge = ageOption.value;
    localStorage.setItem('age', userAge);
    const age = document.querySelector('#user-age');
    const button = document.querySelector('#age-submit');
    age.hidden = true;
    button.hidden = true;

    newHeader.hidden = 'true';
    newHeader.before(tallQuestion);
    tallForm();


  }

}







