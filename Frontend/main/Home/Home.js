const tasksCount = document.querySelector(".middle-section");
let data;
let date = new Date();
let dayOfMonth = ("0" + date.getDate()).slice(-2);

let currYear = date.getFullYear();
let currMonth = date.getMonth();
const formContainer= document.querySelector('.form-container')
let taskModule = document.querySelector(".todo-stage");
let BASE_URL = "http://localhost:5000";

//time
let hours = date.getHours();
let ampm = hours < 12 ? "am" : "pm";
hours = hours % 12;
hours = hours ? hours : 12; //hours 0 should be 12
let minutes = date.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;
let time = hours + ":" + minutes + ampm;




//-----------------------render-function----------------------------

function render(value, entireInfo){
  entireInfo.push(`
  <div id="${
    value._id
  }" class="task-module draggable" draggable="true" ondragstart="drag(event)">
  <div class='task-module-title'>
    <p class='task-title same'>${value.task}</p>
    <p class='priority-p' style="color: green"> ${
      value.stage === "Upcoming"
        ? "Upcoming"
        : value.stage === "In progress"
        ? "In progress"
        : "Done"
    }</p>
  </div>
  <div class="middel-of-task">
  <div>
      <p class='para same'>${value.description}</p>
  </div>
  <div class="btn-of-task">
     <p class="edit" onclick="handleEdit('${value._id}')">Edit</p>
     <img onclick="deleteTask('${
       value._id
     }')" src="../../Asset/bin_484611.png" alt="img">
  </div>
  </div>
  <div class="date-of-task">
  <p>${
    value.date === dayOfMonth
      ? `${dayOfMonth}/${currMonth}/${currYear}`
      : `${value.date}/${currMonth}/${currYear}`
  }</p>
  <p>${value.time}</p>
  </div>
  </div>
  `);
  return entireInfo;
}
// ------------------------------------------todo-functionality-------------------------------

async function todayTask() {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    data = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  let count = 0;
  let entireInfo = [];

  data.forEach((value, i) => {
    if (value.date == dayOfMonth && value.stage == "Upcoming") {
      count++;
      entireInfo = render(value, entireInfo);
    }
  });
    taskModule.innerHTML = entireInfo.join("");
    tasksCount.innerHTML = ` <div>
    <p>All tasks(${count} tasks)</p>
   </div>
  `;

}
todayTask()

// ----------------------------important-tasks-shortlist------------------------------------

function importantTask() {
  let count = 0;
  let entireInfo = [];
  data.filter((value, i) => {
    if (value.priority.toLowerCase() == "high" && value.stage == "Upcoming") {
      count++;
      entireInfo = render(value, entireInfo);
    }
  });
    taskModule.innerHTML = entireInfo.join("");
    tasksCount.innerHTML = ` <div>
    <p>All tasks(${count} tasks)</p>
  </div>
  `;
}

// ------------------------------------------allTask-module---------------------------------------

function allTask() {
  let count = 0;
  let entireInfo = [];
  data.filter((value, i) => {
    if (value.stage == "Upcoming") {
      count++;
      entireInfo = render(value, entireInfo);
    }
  });
      taskModule.innerHTML = entireInfo.join("");
      tasksCount.innerHTML = ` <div>
      <p>All tasks(${count} tasks)</p>
    </div>
    `;
}


