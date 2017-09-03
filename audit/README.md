# Gimli Token Contract Audit

Status: Work in progress

## Summary

`TODO`

Commits [18b26f3](https://github.com/thegimliproject/GimliToken/commit/18b26f346bc9a4e393e65f919736c55a210a1371),
[a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82) and
[baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c).

Target crowdsale commencement date Sep 16 2017

<br />

<hr />

## Table Of Contents

* [Summary](#summary)
* [Recommendations](#recommendations)
  * [Outstanding Recommendations](#outstanding-recommendations)
  * [Completed Recommendations](#completed-recommendations)
* [Code Review](#code-review)
* [References](#references)

<br />

<hr />

## Recommendations

### Outstanding Recommendations

* **LOW IMPORTANCE** There is a mix of `uint` and `uint256` across the different contracts. Use one or the other consistently
* **LOW IMPORTANCE** Increase the minimum Solidity version number from `^0.4.11` to `^0.4.16`. Review the bugfixes in
  the Solidity [releases](https://github.com/ethereum/solidity/releases) list to confirm your target version

<br />

### Completed Recommendations

* **HIGH IMPORTANCE** There is no minimum funding goal and no refunds that have to be provided back to the 
  crowdsale participants if the minimum funding goal is not reached. `GimliCrowdsale.function ()` should
  transfer any ethers it receives directly into the crowdsale wallet
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **HIGH IMPORTANCE** The ether to token calculation in `GimliCrowdsale.function()` needs to be fixed up from:

      uint256 quantity = safeMul(msg.value, CROWDSALE_PRICE);

  to:

      uint256 quantity = safeDiv(safeMul(msg.value, CROWDSALE_PRICE), 10**(18-uint256(decimals)));
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **HIGH IMPORTANCE** In *GimliToken*, `10**decimals` should be specified as `10**uint256(decimals)` to avoid the
  following error message:

      GimliToken.sol:36:36: Warning: Result of exponentiation has type uint8 and thus might overflow. Silence this warning by converting the literal to the expected type.
          uint256 public constant UNIT = 10**decimals;
                                         ^----------^
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **HIGH IMPORTANCE** Any changes to the `balances[...]` data should have an associated `Transfer(...)` event logged so
  the token explorers are able to take note of the changes in the balances. Areas that will need the `Transfer(...)`
  event code added to in *GimliCrowdsale* are `preAllocate(...)` and `releaseVesting(...)`
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **MEDIUM IMPORTANCE** `uint8 public decimals = {x}` should be defined in *GimliToken*
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **MEDIUM IMPORTANCE** `NAME` should be renamed to `name` in *GimliToken*
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **MEDIUM IMPORTANCE** `SYMBOL` should be renamed to `symbol` in *GimliToken*
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **MEDIUM IMPORTANCE** `ERC20Basic.transfer(...)` should have a `returns (bool success)` return code as defined in 
  the [ERC20](https://github.com/ethereum/EIPs/issues/20) standard. `GimliToken.transfer(...)` should 
  return true/false
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **MEDIUM IMPORTANCE** `ERC20.transferFrom(...)` should have a `returns (bool success)` return code as defined in 
  the [ERC20](https://github.com/ethereum/EIPs/issues/20) standard. `GimliToken.transferFrom(...)` should
  return true/false
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **MEDIUM IMPORTANCE** Consider adding a check to `GimliCrowdsale.closeCrowdsale()` to allow this function to be
  executed before the crowdsale ends if the crowdsale is sold out
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **MEDIUM IMPORTANCE** The current `GimliCrowdsale.transferAnyERC20Token(...)` should be renamed to `finalise()` or
  something similar to that
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **MEDIUM IMPORTANCE** Consider adding a function like [`transferAnyERC20Token(...)`](https://github.com/openanx/OpenANXToken/blob/master/contracts/OpenANXToken.sol#L454-L458)
  that allows the owner to extract any **non-Gimli** ERC20 tokens transferred to the crowdsale contract. Note that the
  crowdsale contract "parks" the tokens to be sold during the crowdsale at the contract address so this function should
  only be executable after the crowdsale has completed
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **MEDIUM IMPORTANCE** The owner of *Gimli* is set to `MULTISIG_WALLET_ADDRESS` in `Gimli()`. The code to set the owner
  to `msg.sender` in `Ownable.Ownable()` (now deleted) should be reverted. Keep the ownership of the contracts to 
  the deployment account, but send the ethers and tokens to `MULTISIG_WALLET_ADDRESS`
  * [x] Developer responded with 'The idea here is that all functions decorated with "onlyOwner" must be called from
    the multisig walllet. Because that the owner is not `msg.sender` here.'
* **MEDIUM IMPORTANCE** The current vesting unlock functionality pulls tokens out of thin air when the vesting period is
  passed. The vested tokens should be allocated to an account when the crowdsale is `finalise()`-ed, and unlocked into
  the appropriate accounts when the vesting period has passed. Otherwise the token explorers will not tally up the
  tokens correctly. See [LockedTokens.sol](https://github.com/openanx/OpenANXToken/blob/master/contracts/LockedTokens.sol)
  and [DevTokensHolder.sol](https://github.com/bokkypoobah/StatusNetworkTokenAudit/blob/master/contracts/DevTokensHolder.sol)
  for examples of locking tokens in a contract
  * [x] Developer responded with 'I prefer to keep things as simple as possible. To be ok with token explorer I used an
    unspendable address to store the vested amount.'
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **LOW IMPORTANCE** `event Transfer(...)` and `event Approval(...)` in *GimliToken* is already defined in *ERC20Basic*
  and *ERC20* respectively
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **LOW IMPORTANCE** Indentation should be consistently 4 spaces - see `GimliToken.allowance(...)`
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **LOW IMPORTANCE** The assignment `owner = msg.sender;` in `Gimli.Gimli()` is not required as the assignment is already
  done in `Ownable.Ownable()`, and *Gimli* is derived from *Ownable*
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **LOW IMPORTANCE** `GimliCrowdsale.withdrawalCrowdsale(...)` can be removed if `GimliCrowdsale.function ()` transfers
  the conributed ethers to the crowdsale wallet
  * [x] Fixed in [a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82)
* **LOW IMPORTANCE** Use the `acceptOwnership(...)` pattern in the *Ownable* contract to transfer ownership safely.
  See [example](https://github.com/openanx/OpenANXToken/blob/master/contracts/Owned.sol#L51-L55)
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **LOW IMPORTANCE** Move crowdsale related constants and variables from *GimliToken* to *GimliCrowdsale*. The only crowdsale
  information you need *GimliToken* is a status of whether the tokens are transferable. Create a `bool public transferable`
  in *GimliToken* and add `require(transferable)` instead of `require(block.number > CROWDSALE_END_BLOCK);`.
  In `GimliCrowdsale.closeCrowdsale()`, set `transferable = true;`
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **LOW IMPORTANCE** The crowdsale start and end dates are defined by start and stop blocknumbers. Consider using
  `block.timestamp` and compare these against the start and stop Unix timestamps. This provides potential participants
  more certainty of the start and end of the crowdsale
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **LOW IMPORTANCE** Incorrect comment in *Gimli*

      // `msg.sender` becomes the owner
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **LOW IMPORTANCE** `GimliToken.versoin` should be spelled `GimliToken.version` or `GimliToken.VERSION`
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **LOW IMPORTANCE** In *GimliToken*, the address `0xcac029186c773dbfc18402f464a3818e46541fba` should be specified in the
  checksummed format `0xcAc029186c773DbFc18402f464a3818e46541fbA` to avoid the following error message:

      GimliToken.sol:14:55: Warning: This looks like an address but has an invalid checksum. If this is not used as an address, please prepend '00'.
          address public constant MULTISIG_WALLET_ADDRESS = 0xcac029186c773dbfc18402f464a3818e46541fba; // TODO
                                                            ^----------------------------------------^
  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)
* **LOW IMPORTANCE** In *GimliToken*, a return status should be returned from the function `releaseVesting(...)`:

      GimliCrowdsale.sol:63:70: Warning: Unused local variable
          function releaseVesting(address _destination) onlyOwner returns (bool success) {
                                                                           ^----------^

  * [x] Fixed in [baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c)

<br />

<hr />

## Code Review

* [x] [code-review/SafeMath.md](code-review/SafeMath.md)
  * [x] contract SafeMath 
* [x] [code-review/Ownable.md](code-review/Ownable.md)
  * [x] contract Ownable 
* [x] [code-review/Administrable.md](code-review/Administrable.md)
  * [x] contract Administrable is Ownable 
* [x] [code-review/ERC20Basic.md](code-review/ERC20Basic.md)
  * [x] contract ERC20Basic 
* [x] [code-review/ERC20.md](code-review/ERC20.md)
  * [x] contract ERC20 is ERC20Basic 
* [x] [code-review/GimliToken.md](code-review/GimliToken.md)
  * [x] contract GimliToken is ERC20, SafeMath, Ownable 
* [ ] [code-review/GimliCrowdsale.md](code-review/GimliCrowdsale.md)
  * [ ] contract GimliCrowdsale is SafeMath, GimliToken 
* [ ] [code-review/GimliStreamers.md](code-review/GimliStreamers.md)
  * [ ] contract GimliStreamers is SafeMath, GimliToken, Administrable 
* [x] [code-review/Gimli.md](code-review/Gimli.md)
  * [x] contract Gimli is GimliStreamers, GimliCrowdsale 

<br />

<hr />

## References

* [Ethereum Contract Security Techniques and Tips](https://github.com/ConsenSys/smart-contract-best-practices)

<br />

<br />

Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd Sep 3 2017. The MIT Licence.