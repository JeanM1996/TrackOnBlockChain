pragma solidity >=0.4.24 < 0.6.4;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'DistributorRole' to manage this role - add, remove, check
contract DistributorRole {
  using Roles for Roles.Role;
  // Define 2 events, one for Adding, and other for Removing
  event DistributorAdded(address indexed account, string name);
  event DistributorRemoved(address indexed account , string name);
  // Define a struct 'Distributors' by inheriting from 'Roles' library, struct Role
  Roles.Role private Distributors;
  // In the constructor make the address that deploys this contract the 1st Distributor
  constructor(string memory name) public {
    _addDistributor(msg.sender, name);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyDistributor() {
    require(isDistributor(msg.sender), "Acción solo permitida para el Distribuidor");
    _;
  }
      function getNameDistributor(address account) public view returns (string memory) {
        return Distributors.getName(account);
    }
     /// Function to check caller `msg.sender` if he has Distributor role
    /// @return boolean for caller address state in `_Distributors` Role
    function amIDistributor() public view returns (bool) {
        return Distributors.has(msg.sender);
    }

  // Define a function 'isDistributor' to check this role
  function isDistributor(address account) public view returns (bool) {
     return Distributors.has(account);
  }

  // Define a function 'addDistributor' that adds this role
  function addDistributor(address account, string memory name) public onlyDistributor {
    _addDistributor(account, name);
  }

  // Define a function 'renounceDistributor' to renounce this role
  function renounceDistributor() public {
    _removeDistributor(msg.sender);
  }

  // Define an internal function '_addDistributor' to add this role, called by 'addDistributor'
  function _addDistributor(address account, string memory name) internal {
    Distributors.add(account,name);
    emit DistributorAdded(account, name);
  }

  // Define an internal function '_removeDistributor' to remove this role, called by 'removeDistributor'
  function _removeDistributor(address account) internal {
    Distributors.remove(account);
    emit DistributorRemoved(account, Distributors.name[account]);
  }
}