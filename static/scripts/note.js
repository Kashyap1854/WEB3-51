
      function saveText() {
        var textInput = document.getElementById('textInput').value;
        localStorage.setItem('savedText', textInput);
        alert('Text saved successfully!');
    }


    function clearText() {
        document.getElementById('textInput').value = '';
        localStorage.removeItem('savedText');
        alert('Text cleared successfully!');
    }

    window.onload = function () {
        var savedText = localStorage.getItem('savedText');
        if (savedText) {
            document.getElementById('textInput').value = savedText;
        }
    };