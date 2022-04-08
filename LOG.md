# Wallet

    0x31C618276f7A4dB1c01c22Eb56F44Fe1EdB1aF36
    90a537dc9799040251fcdec3ea69ea043f6d0b245353039f16c2742bf2c8db56

Do not sends any tokens to this address.

- [Wallet](https://rinkeby.etherscan.io/address/0x31c618276f7a4db1c01c22eb56f44fe1edb1af36)
- [Faucet](https://rinkebyfaucet.com/)


# 2021-04-08

    ✦ forge --version
    forge 0.2.0 (d513291 2022-04-07T18:27:22.910788+00:00)

    ✦ ~/.svm/0.8.13/solc-0.8.13 --version
    solc, the solidity compiler commandline interface
    Version: 0.8.13+commit.abaa5c0e.Darwin.appleclang


forge create on rinkeby

    forge create --rpc-url https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 \
        --private-key 90a537dc9799040251fcdec3ea69ea043f6d0b245353039f16c2742bf2c8db56 \
        --optimize \
        --optimize-runs 200 \
        src/ForgeDeploymentTest.sol:ForgeDeploymentTest

    [⠊] Compiling...
    Compiler run successful (with warnings)
    Warning: Return value of low-level calls not used.
    --> /Users/pyk/github/pyk/foundry-test-contract/lib/ds-test/src/test.sol:67:13:
    |
    67 |             HEVM_ADDRESS.call(
    |             ^ (Relevant source part starts here and spans across multiple lines).

    Deployer: 0x31c618276f7a4db1c01c22eb56f44fe1edb1af36
    Deployed to: 0xa8f40c0c221ec4d8516c092078cf2e55d5477386
    Transaction hash: 0xf87fa1065342657ffd68e3ee94573602979ead4761327c84f7f413a9baf9b0a9

forge verify contract on rinkeby

    forge verify-contract [OPTIONS] --compiler-version <COMPILER_VERSION> <ADDRESS> <CONTRACT> <ETHERSCAN_KEY>

    forge verify-contract --chain-id 4 \
        --compiler-version v0.8.13+commit.abaa5c0e \
        --num-of-optimizations 200 \
        0xa8f40c0c221ec4d8516c092078cf2e55d5477386 \
        src/ForgeDeploymentTest.sol:ForgeDeploymentTest \
        ETHERSCAN_KEY

    ✦ forge verify-check 8qmsrtgqrcns9jsylsz3x8q2vtipqw84upz1g3598rifxqw6ua ETHERSCAN_KEY
    Verification is pending...

    Error:
    0: Contract verification failed:
        Response: `NOTOK`
        Details: `Fail - Unable to verify`

    Location:
    cli/src/cmd/forge/verify.rs:162

    Backtrace omitted. Run with RUST_BACKTRACE=1 environment variable to display it.
    Run with RUST_BACKTRACE=full to include source snippets.

It seems that `forge create` and `forge verify` produce different bytecode.

Make sure that:

1. `solc` compiler is similar
2. `optimization` is similar

okee.

I try to run `forge build`

  "bytecode": {
    "object": "0x6080604052348015600f57600080fd5b50604e80601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea164736f6c634300080d000a",
    "sourceMap": "501:111:0:-:0;;;;;;;;;;;;;;;;;;;",
    "linkReferences": {}

  "deployedBytecode": {
    "object": "0x6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea164736f6c634300080d000a",
    "sourceMap": "501:111:0:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;536:74;601:2;536:74;;160:25:1;;;148:2;133:18;536:74:0;;;;;;",
    "linkReferences": {}

Why it is different?

    forge create --names --sizes --rpc-url https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 \
        --private-key 90a537dc9799040251fcdec3ea69ea043f6d0b245353039f16c2742bf2c8db56 \
        --optimize \
        --optimize-runs 200 \
        src/ForgeDeploymentTest.sol:ForgeDeploymentTest

need to delete cache first

    ✦ forge create --names --sizes --rpc-url https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 \
        --private-key 90a537dc9799040251fcdec3ea69ea043f6d0b245353039f16c2742bf2c8db56 \
        --optimize \
        --optimize-runs 200 \
        src/ForgeDeploymentTest.sol:ForgeDeploymentTest
    names: true
    sizes: true
    [⠊] Compiling...
    Compiler run successful (with warnings)
    Warning: Return value of low-level calls not used.
    --> /Users/pyk/github/pyk/foundry-test-contract/lib/ds-test/src/test.sol:67:13:
    |
    67 |             HEVM_ADDRESS.call(
    |             ^ (Relevant source part starts here and spans across multiple lines).



    compiler version: 0.8.10
        - DSTest
        - ContractTest
    compiler version: 0.8.13
        - ForgeDeploymentTest

    name             size (bytes)
    -----------------------------
    ContractTest         1031
    DSTest               605
    ForgeDeploymentTest  107

    Deployer: 0x31c618276f7a4db1c01c22eb56f44fe1edb1af36
    Deployed to: 0x85a138a11fe17a54fab2a4dc7f16d23790a53928
    Transaction hash: 0xe135be6727d20f546711c32ff2314d463cc05481aeaf3d8e5be4ac625ae8738e

Oke compiler version is correct. What about the optimization?

We need to check the ethers-solc Project Compile

this https://github.com/gakonst/foundry/blob/master/cli/src/compile.rs#L38

execute this https://github.com/gakonst/ethers-rs/blob/15305eb6f5c361d95614fd9c5b3d90c2e7d31425/ethers-solc/src/lib.rs#L207-L221

harus nulis debug disini https://github.com/gakonst/ethers-rs/blob/15305eb6f5c361d95614fd9c5b3d90c2e7d31425/ethers-solc/src/compile/project.rs#L242-L246

Local ethers patch turn on using latest version of ethers-solc

    forge create --names --sizes --rpc-url https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 \
        --private-key 90a537dc9799040251fcdec3ea69ea043f6d0b245353039f16c2742bf2c8db56 \
        --optimize \
        --optimize-runs 200 \
        src/ForgeDeploymentTest.sol:ForgeDeploymentTest

Optimization confignya dah bener

    ✦ forge create --names --sizes --rpc-url https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 \
            --private-key 90a537dc9799040251fcdec3ea69ea043f6d0b245353039f16c2742bf2c8db56 \
            --optimize \
            --optimize-runs 200 \
            src/ForgeDeploymentTest.sol:ForgeDeploymentTest
    names: true
    sizes: true
    [⠔] Compiling...solc config settings: Settings {
        stop_after: None,
        remappings: [],
        optimizer: Optimizer {
            enabled: Some(
                true,
            ),
            runs: Some(
                200,
            ),
            details: None,
        },
        metadata: Some(
            SettingsMetadata {
                use_literal_content: None,
                bytecode_hash: Some(
                    None,
                ),
            },
        ),
        output_selection: OutputSelection(
            {
                "*": {
                    "": [
                        "ast",
                    ],
                    "*": [
                        "abi",
                        "evm.bytecode",
                        "evm.deployedBytecode",
                        "evm.methodIdentifiers",
                    ],
                },
            },
        ),
        evm_version: Some(
            London,
        ),
        via_ir: None,
        libraries: {},
    }
    [⠒] Compiling...
    No files changed, compilation skipped
    Deployer: 0x31c618276f7a4db1c01c22eb56f44fe1edb1af36
    Deployed to: 0x7e40256b4b08ef8484d6d3ad70f75d25e1a5fb47
    Transaction hash: 0xe79c901858cde35371a2c3b4b0045c64e79fbb997c8a405683209e49f856d535

Optimization dah bener cuy

Wait ternyata ga support london cuy rinkeby

ternyata ga support london cuy arbiscannya.


Kita coba pake 0.8.10 ya

    ❯ forge create --names --sizes --rpc-url https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 \
        --private-key 90a537dc9799040251fcdec3ea69ea043f6d0b245353039f16c2742bf2c8db56 \
        --optimize \
        --optimize-runs 200 \
        src/ForgeDeploymentTest.sol:ForgeDeploymentTest
    names: true
    sizes: true
    [⠢] Compiling...solc config settings: Settings {
        stop_after: None,
        remappings: [],
        optimizer: Optimizer {
            enabled: Some(
                true,
            ),
            runs: Some(
                200,
            ),
            details: None,
        },
        metadata: Some(
            SettingsMetadata {
                use_literal_content: None,
                bytecode_hash: Some(
                    None,
                ),
            },
        ),
        output_selection: OutputSelection(
            {
                "*": {
                    "": [
                        "ast",
                    ],
                    "*": [
                        "abi",
                        "evm.bytecode",
                        "evm.deployedBytecode",
                        "evm.methodIdentifiers",
                    ],
                },
            },
        ),
        evm_version: Some(
            London,
        ),
        via_ir: None,
        libraries: {},
    }
    [⠆] Compiling...
    No files changed, compilation skipped
    Deployer: 0x31c618276f7a4db1c01c22eb56f44fe1edb1af36
    Deployed to: 0xdb2be5eb68a10a367027de66102edd04447ed383
    Transaction hash: 0x9b6a8d4cbafb837998121efaa1b2e493153df62b72c424e1dc54e0a2906fe82b

hasilnya juga sama, aku verify di etherscan juga gabisa padahal contract lain dengan versi yang sama bisa.
deployed bytecodenya beda kayanya

trying to debug this

    impl<'a, T: ArtifactOutput> PreprocessedState<'a, T> {
        /// advance to the next state by compiling all sources
        fn compile(self) -> Result<CompiledState<'a, T>> {
            let PreprocessedState { sources, cache, sparse_output } = self;
            println!("solc config settings: {:#?}", cache.project().solc_config.settings);
            println!("solc config paths: {:#?}", cache.project().paths);
            println!("sparse_output: {:#?}", sparse_output);
            println!("cache graph: {:#?}", cache.graph());
            let output = sources.compile(
                &cache.project().solc_config.settings,
                &cache.project().paths,
                sparse_output,
                cache.graph(),
            )?;

            Ok(CompiledState { output, cache })
        }
    }

but no information

    forge create --names --sizes --rpc-url https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 \
        --private-key 90a537dc9799040251fcdec3ea69ea043f6d0b245353039f16c2742bf2c8db56 \
        --optimize \
        --optimize-runs 200 \
        src/ForgeDeploymentTest.sol:ForgeDeploymentTest > forge.log

yg dibutuhin etherscan

    0x6080604052348015600f57600080fd5b50604e80601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea164736f6c634300080a000a

output dari compiler

    6080604052348015600f57600080fd5b50604e80601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea164736f6c634300080a000a

output dari compiler sama persis kenapa di etherscan error ya

    Sorry! The Compiled Contract ByteCode for '' does NOT match the Contract Creation Code for Address 0x3a5189fe4399e3f77c6f3cb345f5d6155c97e454.
    Unable to Verify Contract Source Code.

Rinkeby etherscan

    Compiler debug log:
    Note: Contract was created during TxHash# 0x2ca1bac911b2be7f54d1fbccc28a77bef26f46ea2dd0248bb0efe50ba780d30d
    Result: Does not match the input creation bytecode found at this address

    Sorry! The Compiled Contract ByteCode for '' does NOT match the Contract Creation Code for Address 0x3a5189fe4399e3f77c6f3cb345f5d6155c97e454.
    Unable to Verify Contract Source Code.


    Compiler Version: v0.8.10+commit.fc410830
    Optimization Enabled: True
    Runs: 200
    ByteCode (what we are looking for #3):
    0x6080604052348015600f57600080fd5b50604e80601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea164736f6c634300080a000a
    - vs what we got -
    Your Compiled Bytecode + Constructor Argument if any (what was provided after compilation):
    0x

tai lah

```json
{
    "language": "Solidity",
    "sources": {
        "/Users/pyk/github/pyk/foundry-test-contract/src/ForgeDeploymentTest.sol": {
            "content": "// ███████  ██████  ██████   ██████  ███████\n// ██      ██    ██ ██   ██ ██       ██\n// █████   ██    ██ ██████  ██   ███ █████\n// ██      ██    ██ ██   ██ ██    ██ ██\n// ██       ██████  ██   ██  ██████  ███████\n// SPDX-License-Identifier: UNLICENSED\npragma solidity 0.8.10;\n\ncontract ForgeDeploymentTest {\n    function test() external pure returns (uint256) {\n        return 42;\n    }\n}\n"
        }
    },
    "settings": {
        "remappings": [
            "src/=/Users/pyk/github/pyk/foundry-test-contract/src"
        ],
        "optimizer": {
            "enabled": true,
            "runs": 200
        },
        "evmVersion": "homestead",
        "metadata": {
            "useLiteralContent": true,
            "bytecodeHash": "none"
        },
        "outputSelection": {
            "*": {
                "*": [
                    "abi",
                    "evm.bytecode",
                    "evm.deployedBytecode",
                    "evm.methodIdentifiers"
                ],
                "": [
                    "ast",
                    "id"
                ]
            },
            "def": {
                "ForgeDeploymentTest": [ "abi", "evm.bytecode.opcodes" ]
            }
          }
    }
}
```

one last time try to use "ipfs"

    6080604052348015600f57600080fd5b50607780601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea2646970667358221220132bbffb6c666bb2676035f1310348aa6c1232b8a82bd394cd84ffc50023305164736f6c634300080a0033

etherscan

    0x6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea26469706673582212205292a5deafb3d0deef5cf0c8097191b5036e105e59846924df8c5faa09a4742064736f6c634300080a0033

etherscan

https://rinkeby.etherscan.io/address/0x60c9be8c7f6288edf37df974e827c07dbbdd7b54

    0x6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea26469706673582212205292a5deafb3d0deef5cf0c8097191b5036e105e59846924df8c5faa09a4742064736f6c634300080a0033

local

    ~/.svm/0.8.10/solc-0.8.10 --standard-json standard-json-input.json

    6080604052348015600f57600080fd5b50607780601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea2646970667358221220132bbffb6c666bb2676035f1310348aa6c1232b8a82bd394cd84ffc50023305164736f6c634300080a0033

local

    6080604052348015600f57600080fd5b50607780601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea26469706673582212209b6cc88936a7a457eda8bb8b631d0b7d5de0cb3c400002e893ffb4191c6d13a964736f6c634300080a0033

    6080604052348015600f57600080fd5b50607780601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea26469706673582212209b6cc88936a7a457eda8bb8b631d0b7d5de0cb3c400002e893ffb4191c6d13a964736f6c634300080a0033

bytehash ga ngefek kayanya?

## Deploy with ethers

Install ethers

    npm install ethers

javascript:

```js
const { ethers } = require("ethers");

const abi = [
    "function test() view returns (uint)"
];

const bytecode = "6080604052348015600f57600080fd5b50604e80601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063f8a8fd6d14602d575b600080fd5b602a60405190815260200160405180910390f3fea164736f6c634300080a000a";


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
```

result

    Deployment successful.
    Address: 0x114025c788BE8F9e9B729182Fb75113bBF70dFC0

Ternyata tetep gabisa cuy pake solc dan ethers

Remix is succesfully verified lmewo

https://rinkeby.etherscan.io/address/0x0ad6baf01c4b663de5e7fc5d517ae66678089e2b#code

Oke creating `standard-input-json-remix.json` and `standard-output-json-remix.json`.


    Deployment successful.
    Address: 0x6b150A6457Bf4b904b0b20E2D1CADD6b226D963F

Deploying with ethers.

Intinya etherscan ga error, lu aja yang error bay wkwk

- Deployed with Remix https://rinkeby.etherscan.io/address/0xc1873d26677ff30ed2b43861582ebf8da0b5d943
- Verify contract via web using single file error
- Verify contract via web using multi-json error
- Verify contract via API using multi-json OK

Submit via API berhasil dengan `standard-json-input-remix.json` mantapp.

https://rinkeby.etherscan.io/sourcecode-demo.html

https://rinkeby.etherscan.io/address/0xc1873d26677ff30ed2b43861582ebf8da0b5d943#code

mantaapp

## Standard Input JSON via Foundry

Step by step:

1. `forge verify-contract` executed
2. Create `solidity-standard-json-input`
3. Request to etherscan API using provided input

