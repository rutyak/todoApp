//--------------------------------------------Edit-functionality----------------------

const form = document.getElementById("form");
let edit = document.querySelector(".btn-submit-editedTask");
const warn = document.getElementById("warning");
let task = document.getElementById("task1");
let desc = document.getElementById("desc1");
let priority = document.getElementById("tasks-priority");
let task2;
let desc2;
function handleEdit(id) {
  try {
    formContainer.classList.remove("hidden");
    formContainer.classList.add("visible");
    
    data.forEach(ele => {
      if(ele._id == id){
        task2 = ele.task;
        desc2 = ele.description;
      }
    }); 
    task.value = task2;
    desc.value = desc2;

  } catch (error) {
      console.log(error);
  }


  edit.addEventListener("click", (e) => {
    taskEdit(e);
  });

  async function taskEdit(e) {
    try {
      e.preventDefault();
      task = task.value;
      desc = desc.value;
      priority = priority.value;

      let updatedData = {
        task,
        description: desc,
        time,
        dayOfMonth,
        priority,
      };
      const response = await fetch(`${BASE_URL}/updateTask/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const newRes = await response.json();

      if (response.ok) {
        // Redirect after successful login
        setTimeout(() => {
          location.href = "../Home/Home.html";
        }, 1000);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
}
