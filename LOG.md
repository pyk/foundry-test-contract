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

