// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

// Returns the Ether balance of a given address
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance:`, await getBalance(address));
    idx++;
  }
}

// Logs the memos store on-chain from chai purchases.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}

async function main() {
  // Get example account
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // Get the contract to deploy
  const BuyMeAChai = await hre.ethers.getContractFactory("BuyMeAChai");
  const buyMeAChai = await BuyMeAChai.deploy();
  await buyMeAChai.deployed();
  console.log("BuyMeAChai deployed to ", buyMeAChai.address);

  // Check balances before the chai purchase.
  const addresses = [owner.address, tipper.address, buyMeAChai.address];
  console.log("== Start ==");
  await printBalances(addresses);

  // Buy the owner a few coffees.

  // Check balances after coffee purchase.

  // Withdraw funds.

  // Check balance after withdraw.

  // Read all the memos left for the owner.
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
