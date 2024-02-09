let message;
let pMessage;
let flag;

function validateUserName() {
  const userNameInput = document.getElementById("username");
  const userNameError = document.getElementById("userNameError");

  if (userNameInput.value.trim() === "") {
    userNameInput.classList.add("error");
    userNameInput.classList.remove("success");
    userNameError.textContent = "Please enter valid username";
  } else {
    userNameInput.classList.add("success");
    userNameInput.classList.remove("error");
    userNameError.textContent = "";
  }
}
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
    passwordInput.classList.add("error");
    passwordInput.classList.remove("success");
    passwordError.textContent =
      "Password should contain at least one number and be 8-12 characters long";
  }
}

function progress() {
  let i = 0;
  if (i === 0) {
    let elem = document.getElementById("bar");
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval();
        i = 0;
      } else {
        width += 2;
        elem.style.width = width + "%";
      }
    }
  }
}

function validateCheckBox() {
  const checkbox = document.getElementById("checkbox");

  if (!checkbox.checked) {
    // alert("Please accept the Terms & Conditions");
    progress();
    message = document.getElementById("alert");
    pMessage = document.querySelector("#alert p");
    message.style.backgroundColor = "red";
    message.style.opacity = 100;
    pMessage.textContent = "Please accept the Terms & Conditions";
    return false;
  }
}

function saveData() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  if (
    user_records.some((v) => {
      return v.email == email;
    })
  ) {
    // alert("Duplicate Data");
    progress();
    let message = document.getElementById("alert");
    const pMessage = document.querySelector("#alert p");
    message.style.backgroundColor = "red";
    message.style.opacity = 100;
    pMessage.textContent = "Email already exists!!";
    return false;
  } else {
    console.log(flag);
    flag = 1;
    moveProgressBar(flag);
    user_records.push({ email: email, password: password });
    localStorage.setItem("users", JSON.stringify(user_records));
  }
}

function moveProgressBar(flag) {
  progress();
  // let i;
  message = document.getElementById("alert");
  pMessage = document.querySelector("#alert p");
  if (flag === 1) {
    console.log(flag);
    message.style.backgroundColor = "#3ccc5d";
    message.style.opacity = 100;
    pMessage.textContent = "Signup Successful!!";
    // credentialsError.textContent = "";
  } else if (flag === 0) {
    message.style.backgroundColor = "red";
    message.style.opacity = 100;
    pMessage.textContent = "Please fill all the details correctly";
    // credentialsError.textContent = "Please enter valid email or password";
  }
}

function validateForm() {
  validateUserName();
  validateEmail();
  validatePassword();
  const condition = validateCheckBox();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (condition === false) {
    return;
  }

  if (document.querySelectorAll(".error").length === 0) {
    saveData();
    // alert("Submitting");
  } else {
    // alert("Please fill all the details correctly");
    flag = 0;
    moveProgressBar(flag);
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

function closeButton() {
  let closeBtn = this.parentElement;
  closeBtn.style.opacity = "0";
  setTimeout(function() {
    closeBtn.style.display = "none";
  }, 300);
}