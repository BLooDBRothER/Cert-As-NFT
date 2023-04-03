async function main() {
  // const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);
  // console.log("Account balance:", (await deployer.getBalance()).toString());

  
  // Get the ContractFactories and Signers here.
  const NFT = await ethers.getContractFactory("NFT");
  const Marketplace = await ethers.getContractFactory("Marketplace");
  // deploy contracts
  const marketplace = await Marketplace.deploy();
  const nft = await NFT.deploy();
  const txHash = nft.deployTransaction.hash
  const txReceipt = await ethers.provider.waitForTransaction(txHash)
  const contractAddress = txReceipt.contractAddress
  console.log("Contract deployed to address:", contractAddress)

  const txHash1 = marketplace.deployTransaction.hash
  const txReceipt1 = await ethers.provider.waitForTransaction(txHash1)
  const contractAddress1 = txReceipt1.contractAddress
  console.log("Contract deployed to address:", contractAddress1)
  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(marketplace , "Marketplace");
  saveFrontendFiles(nft , "NFT");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
