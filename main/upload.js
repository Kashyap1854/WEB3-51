const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;


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
