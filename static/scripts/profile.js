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
