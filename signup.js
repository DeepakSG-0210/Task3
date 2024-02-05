function validateUserName() {
  // console.log('Im here');
  const userNameInput = document.getElementById("username");
  const userNameError = document.getElementById("userNameError");

  if (userNameInput.value.trim() === "") {
    userNameInput.classList.add("error");
    userNameInput.classList.remove("success")
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
  localStorage.setItem("email", emailInput);
}

// const checkbox = document.getElementsByTagName('checkbox');
// console.log(checkbox);

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

function validateCheckBox() {
  const checkbox = document.getElementById('checkbox');

  if(!checkbox.checked){
    alert("Please accept the Terms & Conditions");
    return false;
  }
}

function saveData() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email);
  // localStorage.setItem("email", email);
  // localStorage.setItem("password", password);

  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];
  if(user_records.some((v) => {
    return v.email == email;
  })){
    alert("Duplicate Data");
  } else {
    user_records.push({"email": email, 
    "password":password
  })
  localStorage.setItem("users", JSON.stringify(user_records));
  }
}

function validateForm() {
  // e.preventDefault();
  validateUserName();
  validateEmail();
  validatePassword();
  const condition = validateCheckBox();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email);

  if(condition === false){
    return;
  }

  if(document.querySelectorAll('.error').length === 0){
    saveData();
    alert('Submitting');
  }else {
    alert('Please fill all the details correctly');
  }
}

let eyeIcon = document.getElementsByClassName('eyeicon');
let password = document.getElementById('password');
// console.log(eyeIcon);
eyeIcon[0].addEventListener("click", () => {
  if(password.type == "password"){
    password.type = "text";
    eyeIcon.value = "./images/eyeOpen.png";
  } else {
    password.type = "password";
    eyeIcon.src = "./images/eyeClose.png";
  }
});