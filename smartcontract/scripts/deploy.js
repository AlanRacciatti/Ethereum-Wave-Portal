const main = async () => {

    const [deployer] = await hre.ethers.getSigners();
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();

     await waveContract.deployed();

     console.log('WavePortal address: ', waveContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();