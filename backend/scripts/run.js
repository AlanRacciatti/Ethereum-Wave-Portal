const main = async () => {

    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Running first txn");
    let txn = await waveContract.wave("hey");
    txn = await txn.wait();
    
    console.log("Running second txn");
    txn = await waveContract.wave("hey");
    txn = await txn.wait();
    
    
    
    
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();