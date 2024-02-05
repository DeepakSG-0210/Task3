function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  if (emailRegex.test(emailInput.value)) {
    emailInput.classList.add("success");
    emailInput.classList.remove("error");
    emailError.textContent = "";
  } else {
    emailInput.classList.remove("success");
    emailInput.classList.add("error");
    emailError.textContent = "Invalid email address";
  }
}

function validatePassword() {
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("passwordError");

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;

  if (passwordRegex.test(passwordInput.value)) {
    passwordInput.classList.add("success");
    passwordInput.classList.remove("error");
    passwordError.textContent = "";
  } else {
    passwordInput.classList.remove("success");
    passwordInput.classList.add("error");
    passwordError.textContent =
      "Password should contain at least one number and be 8-12 characters long";
  }
}

function compareData() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  if (
    user_records.some((v) => {
      return v.email === email && v.password === password;
    })
  ) {
    alert("Login Successfull!");
  } else {
    credentialsError.textContent = "Please enter valid email or password";
    alert("Login Fail");
  }
}

function validateForm() {
  validateEmail();
  validatePassword();

  console.log(document.querySelectorAll(".error"));
  if (document.querySelectorAll(".error").length === 0) {
    compareData();
  } else {
    alert("Please fill all the required fields!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let eyeIcon = document.getElementsByClassName("eyeicon")[0];
  let password = document.getElementById("password");
  // console.log(eyeIcon);
  eyeIcon.addEventListener("click", function () {
    if (password.type == "password") {
      password.type = "text";
      eyeIcon.src = "./images/eyeOpen.png";
    } else {
      password.type = "password";
      eyeIcon.src = "./images/eyeClose.png";
    }
  });
});