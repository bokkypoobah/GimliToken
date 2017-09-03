# Gimli

Source file [../../sol/Gimli.sol](../../sol/Gimli.sol).

<br />

<hr />

```javascript
// BK NOTE - Consider using ^0.4.16
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
        // BK NOTE - The following comment is incorrect
        // MULTISIG_WALLET_ADDRESS becomes the owner
        owner = MULTISIG_WALLET_ADDRESS;
        // Give the creator initial tokens
        // BK Ok - Owner has TOTAL_SUPPLY - CROWDSALE_AMOUNT - VESTING_1_AMOUNT - VESTING_2_AMOUNT
        balances[owner] = safeAdd(balances[owner], TOTAL_SUPPLY - CROWDSALE_AMOUNT - VESTING_1_AMOUNT - VESTING_2_AMOUNT);
        // Give the contract crowdsale amount
        // BK Ok - This contract has CROWDSALE_AMOUNT
        balances[this] = CROWDSALE_AMOUNT;
        // Locked address
        // BK Ok
        balances[LOCKED_ADDRESS] = VESTING_1_AMOUNT + VESTING_2_AMOUNT;
        // For ERC20 compatibility
        // BK Ok
        totalSupply = TOTAL_SUPPLY;
    }

}

```
