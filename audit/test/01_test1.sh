#!/bin/bash
# ----------------------------------------------------------------------------------------------
# Testing the smart contract
#
# Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2017. The MIT Licence.
# ----------------------------------------------------------------------------------------------

MODE=${1:-test}

GETHATTACHPOINT=`grep ^IPCFILE= settings.txt | sed "s/^.*=//"`
PASSWORD=`grep ^PASSWORD= settings.txt | sed "s/^.*=//"`

SOURCEDIR=`grep ^SOURCEDIR= settings.txt | sed "s/^.*=//"`

TOKENSOL=`grep ^TOKENSOL= settings.txt | sed "s/^.*=//"`
CROWDSALESOL=`grep ^CROWDSALESOL= settings.txt | sed "s/^.*=//"`
CROWDSALEJS=`grep ^CROWDSALEJS= settings.txt | sed "s/^.*=//"`

DEPLOYMENTDATA=`grep ^DEPLOYMENTDATA= settings.txt | sed "s/^.*=//"`

INCLUDEJS=`grep ^INCLUDEJS= settings.txt | sed "s/^.*=//"`
TEST1OUTPUT=`grep ^TEST1OUTPUT= settings.txt | sed "s/^.*=//"`
TEST1RESULTS=`grep ^TEST1RESULTS= settings.txt | sed "s/^.*=//"`

CURRENTTIME=`date +%s`
CURRENTTIMES=`date -r $CURRENTTIME -u`

BLOCKSINDAY=10

if [ "$MODE" == "dev" ]; then
  # Start time now
  STARTTIME=`echo "$CURRENTTIME" | bc`
else
  # Start time 1m 10s in the future
  STARTTIME=`echo "$CURRENTTIME+90" | bc`
fi
STARTTIME_S=`date -r $STARTTIME -u`
#BONUSONETIME=`echo "$CURRENTTIME+60*3" | bc`
#BONUSONETIME_S=`date -r $BONUSONETIME -u`
#BONUSTWOTIME=`echo "$CURRENTTIME+60*4" | bc`
#BONUSTWOTIME_S=`date -r $BONUSTWOTIME -u`
ENDTIME=`echo "$CURRENTTIME+60*5" | bc`
ENDTIME_S=`date -r $ENDTIME -u`

CURRENTBLOCK=`geth --exec "eth.blockNumber" attach $GETHATTACHPOINT`
STARTBLOCK=`echo "$CURRENTBLOCK+15" | bc`
ENDBLOCK=`echo "$CURRENTBLOCK+25" | bc`
VEST1BLOCK=`echo "$CURRENTBLOCK+35" | bc`
VEST2BLOCK=`echo "$CURRENTBLOCK+40" | bc`

printf "MODE            = '$MODE'\n" | tee $TEST1OUTPUT
printf "GETHATTACHPOINT = '$GETHATTACHPOINT'\n" | tee -a $TEST1OUTPUT
printf "PASSWORD        = '$PASSWORD'\n" | tee -a $TEST1OUTPUT
printf "SOURCEDIR       = '$SOURCEDIR'\n" | tee -a $TEST1OUTPUT
printf "TOKENSOL        = '$TOKENSOL'\n" | tee -a $TEST1OUTPUT
printf "CROWDSALESOL    = '$CROWDSALESOL'\n" | tee -a $TEST1OUTPUT
printf "CROWDSALEJS     = '$CROWDSALEJS'\n" | tee -a $TEST1OUTPUT
printf "DEPLOYMENTDATA  = '$DEPLOYMENTDATA'\n" | tee -a $TEST1OUTPUT
printf "INCLUDEJS       = '$INCLUDEJS'\n" | tee -a $TEST1OUTPUT
printf "TEST1OUTPUT     = '$TEST1OUTPUT'\n" | tee -a $TEST1OUTPUT
printf "TEST1RESULTS    = '$TEST1RESULTS'\n" | tee -a $TEST1OUTPUT
printf "CURRENTBLOCK    = '$CURRENTBLOCK'\n" | tee -a $TEST1OUTPUT
printf "STARTBLOCK      = '$STARTBLOCK'\n" | tee -a $TEST1OUTPUT
printf "ENDBLOCK        = '$ENDBLOCK'\n" | tee -a $TEST1OUTPUT
printf "VEST1BLOCK      = '$VEST1BLOCK'\n" | tee -a $TEST1OUTPUT
printf "VEST2BLOCK      = '$VEST2BLOCK'\n" | tee -a $TEST1OUTPUT
printf "CURRENTTIME     = '$CURRENTTIME' '$CURRENTTIMES'\n" | tee -a $TEST1OUTPUT
printf "STARTTIME       = '$STARTTIME' '$STARTTIME_S'\n" | tee -a $TEST1OUTPUT
printf "ENDTIME         = '$ENDTIME' '$ENDTIME_S'\n" | tee -a $TEST1OUTPUT

# Make copy of SOL file and modify start and end times ---
`cp $SOURCEDIR/*.sol .`

# --- Modify parameters ---
`perl -pi -e "s/0xcac029186c773dbfc18402f464a3818e46541fba/0xa22AB8A9D641CE77e06D98b7D7065d324D3d6976/" $TOKENSOL`
`perl -pi -e "s/10\*\*decimals/10\*\*uint256(decimals)/" $TOKENSOL`
`perl -pi -e "s/CROWDSALE_START_BLOCK \= 4278234;/CROWDSALE_START_BLOCK \= $STARTBLOCK;/" $TOKENSOL`
`perl -pi -e "s/CROWDSALE_END_BLOCK \= 4328345;/CROWDSALE_END_BLOCK \= $ENDBLOCK;/" $TOKENSOL`
`perl -pi -e "s/VESTING_1_BLOCK \= 5539673;/VESTING_1_BLOCK \= $VEST1BLOCK;/" $TOKENSOL`
`perl -pi -e "s/VESTING_2_BLOCK \= 6801113;/VESTING_2_BLOCK \= $VEST2BLOCK;/" $TOKENSOL`
`perl -pi -e "s/safeMul\(msg.value, CROWDSALE_PRICE\);/safeDiv\(safeMul\(msg.value, CROWDSALE_PRICE\), 10\*\*\(18-uint256\(decimals\)\)\);/" GimliCrowdsale.sol`

DIFFS1=`diff $SOURCEDIR/$TOKENSOL $TOKENSOL`
echo "--- Differences $SOURCEDIR/$TOKENSOL $TOKENSOL ---" | tee -a $TEST1OUTPUT
echo "$DIFFS1" | tee -a $TEST1OUTPUT

DIFFS1=`diff $SOURCEDIR/GimliCrowdsale.sol GimliCrowdsale.sol`
echo "--- Differences $SOURCEDIR/GimliCrowdsale.sol GimliCrowdsale.sol ---" | tee -a $TEST1OUTPUT
echo "$DIFFS1" | tee -a $TEST1OUTPUT

DIFFS1=`diff $SOURCEDIR/$CROWDSALESOL $CROWDSALESOL`
echo "--- Differences $SOURCEDIR/$CROWDSALESOL $CROWDSALESOL ---" | tee -a $TEST1OUTPUT
echo "$DIFFS1" | tee -a $TEST1OUTPUT

echo "var tokenOutput=`solc --optimize --combined-json abi,bin,interface $CROWDSALESOL`;" > $CROWDSALEJS

geth --verbosity 3 attach $GETHATTACHPOINT << EOF | tee -a $TEST1OUTPUT
loadScript("$CROWDSALEJS");
loadScript("functions.js");

var tokenAbi = JSON.parse(tokenOutput.contracts["$CROWDSALESOL:Gimli"].abi);
var tokenBin = "0x" + tokenOutput.contracts["$CROWDSALESOL:Gimli"].bin;

// console.log("DATA: tokenAbi=" + JSON.stringify(tokenAbi));
// console.log("DATA: tokenBin=" + JSON.stringify(tokenBin));

unlockAccounts("$PASSWORD");
printBalances();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var tokenMessage = "Deploy Crowdsale/Token Contract";
// -----------------------------------------------------------------------------
console.log("RESULT: " + tokenMessage);
var tokenContract = web3.eth.contract(tokenAbi);
// console.log(JSON.stringify(tokenContract));
var tokenTx = null;
var tokenAddress = null;

var token = tokenContract.new({from: contractOwnerAccount, data: tokenBin, gas: 6000000},
  function(e, contract) {
    if (!e) {
      if (!contract.address) {
        tokenTx = contract.transactionHash;
      } else {
        tokenAddress = contract.address;
        addAccount(tokenAddress, "Token '" + token.symbol() + "' '" + token.name() + "'");
        addTokenContractAddressAndAbi(tokenAddress, tokenAbi);
        console.log("DATA: tokenAddress=" + tokenAddress);
      }
    }
  }
);

while (txpool.status.pending > 0) {
}

printTxData("tokenAddress=" + tokenAddress, tokenTx);
printBalances();
failIfGasEqualsGasUsed(tokenTx, tokenMessage);
printTokenContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var preAllocMessage = "Add Preallocations";
// -----------------------------------------------------------------------------
console.log("RESULT: " + preAllocMessage);
var preAlloc1Tx = token.preAllocate(account3, "100000000000", {from: wallet, gas: 400000});
var preAlloc2Tx = token.preAllocate(account4, "1000000000000", {from: wallet, gas: 400000});
while (txpool.status.pending > 0) {
}
printTxData("preAlloc1Tx", preAlloc1Tx);
printTxData("preAlloc2Tx", preAlloc2Tx);
printBalances();
failIfGasEqualsGasUsed(preAlloc1Tx, preAllocMessage + " - ac3 1,000 GIM");
failIfGasEqualsGasUsed(preAlloc2Tx, preAllocMessage + " - ac4 10,000 GIM");
printTokenContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
// Wait until startBlock 
// -----------------------------------------------------------------------------
var startBlock = token.CROWDSALE_START_BLOCK();
console.log("RESULT: Waiting until startBlock #" + startBlock + " currentBlock=" + eth.blockNumber);
while (eth.blockNumber <= startBlock) {
}
console.log("RESULT: Waited until startBlock #" + startBlock + " currentBlock=" + eth.blockNumber);
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var sendContribution1Message = "Send Contribution";
// -----------------------------------------------------------------------------
console.log("RESULT: " + sendContribution1Message);
var sendContribution1Tx = eth.sendTransaction({from: account5, to: tokenAddress, gas: 400000, value: web3.toWei("10", "ether")});
while (txpool.status.pending > 0) {
}
printTxData("sendContribution1Tx", sendContribution1Tx);
printBalances();
failIfGasEqualsGasUsed(sendContribution1Tx, sendContribution1Message + " - ac5 10 ETH = 7,000 GIM");
printTokenContractDetails();
console.log("RESULT: ");


exit;

// -----------------------------------------------------------------------------
// Wait for crowdsale start, < BONUSONE_DATE
// tokensPerKEther = 3000000;
// -----------------------------------------------------------------------------
var startTime = token.START_DATE();
var startTimeDate = new Date(startTime * 1000);
console.log("RESULT: Waiting until startTime at " + startTime + " " + startTimeDate +
  " currentDate=" + new Date());
while ((new Date()).getTime() <= startTimeDate.getTime()) {
}
console.log("RESULT: Waited until startTime at " + startTime + " " + startTimeDate +
  " currentDate=" + new Date());
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var validContribution1Message = "Send Valid Contribution < BONUSONE_DATE";
// -----------------------------------------------------------------------------
console.log("RESULT: " + validContribution1Message);
var sendValidContribution1Tx = eth.sendTransaction({from: account5, to: tokenAddress, gas: 400000, value: web3.toWei("1", "ether")});
while (txpool.status.pending > 0) {
}
printTxData("sendValidContribution1Tx", sendValidContribution1Tx);
printBalances();
failIfGasEqualsGasUsed(sendValidContribution1Tx, validContribution1Message + " - ac5 1 ETH = 3,000 LOK");
printTokenContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
// Wait for BONUSONE_DATE, < BONUSTWO_DATE
// tokensPerKEther = 2700000;
// -----------------------------------------------------------------------------
var bonusOneTime = token.BONUSONE_DATE();
var bonusOneTimeDate = new Date(bonusOneTime * 1000);
console.log("RESULT: Waiting until bonusOneTime at " + bonusOneTime + " " + bonusOneTimeDate +
  " currentDate=" + new Date());
while ((new Date()).getTime() <= bonusOneTimeDate.getTime()) {
}
console.log("RESULT: Waited until bonusOneTime at " + bonusOneTime + " " + bonusOneTimeDate +
  " currentDate=" + new Date());
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var validContribution2Message = "Send Valid Contribution < BONUSTWO_DATE";
// -----------------------------------------------------------------------------
console.log("RESULT: " + validContribution2Message);
var sendValidContribution2Tx = eth.sendTransaction({from: account6, to: tokenAddress, gas: 400000, value: web3.toWei("10", "ether")});
while (txpool.status.pending > 0) {
}
printTxData("sendValidContribution2Tx", sendValidContribution2Tx);
printBalances();
failIfGasEqualsGasUsed(sendValidContribution2Tx, validContribution2Message + " - ac6 10 ETH = 27,000 LOK");
printTokenContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
// Wait for BONUSTWO_DATE, < END_DATE
// tokensPerKEther = 2400000;
// -----------------------------------------------------------------------------
var bonusTwoTime = token.BONUSTWO_DATE();
var bonusTwoTimeDate = new Date(bonusTwoTime * 1000);
console.log("RESULT: Waiting until bonusTwoTime at " + bonusTwoTime + " " + bonusTwoTimeDate +
  " currentDate=" + new Date());
while ((new Date()).getTime() <= bonusTwoTimeDate.getTime()) {
}
console.log("RESULT: Waited until bonusTwoTime at " + bonusTwoTime + " " + bonusTwoTimeDate +
  " currentDate=" + new Date());
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var validContribution3Message = "Send Valid Contribution, < END_DATE";
// -----------------------------------------------------------------------------
console.log("RESULT: " + validContribution3Message);
var sendValidContribution3Tx = eth.sendTransaction({from: account5, to: tokenAddress, gas: 400000, value: web3.toWei("11000", "ether")});
var sendValidContribution4Tx = eth.sendTransaction({from: account6, to: tokenAddress, gas: 400000, value: web3.toWei("100000", "ether")});
while (txpool.status.pending > 0) {
}
printTxData("sendValidContribution3Tx", sendValidContribution3Tx);
printTxData("sendValidContribution4Tx", sendValidContribution4Tx);
printBalances();
failIfGasEqualsGasUsed(sendValidContribution3Tx, validContribution3Message + " - ac5 11,000 ETH = 26,400,000 LOK");
failIfGasEqualsGasUsed(sendValidContribution4Tx, validContribution3Message + " - ac6 100,000 ETH = 240,000,000 LOK");
printTokenContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var finaliseMessage = "Finalise Crowdsale";
// -----------------------------------------------------------------------------
console.log("RESULT: " + finaliseMessage);
var finaliseTx = token.finalise({from: contractOwnerAccount, gas: 400000});
while (txpool.status.pending > 0) {
}
printTxData("finaliseTx", finaliseTx);
printBalances();
failIfGasEqualsGasUsed(finaliseTx, finaliseMessage);
printTokenContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var kycMessage = "KYC Account5";
// -----------------------------------------------------------------------------
console.log("RESULT: " + kycMessage);
var kycTx = token.kycVerify(account5, false, {from: contractOwnerAccount, gas: 400000});
while (txpool.status.pending > 0) {
}
printTxData("kycTx", kycTx);
printBalances();
failIfGasEqualsGasUsed(kycTx, kycMessage);
printTokenContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var moveTokenMessage = "Move Tokens After Crowdsale Finalised";
// -----------------------------------------------------------------------------
console.log("RESULT: " + moveTokenMessage);
var moveToken1Tx = token.transfer(account7, "1000000000000", {from: account3, gas: 100000});
var moveToken2Tx = token.approve(account8,  "30000000000000000", {from: account4, gas: 100000});
while (txpool.status.pending > 0) {
}
var moveToken3Tx = token.transferFrom(account4, account9, "30000000000000000", {from: account8, gas: 100000});
var moveToken4Tx = token.transfer(account8, "40000000000000000000", {from: account5, gas: 100000});
var moveToken5Tx = token.transfer(account9, "50000000000000000000", {from: account6, gas: 100000});
while (txpool.status.pending > 0) {
}
printTxData("moveToken1Tx", moveToken1Tx);
printTxData("moveToken2Tx", moveToken2Tx);
printTxData("moveToken3Tx", moveToken3Tx);
printTxData("moveToken4Tx", moveToken4Tx);
printTxData("moveToken5Tx", moveToken5Tx);
printBalances();
failIfGasEqualsGasUsed(moveToken1Tx, moveTokenMessage + " - transfer 0.000001 LOK ac3 -> ac7. CHECK for movement");
failIfGasEqualsGasUsed(moveToken2Tx, moveTokenMessage + " - approve 0.03 LOK ac4 -> ac8");
failIfGasEqualsGasUsed(moveToken3Tx, moveTokenMessage + " - transferFrom 0.03 LOK ac4 -> ac9. CHECK for movement");
failIfGasEqualsGasUsed(moveToken4Tx, moveTokenMessage + " - transfer 40 LOK ac5 KYC-ed -> ac8. CHECK for movement");
passIfGasEqualsGasUsed(moveToken5Tx, moveTokenMessage + " - transfer 50 LOK ac6 Not KYC-ed -> ac9. CHECK for NO movement");
printTokenContractDetails();
console.log("RESULT: ");


EOF
grep "DATA: " $TEST1OUTPUT | sed "s/DATA: //" > $DEPLOYMENTDATA
cat $DEPLOYMENTDATA
grep "RESULT: " $TEST1OUTPUT | sed "s/RESULT: //" > $TEST1RESULTS
cat $TEST1RESULTS
