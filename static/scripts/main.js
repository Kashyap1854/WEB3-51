function logout() {
  const form = document.getElementById("logout");
  console.log(form);
  form.addEventListener("submit", (event) => {
    console.log(" Prevented default submission ");
    event.preventDefault();
  });
  if (confirm("Are you sure you want to logout !")) {
    console.log("Confirmation received !");
    form.submit();
  }
}

let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let searchBtn = document.querySelector(".bx-search");
let listitem = document.querySelectorAll(".list-item");
btn.onclick = function () {
  sidebar.classList.toggle("active");
};

searchBtn.onclick = function () {
  sidebar.classList.toggle("active");
};

function activeLink() {
  listitem.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
listitem.forEach((item) => (item.onclick = activeLink));
