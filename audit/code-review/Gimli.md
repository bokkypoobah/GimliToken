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

    address public streamerContract;
    uint256 public streamerContractMaxAmount;

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
    function setStreamerContract(
        address _contractAddress,
        uint256 _maxAmount) onlyAdministrator
    {
        // To change the maximum amount you first have to reduce it to 0`
        require(_maxAmount == 0 || streamerContractMaxAmount == 0);

        streamerContract = _contractAddress;
        streamerContractMaxAmount = _maxAmount;

        StreamerContractChanged(streamerContract, streamerContractMaxAmount);
    }

    /// @notice Called by a Gimli contract to transfer GIM
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _amount The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferGIM(address _from, address _to, uint256 _amount) returns (bool success) {
        require(msg.sender == streamerContract);
        require(tx.origin == _from);
        require(_amount <= streamerContractMaxAmount);

        if (balances[_from] < _amount || _amount <= 0)
            return false;

        balances[_from] = safeSub(balances[_from], _amount);
        balances[_to] = safeAdd(balances[_to], _amount);

        Transfer(_from, _to, _amount);

        return true;
    }



}

```
