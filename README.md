# Ethereum Wave Portal
#### [Link to the project](https://chin-wave-project.web.app/)

### Welcome!
This is a project working with solidity and ethers.js to make a portal that allows user to write a message in the blockchain, including the address which wrote it and a timestamp. At first you'll can see two folders, the first one is the backend with the smart contract and the second one the react app, feel free to check them both :)

### Portal preview
#
<img src="https://res.cloudinary.com/libreria-hedwig/image/upload/v1642556479/Captura_muy0re.png" width="800" />

## Frontend

### Installation and usage

Use the package manager [npm](https://www.npmjs.com/) to install the frontend

```bash
npm install
```

Then you can just run the project

```bash
npm start
```
### Support

If you want to run your own contract in this app you need to do 2 things:

- Change the CONTRACT_ADDRESS in the ContractAddress.json file:

```json
{
    "ContractAddress": "0x64F5531a917D58A0fed87bE1DD9F9C9226933068"
}
```
- Update the JSON  in the **Utils** folder (you get this from your artifacts folder of the smart contract).
## Backend
### Installation and usage
As before use the package manager [npm](https://www.npmjs.com/) to install the frontend
```bash
npm install
```
First of all you have to make the **.env** file, as you can see in the hardhat.config.js file, there are some env variables:
```javascript
require('dotenv').config();
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: process.env.PROD_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
```
To get the url I've used [Alchemy](https://www.alchemy.com/), it's basically an Ethereum API for interacting with the rinkeby (in this case) network. Then you can access to your private key in whatever wallet you're using, I use [Metamask](https://metamask.io/). Remember **NEVER** sharing your private key because you can get hacked. 
Your .env file should like this: 
```
PROD_ALCHEMY_KEY='Your alchemy key'
PRIVATE_KEY='Your private key'
```

### Scripts
Once you have done all this stuff you can start your project. In the **Scripts** folder you will see two files: run.js and deploy.js, with the first one I make the tests and with the deploy file I (you won't believe it) deploy it.
#### Run.js
```bash
npx hardhat run scripts/run.js
```
###### Expected output:
```
Wave portal created!
The contract was compiled and deployed successfully! 
Contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
#### Deploy.js
Remember that you should change rinkeby for the network you're using **(e.g. goerli)**
```bash
npx hardhat run scripts/deploy.js --network rinkeby
```
###### Expected output:
```
WavePortal address:  0xE7198415Fb9A62ff6cf1f12aefbBD020D701C54D
```
### Support
You might want change some stuff of the smart contract, these are the main things:
#### Wave cooldown
It is setted at 15 minutes but you can change or even remove it!
```
uint256 waveCooldown = 15 minutes;
```

## About the project
### Project status
Right now I'm not actively working on this project, however, I might change some things anytime
### Contributing
Are you interested in adding new features to the client? Your ideas are always welcome, for any change you want to do just make a pull request or for major changes try making an issue, help is my best friend :)
### Authors and acknowledgement
This project couldn't have been possible without [Buildspace](https://buildspace.so/), in this site you can make some stuff in web3 guided by [Farza](https://twitter.com/farzatv?lang=ar-x-fm). What I've enjoyed the most about this projects is that they let you explore a lot about web3 and make your own things, not just **copy-paste** their code.
### License
[MIT](https://choosealicense.com/licenses/mit/)
