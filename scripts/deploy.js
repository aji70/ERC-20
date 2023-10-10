const { ethers } = require("hardhat");

async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy("My Token", "MTK", 1000000);
  await myToken.deployed();

  console.log("MyToken deployed to:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
