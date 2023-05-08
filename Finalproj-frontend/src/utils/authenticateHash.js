import SignData from './SignData';
const AuthenticationHash = async (username, accountAddress, password, web3) => {
    let signedMessage = await SignData(username, accountAddress, web3);
    let passwordHash = await web3.eth.accounts.hashMessage(password);

    return await web3.eth.accounts.hashMessage(signedMessage + passwordHash);
}


export default AuthenticationHash;