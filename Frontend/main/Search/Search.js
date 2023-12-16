// -------------------------search-functionality---------------------------

let searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
  let search = searchInput.value.toLowerCase();
  filterTasks(search);
});
const createElement = (element) => document.createElement(element);
const boilerPlate = (id, taskTitle, priority, description) => {
  const taskModule = createElement("div");
};
function filterTasks(search) {
  let count = 0;
  let entireInfo = [];

  data.forEach((value, i) => {
    // Check if the task contains the search text
    if (
     ( value.task.toLowerCase().includes(search) ||
      value.description.toLowerCase().includes(search)) && value.stage == "Upcoming"
    ) {
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


