# Gimli Token Contract Audit

Status: Work in progress

## Code Review

* [x] [code-review/SafeMath.md](code-review/SafeMath.md)
  * [x] contract SafeMath 
* [ ] [code-review/Ownable.md](code-review/Ownable.md)
  * [ ] contract Ownable 
* [ ] [code-review/Administrable.md](code-review/Administrable.md)
  * [ ] contract Administrable is Ownable 
* [ ] [code-review/ERC20Basic.md](code-review/ERC20Basic.md)
  * [ ] contract ERC20Basic 
* [ ] [code-review/ERC20.md](code-review/ERC20.md)
  * [ ] contract ERC20 is ERC20Basic 
* [ ] [code-review/GimliToken.md](code-review/GimliToken.md)
  * [ ] contract GimliToken is ERC20, SafeMath, Ownable 
* [ ] [code-review/GimliCrowdsale.md](code-review/GimliCrowdsale.md)
  * [ ] contract GimliCrowdsale is SafeMath, GimliToken 
* [ ] [code-review/GimliStreamers.md](code-review/GimliStreamers.md)
  * [ ] contract GimliStreamers is SafeMath, GimliToken, Administrable 
* [ ] [code-review/Gimli.md](code-review/Gimli.md)
  * [ ] contract Gimli is GimliStreamers, GimliCrowdsale 
