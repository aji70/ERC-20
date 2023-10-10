const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken Contract", function () {
  let MyToken;
  let myToken;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Deploy the MyToken contract
    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy("My Token", "MTK", 1000000);
    await myToken.deployed();
  });

  it("Should have the correct name and symbol", async function () {
    expect(await myToken.name()).to.equal("My Token");
    expect(await myToken.symbol()).to.equal("MTK");
  });

  it("Should mint new tokens", async function () {
    const initialBalance = await myToken.balanceOf(owner.address);
    await myToken.connect(owner).mint(addr1.address, 1000);

    const finalBalance = await myToken.balanceOf(addr1.address);

    expect(finalBalance.toNumber()).to.equal(initialBalance.toNumber() + 1000);
  });

  it("Should burn tokens", async function () {
    const initialBalance = await myToken.balanceOf(owner.address);
    await myToken.connect(owner).burn(1000);

    const finalBalance = await myToken.balanceOf(owner.address);

    expect(finalBalance.toNumber()).to.equal(initialBalance.toNumber() - 1000);
  });
});
