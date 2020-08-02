// migrating the appropriate contracts
var Rolable = artifacts.require("Rolable");
var SupplyChain = artifacts.require("SupplyChain");

module.exports = function(deployer) {
  deployer.deploy(Rolable);
  deployer.deploy(SupplyChain);
};
