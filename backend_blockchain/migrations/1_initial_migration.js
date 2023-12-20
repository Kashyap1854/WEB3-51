const InfoContract = artifacts.require("InfoContract");

module.exports = function (deployer) {
  deployer.deploy(InfoContract);
};
