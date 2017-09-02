# ERC20

Source file [../../sol/ERC20.sol](../../sol/ERC20.sol).

<br />

<hr />

```javascript
// BK Ok
pragma solidity ^0.4.11;

// BK Ok
import "./ERC20Basic.sol";

/// @title ERC20 interface
/// @dev see https://github.com/ethereum/EIPs/issues/20
// BK Ok
contract ERC20 is ERC20Basic {
    // BK Ok
    function allowance(address owner, address spender) constant returns (uint256);
    // BK Ok - This function normally returns true/false but in this case throws instead of returning true/false
    function transferFrom(address from, address to, uint256 value) returns (bool success);
    // BK Ok
    function approve(address spender, uint256 value) returns (bool success);
    // BK Ok - Event
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

```
