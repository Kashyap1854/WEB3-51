const wrapper = document.querySelector(".wrapper");
const registerlink = document.querySelector(".register-link");
const loginlink = document.querySelector(".login-link");
const btnpopup = document.querySelector(".btnlogin-poppin");
const iconclose = document.querySelector(".cross");
registerlink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginlink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

if (btnpopup) {
  btnpopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
  });
}

if (iconclose) {
  iconclose.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
  });
}

// Path: WEB3-51/login/login.js

function registerAccount() {
  const form = document.getElementById("registration");
  form.addEventListener("submit", (event) => {
    console.log(" Prevented default submission ");
    event.preventDefault();
  });
  if (confirm("Are you sure you want to register")) {
    console.log("Confirmation received !");
    form.submit();
  }
}
