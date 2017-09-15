# GimliCrowdsale

Source file [../../sol/GimliCrowdsale.sol](../../sol/GimliCrowdsale.sol).

<br />

<hr />

```javascript
// BK NOTE - Consider using ^0.4.16
pragma solidity ^0.4.11;

// BK Next 3 Ok
import 'SafeMath.sol';
import "GimliToken.sol";
import "ERC20.sol";

/// @title Gimli Crowdsale Contract.
// BK Ok
contract GimliCrowdsale is SafeMath, GimliToken {

    // BK Next 2 Ok
    address public constant MULTISIG_WALLET_ADDRESS = 0xc79ab28c5c03f1e7fbef056167364e6782f9ff4f;
    address public constant LOCKED_ADDRESS = 0xABcdEFABcdEFabcdEfAbCdefabcdeFABcDEFabCD;

    // crowdsale
    // BK Ok
    uint256 public constant CROWDSALE_AMOUNT = 80 * MILLION_GML; // Should not include vested amount
    // BK Ok new Date(1505736000 * 1000).toUTCString() => "Mon, 18 Sep 2017 12:00:00 UTC"
    uint256 public constant START_DATE = 1505736000; //  (epoch timestamp)
    // BK Ok new Date(1508500800 * 1000).toUTCString() => "Fri, 20 Oct 2017 12:00:00 UTC"
    uint256 public constant END_DATE = 1508500800; // TODO (epoch timestamp)
    // BK Ok
    uint256 public constant CROWDSALE_PRICE = 700; // 700 GML / ETH
    // BK Ok
    uint256 public constant VESTING_1_AMOUNT = 15 * MILLION_GML; // TODO
    // BK Ok new Date(1537272000 * 1000).toUTCString() => "Tue, 18 Sep 2018 12:00:00 UTC"
    uint256 public constant VESTING_1_DATE = 1537272000; // TODO (epoch timestamp)
    // BK Ok
    uint256 public constant VESTING_2_AMOUNT = 15 * MILLION_GML; // TODO
    // BK Ok new Date(1568808000 * 1000).toUTCString() => "Wed, 18 Sep 2019 12:00:00 UTC"
    uint256 public constant VESTING_2_DATE = 1568808000; // TODO (epoch timestamp)
    // BK Next 2 Ok
    bool public vesting1Withdrawn = false;
    bool public vesting2Withdrawn = false;
    // BK Ok
    bool public crowdsaleCanceled = false;
    // BK Next 2 Ok
    uint256 public soldAmount; // GIM
    uint256 public paidAmount; // ETH

    /// @notice `msg.sender` invest `msg.value`
    // BK Ok - Default function, payable, receives the participant's contributions
    function() payable {
        // BK Ok
        require(!crowdsaleCanceled);

        // BK Ok - Participant must send non-zero value
        require(msg.value > 0);
        // check date
        // BK Ok 
        require(block.timestamp >= START_DATE && block.timestamp <= END_DATE);

        // calculate and check quantity
        // BK Ok
        uint256 quantity = safeDiv(safeMul(msg.value, CROWDSALE_PRICE), 10**(18-uint256(decimals)));
        // BK NOTE - Could be written as require(balances[this] >= quantity)
        // BK Ok
        require(safeSub(balances[this], quantity) >= 0);

        // BK Ok
        require(MULTISIG_WALLET_ADDRESS.send(msg.value));

        // update balances
        // BK Next 2 Ok
        balances[this] = safeSub(balances[this], quantity);
        balances[msg.sender] = safeAdd(balances[msg.sender], quantity);
        // BK Next 2 Ok
        soldAmount = safeAdd(soldAmount, quantity);
        paidAmount = safeAdd(paidAmount, msg.value);

        // BK Ok - Log event
        Transfer(this, msg.sender, quantity);
    }

    /// @notice returns non-sold tokens to owner
    // BK Ok - Only owner can execute
    function  closeCrowdsale() onlyOwner {
        // check if closable
        // BK Ok - Past end date, cancelled or crowdsale sold out
        require(block.timestamp > END_DATE || crowdsaleCanceled || balances[this] == 0);

        // enable token transfer
        // BK Ok
        transferable = true;

        // update balances
        // BK Ok
        if (balances[this] > 0) {
            // BK Ok
            uint256 amount = balances[this];
            // BK Ok - Transfer unsold tokens to the multisig
            balances[MULTISIG_WALLET_ADDRESS] = safeAdd(balances[MULTISIG_WALLET_ADDRESS], amount);
            // BK Ok
            balances[this] = 0;

            // BK Ok - Log event
            Transfer(this, MULTISIG_WALLET_ADDRESS, amount);
        }
    }

    /// @notice Terminate the crowdsale before END_DATE
    // BK Ok - Only owner can execute
    function cancelCrowdsale() onlyOwner {
        // BK Ok
        crowdsaleCanceled = true;
    }

    /// @notice Pre-allocate tokens to advisor or partner
    /// @param _to The pre-allocation destination
    /// @param _value The amount of token to be allocated
    /// @param _price ETH paid for these tokens
    // BK Ok
    function preAllocate(address _to, uint256 _value, uint256 _price) onlyOwner {
        // BK Ok
        require(block.timestamp < START_DATE);

        // BK Next 4 Ok
        balances[this] = safeSub(balances[this], _value);
        balances[_to] = safeAdd(balances[_to], _value);
        soldAmount = safeAdd(soldAmount, _value);
        paidAmount = safeAdd(paidAmount, _price);

        // BK Ok - Log event
        Transfer(this, _to, _value);
    }

    /// @notice Send vested amount to _destination
    /// @param _destination The address of the recipient
    /// @return Whether the release was successful or not
    // BK Ok - Only owner can execute
    function releaseVesting(address _destination) onlyOwner returns (bool success) {
        // BK Ok
        if (block.timestamp > VESTING_1_DATE && vesting1Withdrawn == false) {
            // BK Next 2 Ok
            balances[LOCKED_ADDRESS] = safeSub(balances[LOCKED_ADDRESS], VESTING_1_AMOUNT);
            balances[_destination] = safeAdd(balances[_destination], VESTING_1_AMOUNT);
            // BK Ok
            vesting1Withdrawn = true;
            // BK Ok - Log event
            Transfer(LOCKED_ADDRESS, _destination, VESTING_1_AMOUNT);
            // BK Ok
            return true;
        }
        if (block.timestamp > VESTING_2_DATE && vesting2Withdrawn == false) {
            // BK Next 2 Ok
            balances[LOCKED_ADDRESS] = safeSub(balances[LOCKED_ADDRESS], VESTING_2_AMOUNT);
            balances[_destination] = safeAdd(balances[_destination], VESTING_2_AMOUNT);
            // BK Ok
            vesting2Withdrawn = true;
            // BK Ok - Log event
            Transfer(LOCKED_ADDRESS, _destination, VESTING_2_AMOUNT);
            // BK Ok
            return true;
        }
        // BK Ok
        return false;
    }

    /// @notice transfer out any accidentally sent ERC20 tokens
    /// @param tokenAddress Address of the ERC20 contract
    /// @param amount The amount of token to be transfered
    // BK Ok - Only owner can execute
    function transferOtherERC20Token(address tokenAddress, uint256 amount)
      onlyOwner returns (bool success)
    {
        // can't be used for GIM token
        // BK Ok - This means GIM tokens can be accidentally locked in this token contract
        require(tokenAddress != address(this) || transferable);
        // BK Ok
        return ERC20(tokenAddress).transfer(owner, amount);
    }
}

```
