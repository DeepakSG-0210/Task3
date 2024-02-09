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
  let flag;
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
    flag = 1;
    moveProgressBar(flag);
  } else {
    flag = 0;
    moveProgressBar(flag);
  }
}

function moveProgressBar(flag = 2) {
  let i = 0;
  if (i === 0) {
    let elem = document.getElementById("bar");
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        let message = document.getElementById("alert");
        const pMessage = document.querySelector("#alert p");
        clearInterval(id);
        i = 0;
        elem.style.width = 0;
        if (i === 0 && flag === 1) {
          message.style.backgroundColor = "#3ccc5d";
          message.style.opacity = 100;
          pMessage.textContent = "Login Successful!!";
          credentialsError.textContent = "";
        } else if (flag === 0) {
          message.style.backgroundColor = "red";
          message.style.opacity = 100;
          pMessage.textContent = "Login Failed!!";
          credentialsError.textContent = "Please enter valid email or password";
        }
      } else {
        width += 2;
        elem.style.width = width + "%";
      }
    }
  }
}

function validateForm() {
  if (document.querySelectorAll(".error").length === 0) {
    compareData();
  } else {
    moveProgressBar();
    let message = document.getElementById("alert");
    const pMessage = document.querySelector("#alert p");
    message.style.backgroundColor = "red";
    message.style.opacity = 100;
    pMessage.textContent = "Please fill all the required fields!!";
    // alert("Please fill all the required fields!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let eyeIcon = document.getElementsByClassName("eyeicon")[0];
  let password = document.getElementById("password");
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
  let close = document.getElementById("close-btn");
  let closeBtn = close.parentElement;
  closeBtn.style.opacity = "0";
  setTimeout(function () {
    dispatchEvent.style.display = "none";
  }, 300);
}
