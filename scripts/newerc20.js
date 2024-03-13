async function main() {

    const circuitId = "credentialAtomicQuerySigV2OnChain";
  
    const validatorAddress = "0x085523dF632FEaAE3Ae232E0EBc31FaC9956ddAb";
  
    const schemaHash = "131679619385363300511514831566924388058" // extracted from PID Platform
  
    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash))
  
  
    const query = {
      schema: ethers.BigNumber.from(schemaEnd),
      slotIndex: 2,
      operator: 3,
      value: [18, ...new Array(63).fill(0).map(i => 0)],
      circuitId,
    };
  
    // add the address of the contract just deployed
    ERC20VerifierAddress = "0x9B9AfF25825f7bc88dBEbD124236761BaF824560";
  
    let erc20Verifier = await hre.ethers.getContractAt("ERC20Verifier", ERC20VerifierAddress)
  
    try {
      await erc20Verifier.setZKPRequest(
        1,
        validatorAddress,
        query
      );
      console.log("Request set");
    } catch (e) {
      console.log("error: ", e);
    }
  }
  
  function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
  }
  
  function fromLittleEndian(bytes) {
    const n256 = BigInt(256);
    let result = BigInt(0);
    let base = BigInt(1);
    bytes.forEach((byte) => {
      result += base * BigInt(byte);
      base = base * n256;
    });
    return result;
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });