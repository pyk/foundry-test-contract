const axios = require('axios');
const sourceCode = require('./standard-json-input-remix.json')
const url = require('url');

const params = new url.URLSearchParams({
    apikey: 'XRRYBM2D4FJY9RE7ZDVA5VQF5BVUPV6993',
    module: 'contract',
    action: 'verifysourcecode',
    codeformat: "solidity-standard-json-input",
    contractaddress: '0xc1873d26677FF30Ed2B43861582EBf8da0b5d943',
    sourceCode: JSON.stringify(sourceCode),
    contractname: "contracts/Test.sol:ForgeDeploymentTest",
    compilerversion: "v0.8.10+commit.fc410830"
    });

axios.post('https://api-rinkeby.etherscan.io/api', params.toString())
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
