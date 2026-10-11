const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");
const toggleButtons = document.querySelectorAll(".toggle-btn");

function showError(id, message) {
  document.getElementById(id).classList.add("error");
  document.getElementById(id + "Error").textContent = message;
}

function clearError(id) {
  document.getElementById(id).classList.remove("error");
  document.getElementById(id + "Error").textContent = "";
}

function requiredMessage(id) {
  return document.getElementById(id).dataset.label + " is required.";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  const studentId = document.getElementById("studentId").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const program = document.getElementById("program").value;
  const yearLevel = document.getElementById("yearLevel").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const address = document.getElementById("address").value.trim();
  const agreement = document.getElementById("agreement").checked;

  if (studentId === "") {
    showError("studentId", requiredMessage("studentId"));
    isValid = false;
  } else {
    clearError("studentId");
  }

  if (fullName === "") {
    showError("fullName", requiredMessage("fullName"));
    isValid = false;
  } else {
    clearError("fullName");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    showError("email", requiredMessage("email"));
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError("email", "Enter a valid email (e.g. name@example.com).");
    isValid = false;
  } else {
    clearError("email");
  }

  const phonePattern = /^09\d{9}$/;
  if (phone === "") {
    showError("phone", requiredMessage("phone"));
    isValid = false;
  } else if (!phonePattern.test(phone)) {
    showError("phone", "Phone must be 11 digits and start with 09.");
    isValid = false;
  } else {
    clearError("phone");
  }

  if (dob === "") {
    showError("dob", requiredMessage("dob"));
    isValid = false;
  } else {
    clearError("dob");
  }

  if (!gender) {
    showError("gender", "Please select your gender.");
    isValid = false;
  } else {
    clearError("gender");
  }

  if (program === "") {
    showError("program", "Please select a program.");
    isValid = false;
  } else {
    clearError("program");
  }

  if (yearLevel === "") {
    showError("yearLevel", "Please select a year level.");
    isValid = false;
  } else {
    clearError("yearLevel");
  }

  if (password === "") {
    showError("password", requiredMessage("password"));
    isValid = false;
  } else if (password.length < 8) {
    showError("password", "Password must be at least 8 characters.");
    isValid = false;
  } else {
    clearError("password");
  }

  if (confirmPassword === "") {
    showError("confirmPassword", "Please confirm your password.");
    isValid = false;
  } else if (confirmPassword !== password) {
    showError("confirmPassword", "Passwords do not match.");
    isValid = false;
  } else {
    clearError("confirmPassword");
  }

  if (address === "") {
    showError("address", requiredMessage("address"));
    isValid = false;
  } else {
    clearError("address");
  }

  if (!agreement) {
    showError("agreement", "You must agree to the terms and conditions.");
    isValid = false;
  } else {
    clearError("agreement");
  }

  if (isValid) {
    successMessage.textContent = "Registration successful!";
    successMessage.classList.remove("hidden");
  } else {
    successMessage.classList.add("hidden");
  }
});

toggleButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const target = document.getElementById(button.dataset.target);
    const isActive = button.classList.toggle("active");

    target.setAttribute("type", isActive ? "text" : "password");
    button.textContent = isActive ? "Hide" : "Show";
  });
});

form.addEventListener("reset", function () {
  const ids = ["studentId", "fullName", "email", "phone", "dob", "gender",
               "program", "yearLevel", "password", "confirmPassword",
               "address", "agreement"];

  ids.forEach(function (id) {
    clearError(id);
  });

  successMessage.classList.add("hidden");
  successMessage.textContent = "";

  document.getElementById("password").setAttribute("type", "password");
  document.getElementById("confirmPassword").setAttribute("type", "password");
  toggleButtons.forEach(function (button) {
    button.classList.remove("active");
    button.textContent = "Show";
  });
});