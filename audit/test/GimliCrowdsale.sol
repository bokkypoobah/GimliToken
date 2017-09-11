pragma solidity ^0.4.11;

import 'SafeMath.sol';
import "GimliToken.sol";
import "ERC20.sol";

/// @title Gimli Crowdsale Contract.
contract GimliCrowdsale is SafeMath, GimliToken {

    address public constant MULTISIG_WALLET_ADDRESS = 0xa22AB8A9D641CE77e06D98b7D7065d324D3d6976;
    address public constant LOCKED_ADDRESS = 0xabcdefabcdefabcdefabcdefabcdefabcdefabcd;

    // crowdsale
    uint256 public constant CROWDSALE_AMOUNT = 80 * MILLION_GML; // Should not include vested amount
    uint256 public constant START_DATE = 1505031781; // Sun 10 Sep 2017 08:23:01 UTC
    uint256 public constant END_DATE = 1505031871; // Sun 10 Sep 2017 08:24:31 UTC
    uint256 public constant CROWDSALE_PRICE = 700; // 700 GML / ETH
    uint256 public constant VESTING_1_AMOUNT = 15 * MILLION_GML; // TODO
    uint256 public constant VESTING_1_DATE = 1505031931; // Sun 10 Sep 2017 08:25:31 UTC
    uint256 public constant VESTING_2_AMOUNT = 15 * MILLION_GML; // TODO
    uint256 public constant VESTING_2_DATE = 1505031991; // Sun 10 Sep 2017 08:26:31 UTC
    bool public vesting1Withdrawn = false;
    bool public vesting2Withdrawn = false;
    bool public crowdsaleCanceled = false;
    uint256 public soldAmount; // GIM
    uint256 public paidAmount; // ETH

    /// @notice `msg.sender` invest `msg.value`
    function() payable {
        require(!crowdsaleCanceled);

        require(msg.value > 0);
        // check date
        require(block.timestamp >= START_DATE && block.timestamp <= END_DATE);

        // calculate and check quantity
        uint256 quantity = safeDiv(safeMul(msg.value, CROWDSALE_PRICE), 10**(18-uint256(decimals)));
        if (safeSub(balances[this], quantity) < 0)
            return;

        require(MULTISIG_WALLET_ADDRESS.send(msg.value));

        // update balances
        balances[this] = safeSub(balances[this], quantity);
        balances[msg.sender] = safeAdd(balances[msg.sender], quantity);
        soldAmount = safeAdd(soldAmount, quantity);
        paidAmount = safeAdd(paidAmount, msg.value);

        Transfer(this, msg.sender, quantity);
    }

    /// @notice returns non-sold tokens to owner
    function  closeCrowdsale() onlyOwner {
        // check if closable
        require(block.timestamp > END_DATE || crowdsaleCanceled || balances[this] == 0);

        // enable token transfer
        transferable = true;

        // update balances
        if (balances[this] > 0) {
            uint256 amount = balances[this];
            balances[owner] = safeAdd(balances[owner], amount);
            balances[this] = 0;
            Transfer(this, owner, amount);
        }
    }

    /// @notice Terminate the crowdsale before END_DATE
    function cancelCrowdsale() onlyOwner {
        crowdsaleCanceled = true;
    }

    /// @notice Pre-allocate tokens to advisor or partner
    /// @param _to The pre-allocation destination
    /// @param _value The amount of token to be allocated
    /// @param _price ETH paid for these tokens
    function preAllocate(address _to, uint256 _value, uint256 _price) onlyOwner {
        require(block.timestamp < START_DATE);

        balances[this] = safeSub(balances[this], _value);
        balances[_to] = safeAdd(balances[_to], _value);
        soldAmount = safeAdd(soldAmount, _value);
        paidAmount = safeAdd(paidAmount, _price);

        Transfer(this, _to, _value);
    }

    /// @notice Send vested amount to _destination
    /// @param _destination The address of the recipient
    /// @return Whether the release was successful or not
    function releaseVesting(address _destination) onlyOwner returns (bool success) {
        if (block.timestamp > VESTING_1_DATE && vesting1Withdrawn == false) {
            balances[LOCKED_ADDRESS] = safeSub(balances[LOCKED_ADDRESS], VESTING_1_AMOUNT);
            balances[_destination] = safeAdd(balances[_destination], VESTING_1_AMOUNT);
            vesting1Withdrawn = true;
            Transfer(LOCKED_ADDRESS, _destination, VESTING_1_AMOUNT);
            return true;
        }
        if (block.timestamp > VESTING_2_DATE && vesting2Withdrawn == false) {
            balances[LOCKED_ADDRESS] = safeSub(balances[LOCKED_ADDRESS], VESTING_2_AMOUNT);
            balances[_destination] = safeAdd(balances[_destination], VESTING_2_AMOUNT);
            vesting2Withdrawn = true;
            Transfer(LOCKED_ADDRESS, _destination, VESTING_2_AMOUNT);
            return true;
        }
        return false;
    }

    /// @notice transfer out any accidentally sent ERC20 tokens
    /// @param tokenAddress Address of the ERC20 contract
    /// @param amount The amount of token to be transfered
    function transferOtherERC20Token(address tokenAddress, uint256 amount)
      onlyOwner returns (bool success)
    {
        // can't be used for GIM token
        require(tokenAddress != address(this));
        return ERC20(tokenAddress).transfer(owner, amount);
    }
}
