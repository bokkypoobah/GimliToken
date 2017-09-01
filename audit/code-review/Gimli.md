# Gimli

Source file [../../sol/Gimli.sol](../../sol/Gimli.sol).

<br />

<hr />

```javascript
// BK Ok
pragma solidity ^0.4.11;

// BK Next 2 Ok
import "GimliStreamers.sol";
import "GimliCrowdsale.sol";

/// @title Main Gimli contract.
// BK Ok
contract Gimli is GimliStreamers, GimliCrowdsale {

    /// @notice Gimli Contract constructor. `msg.sender` is the owner.
    // BK Ok - Constructor
    function Gimli() {
        // `msg.sender` becomes the owner
        // BK NOTE - The following statement is not required as Ownable.Ownable() will assign this variable
        owner = msg.sender;
        // Give the creator initial tokens
        // BK Ok - Owner has TOTAL_SUPPLY - CROWDSALE_AMOUNT - VESTING_1_AMOUNT - VESTING_2_AMOUNT
        balances[msg.sender] = safeAdd(balances[msg.sender], TOTAL_SUPPLY - CROWDSALE_AMOUNT - VESTING_1_AMOUNT - VESTING_2_AMOUNT);
        // Give the contract crowdsale amount
        // BK Ok - This contract has CROWDSALE_AMOUNT
        balances[this] = CROWDSALE_AMOUNT;
        // For ERC20 compatibility
        // BK Ok
        totalSupply = TOTAL_SUPPLY;
    }

}

```
