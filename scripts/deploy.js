const hre = require("hardhat");


async function main() {
    // Get the contract to deploy
    const BuyMeAChai = await hre.ethers.getContractFactory("BuyMeAChai");
    const buyMeAChai = await BuyMeAChai.deploy();
    await buyMeAChai.deployed();
    console.log("BuyMeAChai deployed to ", buyMeAChai.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
