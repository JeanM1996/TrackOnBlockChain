pragma solidity >=0.4.24 < 0.6.4;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'FarmerRole' to manage this role - add, remove, check
contract FarmerRole {
  using Roles for Roles.Role;
  // Define 2 events, one for Adding, and other for Removing
  event FarmerAdded(address indexed account, string name);
  event FarmerRemoved(address indexed account , string name);
  // Define a struct 'Farmers' by inheriting from 'Roles' library, struct Role
  Roles.Role private Farmers;
  // In the constructor make the address that deploys this contract the 1st Farmer
  constructor(string memory name) public {
    _addFarmer(msg.sender, name);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyFarmer() {
    require(isFarmer(msg.sender), "Acción solo permitida para el Agricultor");
    _;
  }
      function getNameFarmer(address account) public view returns (string memory) {
        return Farmers.getName(account);
    }
     /// Function to check caller `msg.sender` if he has Farmer role
    /// @return boolean for caller address state in `_Farmers` Role
    function amIFarmer() public view returns (bool) {
        return Farmers.has(msg.sender);
    }

  // Define a function 'isFarmer' to check this role
  function isFarmer(address account) public view returns (bool) {
     return Farmers.has(account);
  }

  // Define a function 'addFarmer' that adds this role
  function addFarmer(address account, string memory name) public onlyFarmer {
    _addFarmer(account, name);
  }

  // Define a function 'renounceFarmer' to renounce this role
  function renounceFarmer() public {
    _removeFarmer(msg.sender);
  }

  // Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
  function _addFarmer(address account, string memory name) internal {
    Farmers.add(account,name);
    emit FarmerAdded(account, name);
  }

  // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
  function _removeFarmer(address account) internal {
    Farmers.remove(account);
    emit FarmerRemoved(account,Farmers.name[account]);
  }
}