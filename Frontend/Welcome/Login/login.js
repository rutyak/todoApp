
async function login() {
  const warn = document.getElementById("warning");
  const emailInput = document.getElementById("email1");
  const passwordInput = document.getElementById("password1");
  const email = emailInput.value.trim();  //removing space
  const password = passwordInput.value.trim();
  // Check if the email and password are not empty
  if (email === "" || password === "") {
    warn.innerHTML = `<div style="color: red"><p>Please fill in all fields</p></div>`;
    return;
  }

  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    warn.innerHTML = `<div style="color: green"><p>${data.message}</p></div>`;
    // Redirect after successful login
    setTimeout(() => {
      location.href = "../../main/Home/Home.html";
    }, 2000);
  } else {
    warn.innerHTML = `<div style="color: red"><p>${data.message}</p></div>`;
  }
}
