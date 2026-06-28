const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

if (registerBtn && loginBtn && container) {
  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });
}

const mobLoginBtn = document.getElementById("mobile-login-btn");
const mobRegisterBtn = document.getElementById("mobile-register-btn");

if (mobLoginBtn && mobRegisterBtn && container) {
  mobRegisterBtn.addEventListener("click", () => {
    container.classList.add("active");
    mobRegisterBtn.classList.add("active-mob");
    mobLoginBtn.classList.remove("active-mob");
  });

  mobLoginBtn.addEventListener("click", () => {
    container.classList.remove("active");
    mobLoginBtn.classList.add("active-mob");
    mobRegisterBtn.classList.remove("active-mob");
  });
}

const signUpForm = document.querySelector(".sign-up form");
if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Registered Successfully!",
            text: data.message,
            timer: 2500,
            showConfirmButton: false,
            heightAuto: false,
          }).then(() => {
            container.classList.remove("active");
            window.location.href = data.redirect;
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message,
            heightAuto: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Server is not responding!",
          heightAuto: false,
        });
      });
  });
}

const signInForm = document.querySelector(".sign-in form");
if (signInForm) {
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: data.message,
            timer: 1500,
            showConfirmButton: false,
            heightAuto: false,
          }).then(() => {
            window.location.href = data.redirect;
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: data.message,
            heightAuto: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Server is not responding!",
          heightAuto: false,
        });
      });
  });
}

document.querySelectorAll(".social-icons a").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "Coming Soon",
      text: "Social media integration is currently under development...",
      heightAuto: false,
    });
  });
});