pragma solidity >=0.4.24 < 0.6.4;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract ConsumerRole {
  using Roles for Roles.Role;
  // Define 2 events, one for Adding, and other for Removing
  event ConsumerAdded(address indexed account, string name);
  event ConsumerRemoved(address indexed account , string name);
  // Define a struct 'Consumers' by inheriting from 'Roles' library, struct Role
  Roles.Role private Consumers;
  // In the constructor make the address that deploys this contract the 1st Consumer
  constructor(string memory name) public {
    _addConsumer(msg.sender, name);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyConsumer() {
    require(isConsumer(msg.sender), "Acción solo permitida para el consumidor");
    _;
  }
      function getNameConsumer(address account) public view returns (string memory) {
        return Consumers.getName(account);
    }
     /// Function to check caller `msg.sender` if he has Consumer role
    /// @return boolean for caller address state in `_Consumers` Role
    function amIConsumer() public view returns (bool) {
        return Consumers.has(msg.sender);
    }

  // Define a function 'isConsumer' to check this role
  function isConsumer(address account) public view returns (bool) {
     return Consumers.has(account);
  }

  // Define a function 'addConsumer' that adds this role
  function addConsumer(address account, string memory name) public onlyConsumer {
    _addConsumer(account, name);
  }

  // Define a function 'renounceConsumer' to renounce this role
  function renounceConsumer() public {
    _removeConsumer(msg.sender);
  }

  // Define an internal function '_addConsumer' to add this role, called by 'addConsumer'
  function _addConsumer(address account, string memory name) internal {
    Consumers.add(account,name);
    emit ConsumerAdded(account, name);
  }

  // Define an internal function '_removeConsumer' to remove this role, called by 'removeConsumer'
  function _removeConsumer(address account) internal {
    Consumers.remove(account);
    emit ConsumerRemoved(account, Consumers.name[account]);
  }
}