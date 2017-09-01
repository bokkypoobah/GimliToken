# Gimli Token Contract Audit

Status: Work in progress

## Summary

`TODO`

<br />

<hr />

## Table Of Contents

* [Summary](#summary)
* [Recommendations](#recommendations)
* [Code Review](#code-review)

<br />

<hr />

## Recommendations

* **HIGH IMPORTANCE** There is no minimum funding goal and no refunds that have to be provided back to the 
  crowdsale participants if the minimum funding goal is not reached. `GimliCrowdsale.function ()` should
  transfer any ethers it receives directly into the crowdsale wallet
* **MEDIUM IMPORTANCE** `uint8 public decimals = {x}` should be defined in *GimliToken*
* **MEDIUM IMPORTANCE** `NAME` should be renamed to `name` in *GimliToken*
* **MEDIUM IMPORTANCE** `SYMBOL` should be renamed to `symbol` in *GimliToken*
* **MEDIUM IMPORTANCE** `ERC20Basic.transfer(...)` should have a `returns (bool success)` return code as defined in 
  the [ERC20](https://github.com/ethereum/EIPs/issues/20) standard. `GimliToken.transfer(...)` should 
  return true/false
* **MEDIUM IMPORTANCE** `ERC20.transferFrom(...)` should have a `returns (bool success)` return code as defined in 
  the [ERC20](https://github.com/ethereum/EIPs/issues/20) standard. `GimliToken.transferFrom(...)` should
  return true/false
* **MEDIUM IMPORTANCE** Consider adding a check to `GimliCrowdsale.closeCrowdsale()` to allow this function to be
  executed before the crowdsale ends if the crowdsale is sold out
* **MEDIUM IMPORTANCE** Consider adding a function like [`transferAnyERC20Token(...)`](https://github.com/openanx/OpenANXToken/blob/master/contracts/OpenANXToken.sol#L454-L458)
  that allows the owner to extract any ERC20 tokens transferred to the crowdsale contract. Note that the crowdsale
  contract "parks" the tokens to be sold during the crowdsale at the contract address
* **LOW IMPORTANCE** Use the `acceptOwnership(...)` pattern in the *Ownable* contract to transfer ownership safely.
  See [example](https://github.com/openanx/OpenANXToken/blob/master/contracts/Owned.sol#L51-L55)
* **LOW IMPORTANCE** `event Transfer(...)` and `event Approval(...)` in *GimliToken* is already defined in *ERC20Basic*
  and *ERC20* respectively
* **LOW IMPORTANCE** Indentation should be consistently 4 spaces - see `GimliToken.allowance(...)`
* **LOW IMPORTANCE** There is a mix of `uint` and `uint256` across the different contracts. Use one or the other consistently
* **LOW IMPORTANCE** Move crowdsale related constants and variables from *GimliToken* to *GimliCrowdsale*. The only crowdsale
  information you need *GimliToken* is a status of whether the tokens are transferable. Create a `bool public transferable`
  in *GimliToken* and add `require(transferable)` instead of `require(block.number > CROWDSALE_END_BLOCK);`.
  In *GimliCrowdsale.closeCrowdsale()`, set `transferable = true;`
* **LOW IMPORTANCE** The crowdsale start and end dates are defined by start and stop blocknumbers. Consider using
  `block.timestamp` and compare these against the start and stop Unix timestamps. This provides potential participants
  more certainty of the start and end of the crowdsale
* **LOW IMPORTANCE** The assignment `owner = msg.sender;` in `Gimli.Gimli()` is not required as the assignment is already
  done in `Ownable.Ownable()`, and *Gimli* is derived from *Ownable*
* **LOW IMPORTANCE** `GimliCrowdsale.withdrawalCrowdsale(...)` can be removed if `GimliCrowdsale.function ()` transfers
  the conributed ethers to the crowdsale wallet
* **LOW IMPORTANCE** Increase the minimum Solidity version number from ^0.4.11. Review the bugfixes in the Solidity
  [releases](https://github.com/ethereum/solidity/releases) list

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
