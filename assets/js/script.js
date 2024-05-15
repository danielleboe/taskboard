// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const tasktitleInput = document.querySelector('#taskTitle');
const duedateformInput = document.querySelector('#datepicker');
const taskDescriptionInput = document.querySelector('#taskDescription');
const submitTask = document.querySelector('#submit-new-task');


// Todo: create a function to generate a unique task id
function generateTaskId() {
    let taskId = x + 1;
Math.floor(Math.random() * 100000) +1;
console.log(taskId);
}

// Todo: create a function to create a task card
// function createTaskCard(task) {


    // Get the modal
    var newTask = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        newTask.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
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
    
    // }
    
    submitTask.addEventListener('click', function (event) {
        event.preventDefault();
        
        const tasktitleForm = tasktitleInput.value;
        const duedateForm = duedateformInput.value;
        const taskdescriptionForm = taskDescriptionInput.value;
        // const taskId = taskId;
    
        // function generateTaskId() {
        //     let taskId = x + 1;
        // Math.floor(Math.count(taskId) +1);
        // console.log(taskId.value);
        // }

        const singleTask = {
            tasktitleForm: tasktitleForm,
            duedateForm: duedateForm,
            taskdescriptionForm: taskdescriptionForm,
            // taskId: taskID.value,
            dttm: new Date()
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
          myModal.reset();
        }
    );


// Todo: create a function to render the task list and make cards draggable
// function renderTaskList() {
// }



function allowDrop(event) {
    event.preventDefault();
  };
  

  function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));

};
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  };





// Todo: create a function to handle adding a new task
// function handleAddTask(event){


const lastTask = JSON.parse(localStorage.getItem('parentTasks'));
// console.log(lastPost);

//sort reverse chronological order
// const sortResult = lastTask.sort(function (a, b) {
//     // console.log(new Date(a.dttm), "+++++++");
//     // console.log(new Date(b.dttm), "+++++++");
//     return new Date(b.dttm) - new Date(a.dttm);
// });

for (const singleTask of lastTask) {


const todoCards =  document.getElementById('todo-cards');
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
taskCard.setAttribute("ondragstart","drag(event)");

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
