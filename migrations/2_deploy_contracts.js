// migrating the appropriate contracts
var FarmerRole = artifacts.require("FarmerRole");
var DistributorRole = artifacts.require("DistributorRole");
var RetailerRole = artifacts.require("RetailerRole");
var ConsumerRole = artifacts.require("ConsumerRole");
var SupplyChain = artifacts.require("SupplyChain");

module.exports = function(deployer) {
  deployer.deploy(FarmerRole);
  deployer.deploy(DistributorRole);
  deployer.deploy(RetailerRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
};
