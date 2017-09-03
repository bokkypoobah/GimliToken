# GimliToken

Source file [../../sol/GimliToken.sol](../../sol/GimliToken.sol).

<br />

<hr />

```javascript
// BK NOTE - Consider using ^0.4.16
pragma solidity ^0.4.11;

// BK Next 3 Ok
import "SafeMath.sol";
import "ERC20.sol";
import "Ownable.sol";

/// @title Gimli Token Contract.
// BK Ok
contract GimliToken is ERC20, SafeMath, Ownable {


    /*************************
    **** Global variables ****
    *************************/

    // BK Ok
    uint8 public constant decimals = 8;
    // BK Ok
    string public constant name = "Gimli Token";
    // BK Ok
    string public constant symbol = "GIM";
    // BK Ok
    string public constant version = 'v1';

    /// total amount of tokens
    // BK Ok
    uint256 public constant UNIT = 10**uint256(decimals);
    // BK Ok
    uint256 constant MILLION_GML = 10**6 * UNIT; // can't use `safeMul` with constant
    /// Should include CROWDSALE_AMOUNT and VESTING_X_AMOUNT
    // BK Ok
    uint256 public constant TOTAL_SUPPLY = 150 * MILLION_GML; // can't use `safeMul` with constant;

    /// balances indexed by address
    // BK Ok
    mapping (address => uint256) balances;

    /// allowances indexed by owner and spender
    // BK Ok
    mapping (address => mapping (address => uint256)) allowed;

    // BK Ok
    bool transferable = false;

    /*********************
    **** Transactions ****
    *********************/


    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    // BK Ok
    function transfer(address _to, uint256 _value) returns (bool success) {
        // BK Ok
        require(transferable);

        // BK NOTE - _value can be == 0 but cannot be < 0 as it is an unsigned integer
        // BK Ok
        if (balances[msg.sender] < _value || _value <= 0)
            // BK Ok
            return false;

        // BK Ok
        balances[msg.sender] = safeSub(balances[msg.sender], _value);
        // BK Ok
        balances[_to] = safeAdd(balances[_to], _value);
        // BK Ok - Log event
        Transfer(msg.sender, _to, _value);

        // BK Ok
        return true;
    }

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    // BK Ok
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        // BK Ok
        require(transferable);

        // BK NOTE - _value can be == 0 but cannot be < 0 as it is an unsigned integer
        // BK Ok
        if (balances[_from] < _value || allowed[_from][msg.sender] < _value || _value <= 0)
            // BK Ok
            return false;
        // BK Ok
        balances[_from] = safeSub(balances[_from], _value);
        // BK Ok
        balances[_to] = safeAdd(balances[_to], _value);
        // BK Ok
        allowed[_from][msg.sender] = safeSub(allowed[_from][msg.sender], _value);
        // BK Ok - Log event
        Transfer(_from, _to, _value);

        // BK Ok
        return true;
    }

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    // BK Ok
    function approve(address _spender, uint256 _value) returns (bool success) {
        // To change the approve amount you first have to reduce the addresses`
        //  allowance to zero by calling `approve(_spender, 0)` if it is not
        //  already 0 to mitigate the race condition described here:
        //  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
        // BK Ok
        require((_value == 0) || (allowed[msg.sender][_spender] == 0));

        // BK Ok
        allowed[msg.sender][_spender] = _value;
        // BK Ok - Log event
        Approval(msg.sender, _spender, _value);
        // BK Ok
        return true;
    }

    /****************
    **** Getters ****
    ****************/

    /// @notice Get balance of an address
    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    // BK Ok
    function balanceOf(address _owner) constant returns (uint256 balance) {
        // BK Ok
        return balances[_owner];
    }

    /// @notice Get tokens allowed to spent by `_spender`
    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    // BK Ok
    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
        // BK Ok
        return allowed[_owner][_spender];
    }

}

```
