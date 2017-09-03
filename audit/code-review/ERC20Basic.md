# ERC20Basic

Source file [../../sol/ERC20Basic.sol](../../sol/ERC20Basic.sol).

<br />

<hr />

```javascript
// BK NOTE - Consider using ^0.4.16
pragma solidity ^0.4.11;

/// @title ERC20Basic
/// @dev Simpler version of ERC20 interface
/// @dev see https://github.com/ethereum/EIPs/issues/20
// BK Ok
contract ERC20Basic {
    // BK Ok
    uint256 public totalSupply;
    // BK Ok
    function balanceOf(address who) constant returns (uint256);
    // BK Ok - This function normally returns true/false but in this case throws instead of returning true/false
    function transfer(address to, uint256 value) returns (bool success);
    // BK Ok - Event
    event Transfer(address indexed from, address indexed to, uint256 value);
}

```
