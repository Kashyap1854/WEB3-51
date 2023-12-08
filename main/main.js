// Selectors
let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let searchBtn = document.querySelector('.bx-search');
let listitem = document.querySelectorAll('.list-item');

// Sidebar toggle functionality
btn.onclick = function () {
    sidebar.classList.toggle('active');
}

searchBtn.onclick = function () {
    sidebar.classList.toggle('active');
}

// Active link functionality
function activeLink() {
    listitem.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
}
listitem.forEach((item) =>
    item.onclick = activeLink);

// File upload functionality
const defaultBtn = document.querySelector("#file");
const uploadBtn = document.querySelector("#upload-btn");
const img = document.querySelector(".image img"); // Corrected selector for the image

function defaultBtnActive() {
    defaultBtn.click();
}

defaultBtn.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const result = reader.result;
            img.src = result;
        }
        reader.readAsDataURL(file);
    }
});
