# Gimli

Source file [../../sol/Gimli.sol](../../sol/Gimli.sol).

<br />

<hr />

```javascript
// BK NOTE - Consider using ^0.4.16
pragma solidity ^0.4.11;

// BK Next 2 Ok
import "Administrable.sol";
import "GimliCrowdsale.sol";

/// @title Main Gimli contract.
// BK Ok
contract Gimli is GimliCrowdsale, Administrable {

    // BK Ok
    address public streamerContract;
    // BK Ok
    uint256 public streamerContractMaxAmount;

    // BK Ok
    event StreamerContractChanged(address newContractAddress, uint256 newMaxAmount);

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

    /// @notice authorize an address to transfer GIM on behalf an user
    /// @param _contractAddress Address of GimliStreamer contract
    /// @param _maxAmount The maximum amount that can be transfered by the contract
    // BK Ok - Only Administrator can execute
    function setStreamerContract(
        address _contractAddress,
        uint256 _maxAmount) onlyAdministrator
    {
        // To change the maximum amount you first have to reduce it to 0`
        // BK Ok
        require(_maxAmount == 0 || streamerContractMaxAmount == 0);

        // BK Next 2 Ok
        streamerContract = _contractAddress;
        streamerContractMaxAmount = _maxAmount;

        // BK Ok - Log event
        StreamerContractChanged(streamerContract, streamerContractMaxAmount);
    }

    /// @notice Called by a Gimli contract to transfer GIM
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _amount The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    // BK Ok
    function transferGIM(address _from, address _to, uint256 _amount) returns (bool success) {
        // BK Ok - Only assigned streamer contract can call this function
        require(msg.sender == streamerContract);
        // BK Ok - Calling streamer contract must pass the original account executing the tx
        require(tx.origin == _from);
        // BK Ok - Can only transfer amount below the "approved" amount
        require(_amount <= streamerContractMaxAmount);

        // BK Ok - Insufficient tokens or 0 transfer requested
        if (balances[_from] < _amount || _amount <= 0)
            return false;

        // BK Next 2 Ok
        balances[_from] = safeSub(balances[_from], _amount);
        balances[_to] = safeAdd(balances[_to], _amount);

        // BK Ok
        Transfer(_from, _to, _amount);

        // BK Ok
        return true;
    }



}

```
