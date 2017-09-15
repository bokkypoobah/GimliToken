# Ownable

Source file [../../sol/Ownable.sol](../../sol/Ownable.sol).

<br />

<hr />

```javascript
// BK NOTE - Consider using ^0.4.16
pragma solidity ^0.4.11;

/// @title Base contract with an owner.
/// @dev Provides onlyOwner modifier, which prevents function from running if
/// it is called by anyone other than the owner.
// BK NOTE - Use the `acceptOwnership(...)` pattern to transfer ownership safely
// BK Ok
contract Ownable {
    // BK Ok
    address public owner;
    // BK Ok
    address public newOwner;

    // BK Ok
    event OwnershipTransferred(address indexed _from, address indexed _to);

    // BK Ok
    modifier onlyOwner() {
        // BK Ok
        require(msg.sender == owner);
        // BK Ok
        _;
    }

    // BK Ok - Constructor
    function Ownable() {
        // BK Ok
        owner = msg.sender;
    }

    /// @notice Transfer ownership from `owner` to `newOwner`
    /// @param _newOwner The new contract owner
    // BK Ok - Only the current owner can execute this function
    function transferOwnership(address _newOwner) onlyOwner {
        // BK Ok
        if (_newOwner != address(0)) {
            // BK Ok
            newOwner = _newOwner;
        }
    }

    /// @notice accept ownership of the contract
    function acceptOwnership() {
        require(msg.sender == newOwner);
        OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

}

```
