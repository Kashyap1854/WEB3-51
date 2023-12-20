window.onload = function () {
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
};
/*-------------------*/
function saveNote() {
    const textInput = document.getElementById('textInput');
    const colorPicker = document.getElementById('colorPicker');

    const noteContainer = document.getElementById('savedNotes');
    const note = document.createElement('div');
    note.className = 'note';
    note.style.backgroundColor = colorPicker.value;
    note.innerHTML = textInput.value;

    noteContainer.appendChild(note);
    clearText();
}

function clearText() {
    document.getElementById('textInput').value = '';
}

function clearNotes() {
    const noteContainer = document.getElementById('savedNotes');
    noteContainer.innerHTML = '';
}

