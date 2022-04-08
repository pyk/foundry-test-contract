const { ethers } = require("ethers");

const abi = [
    "function test() view returns (uint)"
];

const bytecode = "6080604052348015600f57600080fd5b50607780601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea26469706673582212207f7b89bdd7e632fb9101012c6e5e2a9d8fef8b27e172abb12fc98e1347a6adbb64736f6c634300080a0033";


(async () => {
    try {
        // Create signer first
        const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", 4);
        const signer = new ethers.Wallet("90a537dc9799040251fcdec3ea69ea043f6d0b245353039f16c2742bf2c8db56", provider);
        const factory = new ethers.ContractFactory(abi, bytecode, signer);
        const contract = await factory.deploy();
        await contract.deployTransaction.wait();
        console.log(contract);
        console.log('Deployment successful.');
        console.log('Address:', contract.address);
    } catch (e) {
        console.log(e.message)
    }
})()
