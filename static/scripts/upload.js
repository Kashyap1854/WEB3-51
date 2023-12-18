const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMDI2NWMxMi0yMDU0LTQ2YzctYTQzOC1jMWM1ZTg3YTI3MjUiLCJlbWFpbCI6Im1vaGl0aG4yMDA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlYmQ5Y2Q0OTI5MmY1OWJiMjllMiIsInNjb3BlZEtleVNlY3JldCI6ImFlYjAzYTczYWQxODliNjc0NzJhZTVjYWI1YzFiNmMyOTc1MTNiYTI2YjJlZGQyMmQ0MWY3ZGYyNGQ5MDQ4NDEiLCJpYXQiOjE3MDI3OTcyNjR9.AbwlNA9ENLHXCGWwp91pkoROQch70-5dElLs7fSuXSI';

const app = express();
const port = 3000;

app.use(express.static('public'));

// Array to store corresponding IPFS hashes for each uploaded file
const uploadedFiles = [];

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

app.post('/upload', upload.array('files'), async (req, res) => {
  const ipfsHashes = await uploadSequentially(req.files, req.body.fileName);
  res.status(200).send('Files uploaded successfully.');
});

app.get('/getFilePaths', (req, res) => {
  res.json(uploadedFiles);
});

const pinFileToIPFS = async (file) => {
  const formData = new FormData();

  const fileStream = fs.createReadStream(file.path);
  formData.append('file', fileStream);

  const pinataMetadata = JSON.stringify({
    name: path.basename(file.path),
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`, // Replace with your actual Pinata JWT token
      },
    });

    console.log(`File ${file.path} uploaded to IPFS with hash: ${response.data.IpfsHash}`);
    return response.data.IpfsHash;
  } catch (error) {
    console.error(`Error uploading file ${file.path} to IPFS:`, error);
    throw error;
  }
};

const uploadSequentially = async (files, fileName) => {
  const ipfsHashes = [];
  for (const file of files) {
    try {
      const ipfsHash = await pinFileToIPFS(file);
      ipfsHashes.push(ipfsHash);
      // Store the IPFS hash, timestamp, file size, and file name in the array
      uploadedFiles.push({
        ipfsHash,
        timestamp: new Date().toISOString(),
        size: file.size,
        name: fileName,
      });
    } catch (error) {
      console.error('Error in pinFileToIPFS:', error);
    }
  }
  return ipfsHashes;
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




// const express = require('express');
// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const multer = require('multer');
// const path = require('path');
// const mongoose = require('mongoose');

// const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMDI2NWMxMi0yMDU0LTQ2YzctYTQzOC1jMWM1ZTg3YTI3MjUiLCJlbWFpbCI6Im1vaGl0aG4yMDA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlYmQ5Y2Q0OTI5MmY1OWJiMjllMiIsInNjb3BlZEtleVNlY3JldCI6ImFlYjAzYTczYWQxODliNjc0NzJhZTVjYWI1YzFiNmMyOTc1MTNiYTI2YjJlZGQyMmQ0MWY3ZGYyNGQ5MDQ4NDEiLCJpYXQiOjE3MDI3OTcyNjR9.AbwlNA9ENLHXCGWwp91pkoROQch70-5dElLs7fSuXSI';
// // Replace with your actual Pinata JWT token

// mongoose.connect('mongodb+srv://mohithn2004:Mohith%40123@cluster0.debuhi4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// const app = express();
// const port = 3000;

// app.use(express.static('public'));

// // Define MongoDB schema
// const fileSchema = new mongoose.Schema({
//   ipfsHash: String,
//   timestamp: String,
//   name: String,
//   size: Number, // Adding file size to the schema
// });

// const File = mongoose.model('File', fileSchema);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'demo.html'));
// });

// app.post('/upload', upload.array('files'), async (req, res) => {
//   try {
//     const ipfsHashes = await uploadSequentially(req.files, req.body.fileName);
//     res.status(200).send('Files uploaded successfully.');
//   } catch (error) {
//     console.error('Error uploading files:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/getFilePaths', async (req, res) => {
//   try {
//     const fileList = await File.find({}, { _id: 0, __v: 0 });
//     res.json(fileList);
//   } catch (error) {
//     console.error('Error retrieving file paths:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// const pinFileToIPFS = async (file) => {
//   const formData = new FormData();

//   const fileStream = fs.createReadStream(file.path);
//   formData.append('file', fileStream);

//   const pinataMetadata = JSON.stringify({
//     name: path.basename(file.path),
//   });
//   formData.append('pinataMetadata', pinataMetadata);

//   const pinataOptions = JSON.stringify({
//     cidVersion: 0,
//   });
//   formData.append('pinataOptions', pinataOptions);

//   try {
//     const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
//       maxBodyLength: 'Infinity',
//       headers: {
//         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//         'Authorization': `Bearer ${JWT}`,
//       },
//     });

//     console.log(`File ${file.path} uploaded to IPFS with hash: ${response.data.IpfsHash}`);
//     return response.data.IpfsHash;
//   } catch (error) {
//     console.error(`Error uploading file ${file.path} to IPFS:`, error);
//     throw error;
//   }
// };

// const uploadSequentially = async (files, fileName) => {
//   const ipfsHashes = [];
//   for (const file of files) {
//     try {
//       const ipfsHash = await pinFileToIPFS(file);
//       ipfsHashes.push(ipfsHash);

//       // Store the IPFS hash, timestamp, file size, and file name in MongoDB
//       const newFile = new File({
//         ipfsHash,
//         timestamp: new Date().toISOString(),
//         size: file.size,
//         name: fileName,
//       });
//       await newFile.save();
//     } catch (error) {
//       console.error('Error in pinFileToIPFS:', error);
//       throw error;
//     }
//   }
//   return ipfsHashes;
// };

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
