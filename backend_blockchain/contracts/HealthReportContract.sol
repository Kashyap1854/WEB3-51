// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract HealthReport{
    address public owner;
    string public ipfsHash;

    constructor(){
        ipfsHash = "NoHashStoredYet";
        owner = msg.sender;
    }

    function changeHash(string memory newHash) public{
        require(msg.sender == owner, "Access Denied!");
        ipfsHash = newHash;
    }

    function fetchHash() public view returns(string memory){
        return (ipfsHash);
    }
}