pragma solidity >=0.4.24 < 0.6.4;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract RetailerRole {
  using Roles for Roles.Role;
  // Define 2 events, one for Adding, and other for Removing
  event RetailerAdded(address indexed account, string name);
  event RetailerRemoved(address indexed account , string name);
  // Define a struct 'Retailers' by inheriting from 'Roles' library, struct Role
  Roles.Role private Retailers;
  // In the constructor make the address that deploys this contract the 1st Retailer
  constructor(string memory name) public {
    _addRetailer(msg.sender, name);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyRetailer() {
    require(isRetailer(msg.sender), "Acción solo permitida para el Retailer");
    _;
  }
      function getNameRetailer(address account) public view returns (string memory) {
        return Retailers.getName(account);
    }
     /// Function to check caller `msg.sender` if he has Retailer role
    /// @return boolean for caller address state in `_Retailers` Role
    function amIRetailer() public view returns (bool) {
        return Retailers.has(msg.sender);
    }

  // Define a function 'isRetailer' to check this role
  function isRetailer(address account) public view returns (bool) {
     return Retailers.has(account);
  }

  // Define a function 'addRetailer' that adds this role
  function addRetailer(address account, string memory name) public onlyRetailer {
    _addRetailer(account, name);
  }

  // Define a function 'renounceRetailer' to renounce this role
  function renounceRetailer() public {
    _removeRetailer(msg.sender);
  }

  // Define an internal function '_addRetailer' to add this role, called by 'addRetailer'
  function _addRetailer(address account, string memory name) internal {
    Retailers.add(account,name);
    emit RetailerAdded(account, name);
  }

  // Define an internal function '_removeRetailer' to remove this role, called by 'removeRetailer'
  function _removeRetailer(address account) internal {
    Retailers.remove(account);
    emit RetailerRemoved(account, Retailers.name[account]);
  }
}