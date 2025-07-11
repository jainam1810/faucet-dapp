const hre = require("hardhat");

async function main() {
    const Faucet = await hre.ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    // ✅ New Ethers v6 style: wait for tx to be mined
    await faucet.waitForDeployment();

    console.log(`Faucet deployed to: ${faucet.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

