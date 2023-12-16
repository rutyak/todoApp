// -----------------delete-functionality------------------

async function deleteTask(id) {
    try {
      const response = await fetch(`${BASE_URL}/deleteTask/${id}`);
  
      if (response.status === 204) {
        alert("Deleted successfully");
      } else {
        // Only attempt to parse JSON if there is content in the response
        const info = await response.json();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    window.location.reload();
  }
  