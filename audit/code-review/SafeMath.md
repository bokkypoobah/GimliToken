# SafeMath

Source file [../../sol/SafeMath.sol](../../sol/SafeMath.sol).

<br />

<hr />

```javascript
// BK NOTE - Consider using ^0.4.16
pragma solidity ^0.4.11;

// @title Math operations with safety checks
// BK Ok
contract SafeMath {
  // BK Ok
    function safeMul(uint a, uint b) internal returns (uint) {
        // BK Ok
        uint c = a * b;
        // BK Ok
        assert(a == 0 || c / a == b);
        // BK Ok
        return c;
    }

    // BK Ok
    function safeDiv(uint a, uint b) internal returns (uint) {
        // BK Ok
        assert(b > 0);
        // BK Ok
        uint c = a / b;
        // BK Ok
        assert(a == b * c + a % b);
        // BK Ok
        return c;
    }

    // BK Ok
    function safeSub(uint a, uint b) internal returns (uint) {
        // BK Ok
        assert(b <= a);
        // BK Ok
        return a - b;
    }

    // BK Ok
    function safeAdd(uint a, uint b) internal returns (uint) {
        // BK Ok
        uint c = a + b;
        // BK Ok
        assert(c>=a && c>=b);
        // BK Ok
        return c;
    }

    // BK Ok
    function max64(uint64 a, uint64 b) internal constant returns (uint64) {
        // BK Ok
        return a >= b ? a : b;
    }

    // BK Ok
    function min64(uint64 a, uint64 b) internal constant returns (uint64) {
        // BK Ok
        return a < b ? a : b;
    }

    // BK Ok
    function max256(uint256 a, uint256 b) internal constant returns (uint256) {
        // BK Ok
        return a >= b ? a : b;
    }

    // BK Ok
    function min256(uint256 a, uint256 b) internal constant returns (uint256) {
        // BK Ok
        return a < b ? a : b;
    }

}

```
