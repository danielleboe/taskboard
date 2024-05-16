// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const tasktitleInput = document.querySelector("#taskTitle");
const duedateformInput = document.querySelector("#datepicker");
const taskDescriptionInput = document.querySelector("#taskDescription");
const submitTask = document.querySelector("#submit-new-task");

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
btn.onclick = function () {
  newTask.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function () {
  newTask.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == newTask) {
    newTask.style.display = "none";
  }
};

$(function () {
  $("#datepicker").datepicker();
});

submitTask.addEventListener("click", function (event) {
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
    state: "todo",
  };

  // declare variable for parent array
  // add to single post to existing json array
  let parentTasks = [];
  const existingTasks = JSON.parse(localStorage.getItem("parentTasks"));

  //if the parent post exists then add to existing last post
  if (existingTasks !== null) {
    parentTasks = existingTasks;
  }

  parentTasks.push(singleTask);

  //localStorage set item json.stringify()
  localStorage.setItem("parentTasks", JSON.stringify(parentTasks));
  newTask.reset();
  newTask.style.display = "none";
  window.location.reload();
});

//Drag and Drop

//ondragstart - dragstart event is fired when the user starts dragging an element or text selection /draggable = true
function drag(event) {
  console.log("Dragging +++++++++++++++++");
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("text", event.target.id);
  console.log("dragEvent++++--", event.dataTransfer);
}

//ondragover - dragover event is fired when an element or text selection is being dragged over a valid drop target
function allowDrop(event) {
  event.preventDefault();
  console.log("Made it here ++++++++");

}

//dragenter event is fired when a dragged element or text selection enters a valid drop target
function dragEnter(event) {
  event.preventDefault();
}

//ondrop - event is fired when an element or text selection is dropped on a valid drop target
function drop(event) {
  event.preventDefault();
  console.log("drop+++", event);
  const taskId = event.dataTransfer.getData("text");
  console.log("dragEvent++++", taskId);
  const card = document.getElementById(taskId);
  event.target.appendChild(card);
  updateTask(taskId, event.target.id);
}

///Update Task after drag & drop
function updateTask(taskId, targetId) {
  //find task that was moved
  const existingTasks = JSON.parse(localStorage.getItem("parentTasks"));
  console.log(existingTasks);
  for (const task of existingTasks) {
    // console.log(task);

    //change state
    if (task.taskId === taskId) {
      console.log(targetId);
      if (targetId === "inprogress-body") {
        task.state = "inProgress";
      } else if (targetId === "done-body") {
        task.state = "done";
      } else {
        task.state = "todo";
      }
    }

    console.log(task);

    //save update to local storage
    console.log(existingTasks);
    localStorage.setItem("parentTasks", JSON.stringify(existingTasks));
  }

  
}

///////

// Todo: create a function to handle adding a new task
// function handleAddTask(event){

const lastTask = JSON.parse(localStorage.getItem("parentTasks"));
// console.log(lastPost);

// sort reverse chronological order
const sortResult = lastTask.sort(function (a, b) {
  // console.log(new Date(a.dttm), "+++++++");
  // console.log(new Date(b.dttm), "+++++++");
  return new Date(b.dttm) - new Date(a.dttm);
});

for (const singleTask of lastTask) {
  const todoCards = document.getElementById("todo-cards");
  const inProgress = document.getElementById("in-progress-cards");
  const done = document.getElementById("done-cards");
  const taskCard = document.createElement("div");
  const taskName = document.createElement("div");
  const taskBody = document.createElement("div");
  const taskDescription = document.createElement("p");
  const taskDueDate = document.createElement("p");
  const deleteTask = document.createElement("a");

  taskName.textContent = singleTask.tasktitleForm;
  taskDueDate.textContent = `Due ${singleTask.duedateForm}`;
  deleteTask.textContent = `Delete`;
  taskDescription.textContent = `${singleTask.taskdescriptionForm}`;

if (singleTask.state === "inProgress") {
  inProgress.appendChild(taskCard);

    } else if (singleTask.state === "done") {
      done.appendChild(taskCard);
    } else {
      todoCards.appendChild(taskCard);
    }
  
  taskCard.appendChild(taskName);
  taskCard.appendChild(taskBody);
  taskBody.appendChild(taskDescription);
  taskBody.appendChild(taskDueDate);
  taskBody.appendChild(deleteTask);

  taskCard.setAttribute("class", "card");
  taskBody.setAttribute("class", "card-body task");
  taskName.setAttribute("class", "card-header");
  taskDescription.setAttribute("class", "card-text status");
  deleteTask.setAttribute("class", "btn btn-primary delete");
  deleteTask.setAttribute("id", `delete-${singleTask.taskId}`);
  deleteTask.setAttribute("onclick", "handleDeleteTask(event)")
  taskDueDate.setAttribute("class", "card-text due-date");
  taskCard.setAttribute("draggable", "true");
  taskCard.setAttribute("ondragstart", "drag(event)");
  taskCard.setAttribute("id", singleTask.taskId);
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
console.log(event.target.id);
const deleteId = event.target.id.substring(7);
console.log(deleteId, "deleteId");
const existingTasks = JSON.parse(localStorage.getItem("parentTasks"));
console.log(existingTasks);




const index = existingTasks.findIndex(function(task){
  return task.taskId === deleteId
});
console.log(index, "task index value")


existingTasks.splice(index,1)
// delete existingTasks[index];
console.log(existingTasks, "deleteindex");

localStorage.setItem("parentTasks", JSON.stringify(existingTasks));
window.location.reload();

// for (const task of existingTasks) {
//   // console.log(task);

//   //change state
//   if (task.taskId === deleteId) {
//     if (targetId === "inprogress-body") {
//       task.state = "inProgress";
//     } else if (targetId === "done-body") {
//       task.state = "done";
//     } else {
//       task.state = "todo";
//     }
//   }

//   console.log(task);

//   //save update to local storage
//   console.log(existingTasks);
//   localStorage.setItem("parentTasks", JSON.stringify(existingTasks));
// }


}

// const deleteButton = document.getElementById("delete")
// {}

// Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {
//     localStorage.setItem();

// });

// Todo: create a function to render the task list and make cards draggable
// function renderTaskList() {
// }


// do not use

///Update Task after drag & drop
function updateTask(taskId, targetId) {
  //find task that was moved
  const existingTasks = JSON.parse(localStorage.getItem("parentTasks"));
  console.log(existingTasks);
  
  
for (const task of existingTasks) {
    // console.log(task);

    //change state
    if (task.taskId === taskId) {
      console.log(targetId);
      if (targetId === "inprogress-body") {
        task.state = "inProgress";
      } else if (targetId === "done-body") {
        task.state = "done";
      } else {
        task.state = "todo";
      }
    }

    console.log(task);

    //save update to local storage
    console.log(existingTasks);
    localStorage.setItem("parentTasks", JSON.stringify(existingTasks));
  }

  
}