pragma solidity ^0.5.0;

/// Import all Roles
import "./ConsumerRole.sol";
import "./DistributorRole.sol";
import "./FarmerRole.sol";
import "./ManufacturerRole.sol";
import "./ProcessorRole.sol";
import "./RetailerRole.sol";


/// @author Khalid F.Sh
/// @title Role Ability Contract
/// @dev contract for adopting all roles in access control
contract Rolable is ConsumerRole("Consumidor"), FarmerRole("Agricultor"), DistributorRole("Distribuidor"), ProcessorRole("Procesador"), RetailerRole("Retelier"), ManufacturerRole("Fabricador") {

    /// Function to check all roles for the caller
    /// @return array contining every role with its state as boolean
    function whoAmI() public view returns(
        bool consumer,
        bool retailer,
        bool distributor,
        bool manufacturer,
        bool processor,
        bool farmer
    )
    {
        consumer = amIConsumer();
        retailer = amIRetailer();
        distributor = amIDistributor();
        manufacturer = amIManufacturer();
        processor = amIProcessor();
        farmer = amIFarmer();
    }
}
