



// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const tasktitleInput = document.querySelector('#taskTitle');
const duedateformInput = document.querySelector('#datepicker');
const taskDescriptionInput = document.querySelector('#taskDescription');
const submitTask = document.querySelector('#submit-new-task');


// Todo: create a function to generate a unique task id
function generateTaskId() {
  let myuuid = crypto.randomUUID();
  console.log(myuuid);
  return myuuid;
}


// Todo: create a function to create a task card - (popup modal)
// function createTaskCard(task) {


    // Get the modal
    const newTask = document.getElementById("myModal");

    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");
    
    // Get the <span> element that closes the modal
    const closeButton = document.getElementsByClassName("close")[0];
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        newTask.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = function() {
        newTask.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == newTask) {
        newTask.style.display = "none";
      }
    }
    
      $( function() {
        $( "#datepicker" ).datepicker();
      } );
  
    
    submitTask.addEventListener('click', function (event) {
        event.preventDefault();
        
        const tasktitleForm = tasktitleInput.value;
        const duedateForm = duedateformInput.value;
        const taskdescriptionForm = taskDescriptionInput.value;
        const singleTask = {
            tasktitleForm: tasktitleForm,
            duedateForm: duedateForm,
            taskdescriptionForm: taskdescriptionForm,
            dttm: new Date(),
            taskId: generateTaskId(),
            state: 'todo'

          };
      
          // declare variable for parent
          // add to single post to existing json array
          let parentTasks = [];
          const existingTasks = JSON.parse(localStorage.getItem('parentTasks'));
      
          //if parentpost exists then add to existing last post
          if (existingTasks !== null) {
            parentTasks = existingTasks;
          }
      
          parentTasks.push(singleTask);
      
          //localStorage set item json.stringify()
          localStorage.setItem('parentTasks', JSON.stringify(parentTasks));
          newTask.reset();
          newTask.style.display = "none";
          window.location.reload();
        }
    );


// Todo: create a function to render the task list and make cards draggable
// function renderTaskList() {
// }

function allowDrop(event) {
  event.preventDefault();
  console.log('Made it here ++++++++');
  // event.dataTransfer.dropEffect = "move";
  // const inProgress = document.getElementById ('in-progress-cards');
  // const done = document.getElementById ('done-cards');
  // console.log("++++",event.dataTransfer);
// inProgress.appendChild(taskCard);
  // const data = event.dataTransfer.getData("text/plain");
  // done.appendChild(document.getElementById(data));
  // console.log("allowDrop+++");
};

function drag(event) {
  console.log('Dragging +++++++++++++++++');
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.dropEffect = "move";
  console.log("dragEvent++++",event.dataTransfer);

};



function drop(event) {
    event.preventDefault();
    // let data = event.dataTransfer.getData("text");
    // event.target.appendChild(document.getElementById(data));
    console.log("drop+++", event);

};

function dragEnter(event){
  event.preventDefault();
};

$(document).ready(function () {
  const draggableElement = document.querySelector(".card-body");
const droppableArea = document.getElementById('done-cards');

// Event handler for when dragging starts
draggableElement.addEventListener('dragstart', (event) => {
  // Set the data to be transferred during the drag operation
  event.dataTransfer.setData('text/plain', event.target.id);
});

// Event handler for when dropping occurs
droppableArea.addEventListener('drop', (event) => {
  // Prevent the default behavior to allow dropping
  event.preventDefault();
  
  // Retrieve the data that was set during the drag operation
  const data = event.dataTransfer.getData('text/plain');
  
  // Find the draggable element based on the data
  const draggableElement = document.getElementById(data);
  
  // Append the draggable element to the droppable area
  event.target.appendChild(draggableElement);
});

// Event handler for when a draggable element is being dragged over the droppable area
droppableArea.addEventListener('dragover', (event) => {
  // Prevent the default behavior to allow dropping
  event.preventDefault();
});
});

// ////////
// Get references to the draggable element and the droppable area
// const draggableElement = document.querySelector(".card");
// const droppableArea = document.getElementById('done-cards');

// // Event handler for when dragging starts
// draggableElement.addEventListener('dragstart', (event) => {
//   console.log('Drag start ++++++++++++++++');
//   // Set the data to be transferred during the drag operation
//   event.dataTransfer.setData('text/plain', event.target.id);
// });

// // Event handler for when dropping occurs
// droppableArea.addEventListener('drop', (event) => {
//   console.log('Drop ++++++++++++++++');
//   // Prevent the default behavior to allow dropping
//   event.preventDefault();
  
//   // Retrieve the data that was set during the drag operation
//   const data = event.dataTransfer.getData('text/plain');
  
//   // Find the draggable element based on the data
//   const draggableElement = document.getElementById(data);
  
//   // Append the draggable element to the droppable area
//   event.target.appendChild(draggableElement);
// });

// // Event handler for when a draggable element is being dragged over the droppable area
// droppableArea.addEventListener('dragover', (event) => {
//   console.log('Drag over ++++++++++++++++');
//   // Prevent the default behavior to allow dropping
//   event.preventDefault();
// });

///////

// Todo: create a function to handle adding a new task
// function handleAddTask(event){


const lastTask = JSON.parse(localStorage.getItem('parentTasks'));
// console.log(lastPost);

// sort reverse chronological order
const sortResult = lastTask.sort(function (a, b) {
    // console.log(new Date(a.dttm), "+++++++");
    // console.log(new Date(b.dttm), "+++++++");
    return new Date(b.dttm) - new Date(a.dttm);
});

for (const singleTask of lastTask) {
const todoCards =  document.getElementById('todo-cards');
const inProgress = document.getElementById ('in-progress-cards');
const done = document.getElementById ('done-cards');
const taskCard = document.createElement('div');
const taskName = document.createElement('div');
const taskBody = document.createElement('div');
const taskDescription = document.createElement('p');
const taskDueDate = document.createElement('p');
const deleteTask = document.createElement('a');


taskName.textContent = singleTask.tasktitleForm;
taskDueDate.textContent = `Due ${singleTask.duedateForm}`;
deleteTask.textContent = `Delete`;
taskDescription.textContent = `${singleTask.taskdescriptionForm}`;


todoCards.appendChild(taskCard);
// inProgress.appendChild(taskCard);
// done.appendChild(taskCard); 
taskCard.appendChild(taskName);
taskCard.appendChild(taskBody);
taskBody.appendChild(taskDescription);
taskBody.appendChild(taskDueDate);
taskBody.appendChild(deleteTask);

taskCard.setAttribute("class","card");
taskBody.setAttribute("class","card-body task");
taskName.setAttribute("class", "card-header");
taskDescription.setAttribute("class", "card-text status");
deleteTask.setAttribute("class","btn btn-primary delete");
taskDueDate.setAttribute("class", "card-text due-date");
taskCard.setAttribute("draggable", "true");
// taskCard.setAttribute("ondragstart","drag(event)");
taskCard.setAttribute("id", singleTask.taskId )

};

/* <div class="card">
                <div class="card-header">
                  Task Title
                </div>
                <div class="card-body task">
                  <p class="card-text status">Status</p>
                  <p class="card-text due-date" >Due Date</p>
                  <a href="#" class="btn btn-primary delete">Delete</a>
                  
                </div>
              </div> */

// }

// Todo: create a function to handle deleting a task
// function handleDeleteTask(event){
    

// }

// Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {


// }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {
//     localStorage.setItem();

// });
