async function main() {
  const verifierContract = "ERC20Verifier";
  const verifierName = "ERC20Verifier";
  const verifierSymbol = "ERC20";
  const ERC20Verifier = await ethers.getContractFactory(verifierContract);
  const erc20Verifier = await ERC20Verifier.deploy();

  await erc20Verifier.deployed();
  console.log(verifierName, " tx hash:", erc20Verifier.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
