var gimli_sol_gimliContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"CROWDSALE_START_BLOCK","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"VESTING_2_AMOUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_streamerAddress","type":"address"},{"name":"_contractAddress","type":"address"}],"name":"getContractPermissions","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_adminAddress","type":"address"}],"name":"removeAdministrators","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_streamerAddress","type":"address"},{"name":"_contractAddress","type":"address"},{"name":"_streamerFeesPpm","type":"uint256"},{"name":"_gimliFeesPpm","type":"uint256"},{"name":"_maxAmount","type":"uint256"}],"name":"authorizeStreamer","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"VESTING_1_AMOUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"vesting2Withdrawn","outputs":[{"name":"","type":"bool"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"vesting1Withdrawn","outputs":[{"name":"","type":"bool"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"administrators","outputs":[{"name":"","type":"bool"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TOTAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_adminAddress","type":"address"}],"name":"addAdministrators","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"closeCrowdsale","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"UNIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NAME","outputs":[{"name":"","type":"string"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CROWDSALE_PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_streamerAddress","type":"address"},{"name":"_userAddress","type":"address"},{"name":"_amount","type":"uint256"}],"name":"claimGMLFees","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_streamerAddress","type":"address"}],"name":"isAuthorizedStreamer","outputs":[{"name":"","type":"bool"}],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"VESTING_1_BLOCK","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CROWDSALE_END_BLOCK","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_destination","type":"address"}],"name":"releaseVesting","outputs":[{"name":"success","type":"bool"}],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_streamerAddress","type":"address"},{"name":"_userAddress","type":"address"},{"name":"_amount","type":"uint256"}],"name":"escrowGML","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"VESTING_2_BLOCK","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"preAllocate","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"SYMBOL","outputs":[{"name":"","type":"string"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CROWDSALE_AMOUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"soldAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"statemutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_streamerAddress","type":"address"}],"name":"revokeStreamer","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"withdrawalCrowdsale","outputs":[],"payable":false,"statemutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"string"}],"payable":false,"statemutability":"view","type":"function"},{"inputs":[],"payable":false,"statemutability":"nonpayable","type":"constructor"},{"payable":true,"statemutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"streamerAddress","type":"address"},{"indexed":true,"name":"contractAddress","type":"address"},{"indexed":false,"name":"maxAmount","type":"uint256"}],"name":"StreamerAuthorized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"streamerAddress","type":"address"}],"name":"StreamerRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"adminAddress","type":"address"}],"name":"AdminstratorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"adminAddress","type":"address"}],"name":"AdminstratorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]);
var gimli_sol_gimli = gimli_sol_gimliContract.new({
    from: web3.eth.accounts[0],
    data: '0x60606040526000600160146101000a81548160ff0219169083151502179055506000600160156101000a81548160ff02191690831515021790555034156200004657600080fd5b5b5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000160600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546305f5e100620f424002600a026305f5e100620f424002600a026305f5e100620f4240026050026305f5e100620f4240026096020303036200020d6401000000000262000e56176401000000009004565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506305f5e100620f424002605002600360003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506305f5e100620f4240026096026000819055505b6200023a565b6000808284019050838110158015620002265750828110155b15156200022f57fe5b8091505b5092915050565b612ea3806200024a6000396000f300606060405236156101cb576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630232b58c146103f4578063095ea7b31461041d57806318160ddd1461047757806323b872dd146104a05780632e84bed8146105015780633bc2e83a1461052a5780633dde3918146105a45780635b6093fc146105dd5780636d0769661461065057806370a0823114610679578063717fecea146106c657806375ad31a0146106f357806376be1585146107205780638da5cb5b14610771578063902d55a5146107c657806393cd22b8146107ef578063983c0a01146108285780639d8e21771461083d578063a3f4df7e14610866578063a86416e2146108f5578063a9059cbb1461091e578063b5976eb414610960578063c6f4e053146109c1578063cc42532e14610a12578063cd28a0d114610a3b578063d486d12914610a64578063dd62ed3e14610ab5578063e4bc0d9614610b21578063edbbe29814610b82578063f04efbe714610bab578063f2fde38b14610bed578063f76f8d7814610c26578063f997732914610cb5578063fa1a5f5914610cde578063fcf54d2214610d07578063ff6b8a6214610d40578063ffa1ad7414610d79575b5b600080341115156101dc57600080fd5b624147da43101580156101f2575062420b994311155b15156101fd57600080fd5b610209346102bc610e08565b90506000610256600360003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205483610e3c565b1015610261576103f1565b6102aa600360003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e3c565b600360003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610336600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e56565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061038560025482610e56565b6002819055503373ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35b50005b34156103ff57600080fd5b610407610e81565b6040518082815260200191505060405180910390f35b341561042857600080fd5b61045d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610e88565b604051808215151515815260200191505060405180910390f35b341561048257600080fd5b61048a611010565b6040518082815260200191505060405180910390f35b34156104ab57600080fd5b6104ff600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611016565b005b341561050c57600080fd5b61051461138e565b6040518082815260200191505060405180910390f35b341561053557600080fd5b610580600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061139e565b60405180848152602001838152602001828152602001935050505060405180910390f35b34156105af57600080fd5b6105db600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611443565b005b34156105e857600080fd5b61064e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091908035906020019091908035906020019091905050611556565b005b341561065b57600080fd5b61066361174e565b6040518082815260200191505060405180910390f35b341561068457600080fd5b6106b0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061175e565b6040518082815260200191505060405180910390f35b34156106d157600080fd5b6106d96117a8565b604051808215151515815260200191505060405180910390f35b34156106fe57600080fd5b6107066117bb565b604051808215151515815260200191505060405180910390f35b341561072b57600080fd5b610757600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506117ce565b604051808215151515815260200191505060405180910390f35b341561077c57600080fd5b6107846117ee565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156107d157600080fd5b6107d9611814565b6040518082815260200191505060405180910390f35b34156107fa57600080fd5b610826600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611824565b005b341561083357600080fd5b61083b611940565b005b341561084857600080fd5b610850611b92565b6040518082815260200191505060405180910390f35b341561087157600080fd5b610879611b9a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156108ba5780820151818401525b60208101905061089e565b50505050905090810190601f1680156108e75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561090057600080fd5b610908611bd3565b6040518082815260200191505060405180910390f35b341561092957600080fd5b61095e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611bd9565b005b341561096b57600080fd5b6109bf600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611dc4565b005b34156109cc57600080fd5b6109f8600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506122f8565b604051808215151515815260200191505060405180910390f35b3415610a1d57600080fd5b610a25612352565b6040518082815260200191505060405180910390f35b3415610a4657600080fd5b610a4e612359565b6040518082815260200191505060405180910390f35b3415610a6f57600080fd5b610a9b600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612360565b604051808215151515815260200191505060405180910390f35b3415610ac057600080fd5b610b0b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061257f565b6040518082815260200191505060405180910390f35b3415610b2c57600080fd5b610b80600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050612607565b005b3415610b8d57600080fd5b610b95612925565b6040518082815260200191505060405180910390f35b3415610bb657600080fd5b610beb600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061292c565b005b3415610bf857600080fd5b610c24600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612ac9565b005b3415610c3157600080fd5b610c39612ba2565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610c7a5780820151818401525b602081019050610c5e565b50505050905090810190601f168015610ca75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3415610cc057600080fd5b610cc8612bdb565b6040518082815260200191505060405180910390f35b3415610ce957600080fd5b610cf1612beb565b6040518082815260200191505060405180910390f35b3415610d1257600080fd5b610d3e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612bf1565b005b3415610d4b57600080fd5b610d77600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612d44565b005b3415610d8457600080fd5b610d8c612dfc565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610dcd5780820151818401525b602081019050610db1565b50505050905090810190601f168015610dfa5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60008082840290506000841480610e295750828482811515610e2657fe5b04145b1515610e3157fe5b8091505b5092915050565b6000828211151515610e4a57fe5b81830390505b92915050565b6000808284019050838110158015610e6e5750828110155b1515610e7657fe5b8091505b5092915050565b624147da81565b600080821480610f1457506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054145b1515610f1f57600080fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a3600190505b92915050565b60005481565b62420b994311151561102757600080fd5b80600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410806110ef575080600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054105b806110fb575060008111155b1561110557611389565b61114e600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e3c565b600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506111da600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e56565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506112a3600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e3c565b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35b505050565b6305f5e100620f424002600a0281565b600080600080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000154816001015482600201549350935093505b509250925092565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561149f57600080fd5b600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff02191690557f229460e7e71cb0f5fd51f3ef9f4a1c8aec5a2039ca102291844e55e7b6e20a2181604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b5b50565b600080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16806115fe57503373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b151561160957600080fd5b6103e86116168686610e56565b14151561162257600080fd5b600660008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160010160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060018260000160006101000a81548160ff0219169083151502179055508481600001819055508381600101819055508281600201819055508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167ff9930862a491dad6643431cbe396b3081ca3e4e6b6834928817f6b80f2a9164a856040518082815260200191505060405180910390a35b5b50505050505050565b6305f5e100620f424002600a0281565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b600160159054906101000a900460ff1681565b600160149054906101000a900460ff1681565b60056020528060005260406000206000915054906101000a900460ff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6305f5e100620f42400260960281565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561188057600080fd5b6001600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507f8bcad96a272856281cdab9315e972c6c9c48a2f3cb957fec38c355b0c3afb2c181604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b5b50565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561199e57600080fd5b62420b99431115156119af57600080fd5b600360003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050611a5c60036000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e56565b60036000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600360003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35b5b50565b6305f5e10081565b6040805190810160405280600b81526020017f47696d6c6920546f6b656e00000000000000000000000000000000000000000081525081565b6102bc81565b62420b9943111515611bea57600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541080611c38575060008111155b15611c4257611dc0565b611c8b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e3c565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611d17600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e56565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35b5050565b60008060008585856000600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff161515611e2957600080fd5b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508181600201541015611ebb576122ec565b6103e8611ed082600101548360000154610e56565b141515611ed957fe5b8273ffffffffffffffffffffffffffffffffffffffff163273ffffffffffffffffffffffffffffffffffffffff16141515611f1357600080fd5b87600360008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015611f5f576122eb565b600660008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209650611ff9611ff188600101548a610e08565b6103e8612e35565b955061201461200c88600001548a610e08565b6103e8612e35565b945061205f600360008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205489610e3c565b600360008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061210d60036000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205487610e56565b60036000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506121bb600360008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205486610e56565b600360008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef886040518082815260200191505060405180910390a38973ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef876040518082815260200191505060405180910390a35b5b50505050505050505050565b6000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1690505b919050565b624c4b4081565b62420b9981565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156123be57600080fd5b624c4b40431180156123e3575060001515600160149054906101000a900460ff161515145b1561249b5761243d600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546305f5e100620f424002600a02610e56565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060018060146101000a81548160ff0219169083151502179055505b625b8d80431180156124c0575060001515600160159054906101000a900460ff161515145b156125785761251a600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546305f5e100620f424002600a02610e56565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060018060156101000a81548160ff0219169083151502179055505b5b5b919050565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b92915050565b8282826000600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff16151561266757600080fd5b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905081816002015410156126f95761291c565b6103e861270e82600101548360000154610e56565b14151561271757fe5b8273ffffffffffffffffffffffffffffffffffffffff163273ffffffffffffffffffffffffffffffffffffffff1614151561275157600080fd5b84600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561279d5761291b565b6127e6600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205486610e3c565b600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550612872600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205486610e56565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef876040518082815260200191505060405180910390a35b5b50505050505050565b625b8d8081565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561298857600080fd5b624147da4310151561299957600080fd5b6129e2600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e56565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550612a6e600360003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610e3c565b600360003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550612abd60025482610e56565b6002819055505b5b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612b2557600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515612b9d5780600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b5b50565b6040805190810160405280600381526020017f47494d000000000000000000000000000000000000000000000000000000000081525081565b6305f5e100620f42400260500281565b60025481565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680612c9657503373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b1515612ca157600080fd5b6000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f8a7b5b737125cede813d8e0dc4c0ce856f06f0d937badf9beea31371c21f98d460405160405180910390a25b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612da057600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f193505050501515612df757600080fd5b5b5b50565b6040805190810160405280600281526020017f763100000000000000000000000000000000000000000000000000000000000081525081565b600080600083111515612e4457fe5b8284811515612e4f57fe5b0490508284811515612e5d57fe5b068184020184141515612e6c57fe5b8091505b50929150505600a165627a7a723058209e6a2ea991244e60c2ca8b75fa144586068647a2d6a2a8fa0f5d30da7cba90ad0029',
    gas: '4700000'
}, function (e, contract) {
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
});