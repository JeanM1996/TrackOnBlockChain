pragma solidity >=0.4.24 < 0.6.4;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ManufacturerRole' to manage this role - add, remove, check
contract ManufacturerRole {
  using Roles for Roles.Role;
  // Define 2 events, one for Adding, and other for Removing
  event ManufacturerAdded(address indexed account, string name);
  event ManufacturerRemoved(address indexed account , string name);
  // Define a struct 'Manufacturers' by inheriting from 'Roles' library, struct Role
  Roles.Role private Manufacturers;
  // In the constructor make the address that deploys this contract the 1st Manufacturer
  constructor(string memory name) public {
    _addManufacturer(msg.sender, name);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyManufacturer() {
    require(isManufacturer(msg.sender), "Acción solo permitida para el Manufacturer");
    _;
  }
      function getNameManufacturer(address account) public view returns (string memory) {
        return Manufacturers.getName(account);
    }
     /// Function to check caller `msg.sender` if he has Manufacturer role
    /// @return boolean for caller address state in `_Manufacturers` Role
    function amIManufacturer() public view returns (bool) {
        return Manufacturers.has(msg.sender);
    }

  // Define a function 'isManufacturer' to check this role
  function isManufacturer(address account) public view returns (bool) {
     return Manufacturers.has(account);
  }

  // Define a function 'addManufacturer' that adds this role
  function addManufacturer(address account, string memory name) public onlyManufacturer {
    _addManufacturer(account, name);
  }

  // Define a function 'renounceManufacturer' to renounce this role
  function renounceManufacturer() public {
    _removeManufacturer(msg.sender);
  }

  // Define an internal function '_addManufacturer' to add this role, called by 'addManufacturer'
  function _addManufacturer(address account, string memory name) internal {
    Manufacturers.add(account,name);
    emit ManufacturerAdded(account, name);
  }

  // Define an internal function '_removeManufacturer' to remove this role, called by 'removeManufacturer'
  function _removeManufacturer(address account) internal {
    Manufacturers.remove(account);
    emit ManufacturerRemoved(account, Manufacturers.name[account]);
  }
}