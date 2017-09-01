# GimliCrowdsale

Source file [../../sol/GimliCrowdsale.sol](../../sol/GimliCrowdsale.sol).

<br />

<hr />

```javascript
pragma solidity ^0.4.11;

import 'SafeMath.sol';
import "GimliToken.sol";

/// @title Gimli Crowdsale Contract.
contract GimliCrowdsale is SafeMath, GimliToken {

    /// @notice `msg.sender` invest `msg.value`
    // BK Ok - Default function, payable, receives the participant's contributions
    function() payable {
        // BK Ok - Participant must send non-zero value
        require(msg.value > 0);
        // check date
        // BK NOTE - The block times are increasing due to the "ice age" difficulty adjustment
        // BK NOTE - You many want to consider comparing `block.timestamp` to a start and end timestamp
        // BK Ok 
        require(block.number >= CROWDSALE_START_BLOCK && block.number <= CROWDSALE_END_BLOCK);

        // calculate and check quantity
        uint256 quantity = safeMul(msg.value, CROWDSALE_PRICE);
        if (safeSub(balances[this], quantity) < 0)
            return;

        // update balances
        balances[this] = safeSub(balances[this], quantity);
        balances[msg.sender] = safeAdd(balances[msg.sender], quantity);
        soldAmount = safeAdd(soldAmount, quantity);

        // BK Ok - Log event
        Transfer(this, msg.sender, quantity);
        // BK NOTE - Transfer `msg.value` directly to the wallet, e.g. `crowdsaleWallet.transfer(msg.value);`
    }

    /// @notice returns non-sold tokens to owner
    function closeCrowdsale() onlyOwner {
        // check date
        // BK NOTE - Consider adding a additional criteria to allow the crowdsale to be closed if the cap is reached
        // BK NOTE - This is when balances[this] == 0
        // BK Ok 
        require(block.number > CROWDSALE_END_BLOCK);

        // update balances
        // BK Ok
        uint256 unsoldQuantity = balances[this];
        // BK Ok - Transfer unsold tokens to the owner
        balances[owner] = safeAdd(balances[owner], unsoldQuantity);
        // BK Ok
        balances[this] = 0;

        // BK Ok
        Transfer(this, owner, unsoldQuantity);
    }

    /// @notice Send GML payments  to `_to`
    /// @param _to The withdrawal destination
    // BK NOTE - This function will be obsolete if the ethers are transferred directly to the crowdsale wallet 
    // BK NOTE - in the default function
    // BK Ok - Only owner can withdraw
    function withdrawalCrowdsale(address _to) onlyOwner {
        _to.transfer(this.balance);
    }

    /// @notice Pre-allocate tokens to advisor or partner
    /// @param _to The pre-allocation destination
    /// @param _value The amount of token to be allocated
    function preAllocate(address _to, uint256 _value) onlyOwner {
        require(block.number < CROWDSALE_START_BLOCK);

        balances[_to] = safeAdd(balances[_to], _value);
        balances[this] = safeSub(balances[this], _value);
        soldAmount = safeAdd(soldAmount, _value);
    }

    /// @notice Send vested amount to _destination
    /// @param _destination The address of the recipient
    /// @return Whether the release was successful or not
    function releaseVesting(address _destination) onlyOwner returns (bool success) {
        if (block.number > VESTING_1_BLOCK && vesting1Withdrawn == false) {
            balances[_destination] = safeAdd(balances[_destination], VESTING_1_AMOUNT);
            vesting1Withdrawn = true;
        }
        if (block.number > VESTING_2_BLOCK && vesting2Withdrawn == false) {
            balances[_destination] = safeAdd(balances[_destination], VESTING_2_AMOUNT);
            vesting2Withdrawn = true;
        }
    }
}

```
