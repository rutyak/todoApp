//------------------------------Done-------------------------

async function displayDone() {
    try {
      try {
        const response = await fetch(`${BASE_URL}/tasks`);
        data = await response.json();
        console.log("data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      console.log("Data in pro: ",data);
      let entireInfo = [];
  
      data.forEach((value, i) => {
        if (value.stage == "Done") {
          entireInfo.push(`
    <div id="${
      value._id
    }" class="task-module draggable" draggable="true" ondragstart="drag(event)">
    <div class='task-module-title'>
    <p class='task-title same'>${value.task}</p>
    <p class='priority-p' style="color: green"> ${value.stage}</p>
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
    <div>
    <p>Upload date: ${
      value.date === dayOfMonth
        ? `${dayOfMonth}/${currMonth}/${currYear}`
        : `${value.date}/${currMonth}/${currYear}`
    }</p>
    <p>Updated date: ${dayOfMonth}/${currMonth}/${currYear}</p>
    </div>
    <div>
    <p>Upload time: ${value.time}</p>
    <p>Updated time: ${time}</p>
    </div>
    </div>
    </div>
    `);
        }
        done.innerHTML = entireInfo.join("");
      });
    } catch (error) {
      console.error("Error in filtering: ", error);
    }
  }
  displayDone()
  
  async function doneDrop(ev) {
    try {
      ev.preventDefault();
      var id = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(id));
      console.log("Droped in done section");
      console.log("id of droped item: ", id);
      let updatedData = {
        stage: "Done",
      };
      const response = await fetch(`${BASE_URL}/updateTask/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
    
      const resDone = await response.json();
      console.log(resDone);
    } catch (error) {
      console.log(error);
    }
   
    window.location.reload();
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  