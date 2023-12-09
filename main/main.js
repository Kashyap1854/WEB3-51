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
// Add or modify existing scripts as needed

function previewFiles() {
  const previewContainer = document.getElementById('file-preview');
  const filesInput = document.getElementById('file-input');
  const files = filesInput.files;

  previewContainer.innerHTML = ''; // Clear previous previews

  for (const file of files) {
      const reader = new FileReader();

      reader.onload = function (e) {
          const fileItem = document.createElement('div');
          fileItem.classList.add('file-item');

          if (file.type.includes('image')) {
              const img = document.createElement('img');
              img.src = e.target.result;
              fileItem.appendChild(img);
          } else {
              const defaultImageSrc = 'https://via.placeholder.com/150';
              const img = document.createElement('img');
              img.src = defaultImageSrc;
              fileItem.appendChild(img);
          }

          const fileName = document.createElement('div');
          fileName.classList.add('file-name');
          fileName.textContent = file.name;

          fileItem.appendChild(fileName);
          previewContainer.appendChild(fileItem);
      };

      reader.readAsDataURL(file);
  }
}