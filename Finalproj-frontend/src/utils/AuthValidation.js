import { getEthereumContract } from '../context/testContext';
import web3Connection from '../web3Connection';
import SignData from './SignData';

const AuthValidation = async (username, accountAddress, password) => {
    let testContract= getEthereumContract();
    const web3 = await web3Connection();
    let userAddress = await testContract.getUserAddress();

    if (userAddress.toLowerCase() !== accountAddress.toLowerCase()) {
        console.log("userAddress.toLowerCase() !== accountAddress.toLowerCase()");
        return false;
    } else {
        let signedData = await SignData(username, accountAddress, web3);
        let passwordHash = await web3.eth.accounts.hashMessage(password);

        let hash = await web3.eth.accounts.hashMessage(signedData + passwordHash);

        // get hash from the contract
        let hashFromContract = await testContract.getSignatureHash();

        if (hash === hashFromContract) {
            return true;
        } else {
            console.log("hash != hashFromContract");
            console.log("hash:"+hash);
            console.log("hashFromContract:"+hashFromContract);
            return false;
        }
    }
}

export default AuthValidation;