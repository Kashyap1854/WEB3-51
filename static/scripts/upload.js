const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});

const upload = multer({ storage: storage });

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path; // This is the server-side path where the file is stored
//   res.send(File uploaded to: ${filePath});
// });

const Moralis = require("moralis").default;
const fs = require("fs");
require("dotenv").config();

const fileUploads = [
    {
        path : filePath,
        content: fs.readFileSync(filePath,{encoding: "base64"})
    }
]

async function uploadToIpfs(){
    await Moralis.start({
        apiKey : process.env.MORALIS_KEY 
    })

    const res = await Moralis.EvmApi.ipfs.uploadFolder({
        abi : fileUploads
    })

    console.log(res.result);
}

uploadToIpfs();

});

app.listen(port, () => {
  console.log(Server is running on http://localhost:${port});
});