const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $("#register-form");
const usernameInput = $("#username");
const emailInput = $("#email");
const passwordInput = $("#password");
const confirmPasswordInput = $("#confirm-password");
const submitBtn = $("#submit-btn");

const usernameError = $("#username-error");
const emailError = $("#email-error");
const passwordError = $("#password-error");
const confirmPasswordError = $("#confirm-password-error");

let isUsernameTouched = false;
let isEmailTouched = false;
let isPasswordTouched = false;
let isConfirmPasswordTouched = false;

function validateForm() {
  const usernameValue = usernameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;

  let isUsernameValid = false;
  let isEmailValid = false;
  let isPasswordValid = false;
  let isConfirmPasswordValid = false;
  // Điều kiện username
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (usernameValue.length < 4) {
    if (isUsernameTouched)
      usernameError.textContent = "Tên đăng nhập phải có ít nhất 4 ký tự";
  } else if (!usernameRegex.test(usernameValue)) {
    if (isUsernameTouched)
      usernameError.textContent =
        "Không được chứa khoảng trắng và ký tự đặc biệt.";
  } else {
    usernameError.textContent = "";
    isUsernameValid = true;
  }

  // điều kiện email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    if (isEmailTouched) emailError.textContent = "Email không đúng định dạng";
  } else {
    emailError.textContent = "";
    isEmailValid = true;
  }

  // điều kiện mật khẩu
  const passwordRegex = /\d/;
  if (passwordValue.length < 8) {
    if (isPasswordTouched)
      passwordError.textContent = "Mật khẩu phải có ít nhất 8 ký tự";
  } else if (!passwordRegex.test(passwordValue)) {
    if (isPasswordTouched)
      passwordError.textContent = "Mật khẩu phải chứa ít nhất một chữ số.";
  } else {
    passwordError.textContent = "";
    isPasswordValid = true;
  }
  //Điều kiện nhập lại mật khẩu
  if (confirmPasswordValue !== passwordValue) {
    if (isConfirmPasswordTouched)
      confirmPasswordError.textContent = "Mật khẩu nhập lại không khớp";
  } else {
    confirmPasswordError.textContent = "";
    isConfirmPasswordValid = true;
  }
  if (
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", "true");
  }
}

usernameInput.addEventListener("input", function () {
  isUsernameTouched = true;
  validateForm();
});

emailInput.addEventListener("input", function () {
  isEmailTouched = true;
  validateForm();
});

passwordInput.addEventListener("input", function () {
  isPasswordTouched = true;
  if (confirmPasswordInput.value !== "") {
    isConfirmPasswordTouched = true;
  }
  validateForm();
});

confirmPasswordInput.addEventListener("input", function () {
  isConfirmPasswordTouched = true;
  validateForm();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const successMsg = document.createElement("p");
    successMsg.textContent = "Đăng ký thành công!";
    successMsg.style.color = "green";
    successMsg.style.fontWeight = "bold";
    form.appendChild(successMsg);
})
