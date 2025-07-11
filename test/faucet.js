const { expect } = require("chai");

describe("Faucet", function () {
    let Faucet, faucet, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        Faucet = await ethers.getContractFactory("Faucet");
        faucet = await Faucet.deploy();
        await faucet.waitForDeployment();

        // Send some ETH to faucet
        await owner.sendTransaction({
            to: faucet.target,
            value: ethers.parseEther("1.0"),
        });
    });

    it("should receive ETH", async function () {
        const balance = await ethers.provider.getBalance(faucet.target);
        expect(balance).to.equal(ethers.parseEther("1.0"));
    });

    it("should let user withdraw max 0.1 ETH", async function () {
        await faucet.connect(addr1).withdraw(ethers.parseEther("0.05"));
        const balance = await ethers.provider.getBalance(faucet.target);
        expect(balance).to.equal(ethers.parseEther("0.95"));
    });

    it("should fail if user tries to withdraw more than 0.1 ETH", async function () {
        await expect(
            faucet.connect(addr1).withdraw(ethers.parseEther("0.2"))
        ).to.be.revertedWith("Can't Withdraw more than 0.1 ETH");
    });

    it("should let owner withdraw all", async function () {
        await faucet.connect(owner).withdrawAll();
        const balance = await ethers.provider.getBalance(faucet.target);
        expect(balance).to.equal(0n);
    });

    it("should fail if non-owner tries to withdraw all", async function () {
        await expect(
            faucet.connect(addr1).withdrawAll()
        ).to.be.revertedWith("only owner can withdraw all funds");
    });
});
