const HospitalRegistration = artifacts.require("HospitalRegistration");

module.exports = function (deployer) {
  deployer.deploy(HospitalRegistration);
};
