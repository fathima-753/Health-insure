// 2_deploy_contracts.js
const CompanyRegistry = artifacts.require("CompanyRegistry");

module.exports = function (deployer) {
  // Deploy the CompanyRegistry contract
  deployer.deploy(CompanyRegistry)
    .then(() => {
      console.log("CompanyRegistry contract deployed successfully!");
    })
    .catch((error) => {
      console.error("Error deploying CompanyRegistry:", error);
    });
};
