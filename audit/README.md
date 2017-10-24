# Gimli Token Contract Audit

## Summary

[Gimli](https://gimli.io/) intends to run a [token launch](https://gimli.io/token-launch/) commencing on September 16 2017.

Bok Consulting Pty Ltd was commissioned to perform an audit on the Ethereum smart contracts for Gimli's crowdsale.

This audit has been conducted on Gimli's source code in commits
[18b26f3](https://github.com/thegimliproject/GimliToken/commit/18b26f346bc9a4e393e65f919736c55a210a1371),
[a4f962f](https://github.com/thegimliproject/GimliToken/commit/a4f962f98672067ef0ff40c87d2d0ecbcd30ae82),
[baa8715](https://github.com/thegimliproject/GimliToken/commit/baa87152bf587c95c6d4dd2d96acca9db2bdc24c),
[5d0eeb2](https://github.com/thegimliproject/GimliToken/commit/5d0eeb2f83d4d12b2dcd9f2bb531da25f057650c),
[998029f](https://github.com/thegimliproject/GimliToken/commit/998029fa3c7debbbdc903873f407e3d11b9caaab),
[4dd9283](https://github.com/thegimliproject/GimliToken/commit/4dd9283f18536115cf618d185b384a13cb3403c5),
[8d450ed](https://github.com/thegimliproject/GimliToken/commit/8d450edc7007403b14902ad2c95cd1dd087e7f5f),
[ec5fe87](https://github.com/thegimliproject/GimliToken/commit/ec5fe879f350fcc7936dfb152ed1e9f711429c30),
[463c668](https://github.com/thegimliproject/GimliToken/commit/463c6686a526c6f1e29a53f9b0bcdbf15e95b355) and
[79a7b8a](https://github.com/thegimliproject/GimliToken/commit/79a7b8aecd66f57d5183b8b7563eeb124d96ce19).

No potential vulnerabilities have been identified in the crowdsale and token contract.

<br />

### Crowdsale Mainnet Addresses

The Gimli crowdsale contract has been deployed to `thegimliproject.eth` or [`0xaE4f56F072c34C0a65B3ae3E4DB797D831439D93`](https://etherscan.io/address/0xaE4f56F072c34C0a65B3ae3E4DB797D831439D93#code).

GIM token explorer [EtherScan.io](https://etherscan.io/token/0xaE4f56F072c34C0a65B3ae3E4DB797D831439D93) or [EthPlorer.io](https://ethplorer.io/address/0xae4f56f072c34c0a65b3ae3e4db797d831439d93#pageSize=100).

The crowdsale wallet is at [0xc79ab28c5c03f1e7fbef056167364e6782f9ff4f](https://etherscan.io/address/0xc79ab28c5c03f1e7fbef056167364e6782f9ff4f).

<br />

### Crowdsale Contract

The *Gimli* combined crowdsale/token contract will accept ethers (ETH) from Ethereum account transactions sent to the deployment address
of this contract.

ETH contributed by participants to the *Gimli* crowdsale contract will result in GIM tokens being allocated to the
participant's account in the token contract. The contributed ETHs are immediately transferred to the multisig wallet at
the `MULTISIG_WALLET_ADDRESS` address, reducing the risk of the loss of ETHs in this bespoke smart contract.

The crowdsale contract will generate `Transfer({crowdsale address}, participantAddress, tokens)` events during the crowdsale period and this
event is used by token explorers to recognise the token contract and to display the ongoing token transfers during the crowdsale period.

<br />

### Token Contract

The *GIM* token contract is combined with the crowdsale mechanism in the *Gimli* contract.

The token contract is [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md) compliant with the following features:

* `decimals` is correctly defined as `uint8` instead of `uint256`
* `transfer(...)` and `transferFrom(...)` will return *false* if there is insufficient balance to transfer or the transfer amount is 0 and
  *true* otherwise
* `transfer(...)` and `transferFrom(...)` have not been built with a check on the size of the data being passed (and this 
  check is not an effective check anyway)
* `approve(...)` requires that a non-zero approval limit be set to 0 before a new non-zero limit can be set

The *GIM* token contract has a `setStreamerContract(...)` function that will allow a contract account to transfer any account's *GIM* tokens
up to a specified maximum amount. This `setStreamerContract(...)` function can be called by Gimli administrators.

The `transferGIM(...)` function will allow the contract account specified by `setStreamerContract(...)` to deduct tokens for payments and
fees up to the specified maximum amount, but the transaction will have to be executed by the owner of the account the tokens are being
deducted from.

<br />

<hr />

## Table Of Contents

* [Summary](#summary)
  * [Crowdsale Mainnet Addresses](#crowdsale-mainnet-addresses)
  * [Crowdsale Contract](#crowdsale-contract)
  * [Token Contract](#token-contract)
* [Recommendations](#recommendations)
* [Potential Vulnerabilities](#potential-vulnerabilities)
* [Scope](#scope)
* [Limitations](#limitations)
* [Due Diligence](#due-diligence)
* [Risks](#risks)
* [Testing](#testing)
* [Code Review](#code-review)
* [References](#references)

<br />

<hr />

## Recommendations

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
* **LOW IMPORTANCE** There is a mix of `uint` and `uint256` across the different contracts. Use one or the other consistently
  * [x] Fixed in [5d0eeb2](https://github.com/thegimliproject/GimliToken/commit/5d0eeb2f83d4d12b2dcd9f2bb531da25f057650c)
* **LOW IMPORTANCE** Call `safeSub(...)` to reduce token balance from the source account before calling 
  `safeAdd(...)` to increase token balance for the destination account in *GimliToken* `preAllocate(...)` and
  `releaseVesting(...)`
  * [x] Fixed in [5d0eeb2](https://github.com/thegimliproject/GimliToken/commit/5d0eeb2f83d4d12b2dcd9f2bb531da25f057650c)
* **LOW IMPORTANCE** Set `GimliToken.transferable` to be public
  * [x] Fixed in [5d0eeb2](https://github.com/thegimliproject/GimliToken/commit/5d0eeb2f83d4d12b2dcd9f2bb531da25f057650c)
* **LOW IMPORTANCE** Can improve `GimliCrowdsale.transferOtherERC20Token(...)` by changing `require(tokenAddress != address(this));` to
  `require(tokenAddress != address(this) || transferable);`
  * [x] Fixed in [8d450ed](https://github.com/thegimliproject/GimliToken/commit/8d450edc7007403b14902ad2c95cd1dd087e7f5f)
* **LOW IMPORTANCE** In *Gimli*, `balances[MULTISIG_WALLET_ADDRESS] = safeAdd(balances[owner], TOTAL_SUPPLY - CROWDSALE_AMOUNT - VESTING_1_AMOUNT - VESTING_2_AMOUNT);`
  does not need the `safeAdd(balances[owner]...` or should be `safeAdd(balances[MULTISIG_WALLET_ADDRESS]...`
  * [x] Fixed in [8d450ed](https://github.com/thegimliproject/GimliToken/commit/8d450edc7007403b14902ad2c95cd1dd087e7f5f)
* **LOW IMPORTANCE** Increase the minimum Solidity version number from `^0.4.11` to `^0.4.16`. Review the bugfixes in
  the Solidity [releases](https://github.com/ethereum/solidity/releases) list to confirm your target version
  * [x] Gimli will leave the pragma compiler version as 0.4.11, but will deploy with a recent compiler version (check EtherScan)
* **MEDIUM IMPORTANCE** The locked wallet address for the vesting of tokens was accidentally changed to an account the
  project team has control of - in commit [6670411](https://github.com/thegimliproject/GimliToken/commit/667041178d3549f0cbc764feecdb351fd24489dd)
  * [x] Fixed in [ec5fe87](https://github.com/thegimliproject/GimliToken/commit/ec5fe879f350fcc7936dfb152ed1e9f711429c30)
* **LOW IMPORTANCE** The balance of unsold tokens will be moved into the owner account instead of the multisig account
  at the end of the crowdsale due to changes prior to commit [6670411](https://github.com/thegimliproject/GimliToken/commit/667041178d3549f0cbc764feecdb351fd24489dd)
  * [x] Fixed in [ec5fe87](https://github.com/thegimliproject/GimliToken/commit/ec5fe879f350fcc7936dfb152ed1e9f711429c30)

<br />

<hr />

## Potential Vulnerabilities

No potential vulnerabilities have been identified in the crowdsale and token contract.

<br />

<hr />

## Scope

This audit is into the technical aspects of the crowdsale contracts. The primary aim of this audit is to ensure that funds
contributed to these contracts are not easily attacked or stolen by third parties. The secondary aim of this audit is that
ensure the coded algorithms work as expected. This audit does not guarantee that that the code is bugfree, but intends to
highlight any areas of weaknesses.

<br />

<hr />

## Limitations

This audit makes no statements or warranties about the viability of the Gimli's business proposition, the individuals
involved in this business or the regulatory regime for the business model.

<br />

<hr />

## Due Diligence

As always, potential participants in any crowdsale are encouraged to perform their due diligence on the business proposition
before funding any crowdsales.

Potential participants are also encouraged to only send their funds to the official crowdsale Ethereum address, published on
the crowdsale beneficiary's official communication channel.

Scammers have been publishing phishing address in the forums, twitter and other communication channels, and some go as far as
duplicating crowdsale websites. Potential participants should NOT just click on any links received through these messages.
Scammers have also hacked the crowdsale website to replace the crowdsale contract address with their scam address.
 
Potential participants should also confirm that the verified source code on EtherScan.io for the published crowdsale address
matches the audited source code, and that the deployment parameters are correctly set, including the constant parameters.

<br />

<hr />

## Risks

* The risk of crowdsale funds getting stolen or hacked from the *Gimli* contract is low as the contributed funds are immediately
  transferred to an external multisig wallet.

<br />

<hr />

## Testing

### Test 1

The following functions were tested using the script [test/01_test1.sh](test/01_test1.sh) with the summary results saved
in [test/test1results.txt](test/test1results.txt) and the detailed output saved in [test/test1output.txt](test/test1output.txt):

* [x] Deploy *Gimli* crowdsale/token contract
* [x] Add preallocated tokens
* [x] Contribute to the crowdsale/token contract
* [x] Finalise the crowdsale after the end date, including generating the token allocations for the various stakeholders
* [x] `transfer(...)` and `transferFrom(...)` the *GIM* tokens
* [x] Release the 1 and 2 years vested *GIM* tokens

<br />

### Test 2

The following functions were tested using the script [test/02_test2.sh](test/02_test2.sh) with the summary results saved
in [test/test2results.txt](test/test2results.txt) and the detailed output saved in [test/test2output.txt](test/test2output.txt):

* [x] As in [Test 1](#test-1) above, but with the maximum funding being reached before the crowdsale end date, and the crowdsale
  being finalised early

<br />

Details of the testing environment can be found in [test](test).

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
* [x] [code-review/GimliCrowdsale.md](code-review/GimliCrowdsale.md)
  * [x] contract GimliCrowdsale is SafeMath, GimliToken
* [x] [code-review/Gimli.md](code-review/Gimli.md)
  * [x] contract Gimli is GimliCrowdsale, Administrable

<br />

<hr />

## References

* [Ethereum Contract Security Techniques and Tips](https://github.com/ConsenSys/smart-contract-best-practices)

<br />

<br />

Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd Sep 17 2017. The MIT Licence.