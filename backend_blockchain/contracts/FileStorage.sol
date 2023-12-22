// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    address public owner; // Add the owner variable if not already declared
    uint256 public fileCount;

    mapping(uint256 => File) public files;
    mapping(string => bool) public fileExists; // New mapping to track file existence
    mapping(string => address) public fileToOwner; // New mapping to track file ownership
    mapping(string => uint256) public fileToId; // New mapping to track file IDs
    mapping(string => string) public fileName; // New mapping to track file names
    mapping(string => uint256) public fileSize; // New mapping to track file sizes

    event FileAdded(uint256 fileId, string ipfsHash, string fileName, uint256 fileSize, uint256 timestamp);
    event FileDeleted(uint256 fileId, string ipfsHash, string fileName, uint256 fileSize, uint256 timestamp);

    struct File {
        string ipfsHash;
        string fileName;
        uint256 fileSize;
        uint256 timestamp;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addFile(string memory _ipfsHash, string memory _fileName, uint256 _fileSize) public onlyOwner {
        fileCount++;
        files[fileCount] = File(_ipfsHash, _fileName, _fileSize, block.timestamp);
        fileExists[_ipfsHash] = true; // Set file as existing
        fileToOwner[_ipfsHash] = msg.sender; // Set the owner of the file
        fileToId[_ipfsHash] = fileCount; // Set the file ID for the given IPFS hash
        fileName[_ipfsHash] = _fileName; // Set the file name
        fileSize[_ipfsHash] = _fileSize; // Set the file size

        emit FileAdded(fileCount, _ipfsHash, _fileName, _fileSize, block.timestamp);
    }
}
