//--------------------------drag-drop-functionality------------------------------

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  async function todoDrop(ev) {
    try {
      window.location.reload();
    var id = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(id));
    console.log("Droped in progress section");
    console.log("id of droped item: ", id);
    let updatedData = {
      stage: "Upcoming",
    };
    const response = await fetch(`${BASE_URL}/updateTask/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  
    const resTodo = await response.json();
    console.log(resTodo);
  
  } catch (error) {
      console.log("Error in todo: ",error)
  }
  }