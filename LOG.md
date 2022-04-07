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
