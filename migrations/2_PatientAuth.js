const PatientAuth = artifacts.require("PatientAuth");

module.exports = function (deployer) {
    deployer.deploy(PatientAuth);
};
