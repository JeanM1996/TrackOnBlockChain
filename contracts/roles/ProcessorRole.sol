pragma solidity >=0.4.24 < 0.6.4;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ProcessorRole' to manage this role - add, remove, check
contract ProcessorRole {
  using Roles for Roles.Role;
  // Define 2 events, one for Adding, and other for Removing
  event ProcessorAdded(address indexed account, string name);
  event ProcessorRemoved(address indexed account , string name);
  // Define a struct 'Processors' by inheriting from 'Roles' library, struct Role
  Roles.Role private Processors;
  // In the constructor make the address that deploys this contract the 1st Processor
  constructor(string memory name) public {
    _addProcessor(msg.sender, name);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyProcessor() {
    require(isProcessor(msg.sender), "Acción solo permitida para el Distribuidor");
    _;
  }
      function getNameProcessor(address account) public view returns (string memory) {
        return Processors.getName(account);
    }
     /// Function to check caller `msg.sender` if he has Processor role
    /// @return boolean for caller address state in `_Processors` Role
    function amIProcessor() public view returns (bool) {
        return Processors.has(msg.sender);
    }

  // Define a function 'isProcessor' to check this role
  function isProcessor(address account) public view returns (bool) {
     return Processors.has(account);
  }

  // Define a function 'addProcessor' that adds this role
  function addProcessor(address account, string memory name) public onlyProcessor {
    _addProcessor(account, name);
  }

  // Define a function 'renounceProcessor' to renounce this role
  function renounceProcessor() public {
    _removeProcessor(msg.sender);
  }

  // Define an internal function '_addProcessor' to add this role, called by 'addProcessor'
  function _addProcessor(address account, string memory name) internal {
    Processors.add(account,name);
    emit ProcessorAdded(account, name);
  }

  // Define an internal function '_removeProcessor' to remove this role, called by 'removeProcessor'
  function _removeProcessor(address account) internal {
    Processors.remove(account);
    emit ProcessorRemoved(account, Processors.name[account]);
  }
}