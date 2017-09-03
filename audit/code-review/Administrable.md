# Administrable

Source file [../../sol/Administrable.sol](../../sol/Administrable.sol).

<br />

<hr />

```javascript
// BK NOTE - Consider using ^0.4.16
pragma solidity ^0.4.11;

// BK Ok
import "./Ownable.sol";

/// @title Manages Gimli administrators.
// BK Ok
contract Administrable is Ownable {

    // BK Next 2 Ok
    event AdminstratorAdded(address adminAddress);
    event AdminstratorRemoved(address adminAddress);

    // BK Ok
    mapping (address => bool) public administrators;

    // BK Ok
    modifier onlyAdministrator() {
        // BK Ok
        require(administrators[msg.sender] || owner == msg.sender); // owner is an admin by default
        // BK Ok
        _;
    }

    /// @notice Add an administrator
    /// @param _adminAddress The new administrator address
    // BK Ok - Only owner can add admins
    function addAdministrators(address _adminAddress) onlyOwner {
        // BK Ok
        administrators[_adminAddress] = true;
        // BK Ok - Log event
        AdminstratorAdded(_adminAddress);
    }

    /// @notice Remove an administrator
    /// @param _adminAddress The administrator address to remove
    // BK Ok - Only owner can remove administrator
    function removeAdministrators(address _adminAddress) onlyOwner {
        // BK Ok
        delete administrators[_adminAddress];
        // BK Ok
        AdminstratorRemoved(_adminAddress);
    }
}

```
