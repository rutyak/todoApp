

async function signup() {
    let warn = document.getElementById("warning");
    let name = document.getElementById("name");
    let email = document.getElementById("email").value;
    let cpassword = document.getElementById("cpassword");
    let passwordInput = document.getElementById("password");
    
    // window.email = email;
    console.log("email in singup: ", email);
    let password = passwordInput.value.trim();
    cpassword = cpassword.value.trim();
    name = name.value.trim();
  
    // Check if the email and password are not empty
    if (email === "" || password === "" || name === "" || cpassword === "") {
      warn.innerHTML = `<div style="color: red"><p>Please fill in all fields</p></div>`;
      return;
    }
    if (password !== cpassword) {
      warn.innerHTML = `<div style="color: red"><p>Passwords must be same.</p></div>`;
      return;
    }
    if (password.length < 6) {
      warn.innerHTML = `<div style="color: red"><p>Password must contain char greater than 6</p></div>`;
      return;
    }
  
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      warn.innerHTML = `<div style="color: green"><p>${data.message}</p></div>`;
  
      // Dispatch the custom event after successful signup
      const signupEvent = new CustomEvent("signupSuccess", { detail: { email } });
      document.dispatchEvent(signupEvent);
  
      // Redirect after successful signup
      setTimeout(() => {
        location.href = "../../main/Home/Home.html";
      }, 2000);
    } else {
      warn.innerHTML = `<div style="color: red"><p>${data.message}</p></div>`;
    }
  }
  

