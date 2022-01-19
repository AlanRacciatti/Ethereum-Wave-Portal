import React from 'react';

const ConnectWalletContainer = (props) => (
    <button className="waveButton loginButton" onClick={props.connectWallet}>
        Connect Wallet
    </button>
)

export default ConnectWalletContainer;
