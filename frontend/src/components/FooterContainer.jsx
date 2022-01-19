import React from 'react';
import twitterLogo from '../assets/twitter-logo.svg'
import etherLogo from '../assets/ethereum.svg'
import githubLogo from '../assets/github.svg'
const TWITTER_HANDLE = 'alan_racciatti1';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const FooterContainer = () => {
    return (
        <div className="footer-container">
          <div className='footer-container-small'>
            <img alt="Ethereum Logo" className="eth-logo" src={etherLogo} />
            <a className="footer-text fake-eth" href='https://faucets.chain.link/rinkeby' target="_blank" rel="noreferrer">Need some fake ETH?</a>
          </div>
          <div className='footer-container-small'>
            <img alt="Ethereum Logo" className="eth-logo" src={githubLogo} />
            <a className="footer-text" href="https://github.com/AlanRacciatti/lol-nft-collection" target="_blank" rel="noreferrer">Github</a>
          </div>
          <div className='footer-container-small'>
            <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
            <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">{`Built by @${TWITTER_HANDLE}`}</a>
          </div>
        </div>
    )
}

export default FooterContainer;