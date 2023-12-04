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

btnpopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

iconclose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

// JavaScript code to handle the button click event
document.getElementById("linkButton").addEventListener("click", function () {
  window.location.href = "features.html";
});

