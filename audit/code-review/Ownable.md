# Ownable

Source file [../../sol/Ownable.sol](../../sol/Ownable.sol).

<br />

<hr />

```javascript
// BK Ok
pragma solidity ^0.4.11;

/// @title Base contract with an owner.
/// @dev Provides onlyOwner modifier, which prevents function from running if
/// it is called by anyone other than the owner.
// BK NOTE - Use the `acceptOwnership(...)` pattern to transfer ownership safely
// BK Ok
contract Ownable {
  // BK Ok
  address public owner;

  // BK Ok - Constructor
  function Ownable() {
    // BK Ok
    owner = msg.sender;
  }

  // BK Ok
  modifier onlyOwner() {
    // BK Ok
    require(msg.sender == owner);
    // BK Ok
    _;
  }

  /// @notice Transfer ownership from `owner` to `newOwner`
  /// @param newOwner The new contract owner
  // BK Ok - Only the current owner can execute this function
  function transferOwnership(address newOwner) onlyOwner {
    // BK Ok
    if (newOwner != address(0)) {
      // BK Ok
      owner = newOwner;
    }
  }

}

```
