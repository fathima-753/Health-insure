const HealthClaim = artifacts.require("HealthClaim");

module.exports = function (deployer) {
  deployer.deploy(HealthClaim);
};
