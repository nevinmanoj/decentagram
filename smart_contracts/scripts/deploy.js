
const main=async() =>{
 


  const test = await hre.ethers.getContractFactory("chat");
  const lock = await test.deploy();

  await lock.deployed();
 console.log("test deployed to:",lock.address);
}


// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
const runMain=async()=>{
  try {
    await main();
    process.exit(0);
   
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  }

  runMain();