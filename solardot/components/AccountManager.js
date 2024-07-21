'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const AccountManager = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const connectWallet = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                // Switch to Moonbase Alpha testnet
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x507' }], // 1287 in hexadecimal
                    });
                } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x507',
                                chainName: 'Moonbase Alpha',
                                nativeCurrency: {
                                    name: 'DEV',
                                    symbol: 'DEV',
                                    decimals: 18
                                },
                                rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
                                blockExplorerUrls: ['https://moonbase.moonscan.io/']
                            }],
                        });
                    } else {
                        throw switchError;
                    }
                }

                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);

                // Get balance
                const balance = await provider.getBalance(address);
                setBalance(ethers.utils.formatEther(balance));

                setLoading(false);
            } else {
                throw new Error('MetaMask is not installed');
            }
        } catch (err) {
            console.error('Error connecting wallet:', err);
            setError(err.message || 'Failed to connect wallet. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        connectWallet();
    }, []);

    if (loading) return <div>Loading... Please connect your MetaMask to Moonbase Alpha.</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Moonbeam Account Manager</h2>
            {account ? (
                <div>
                    <p>Address: {account}</p>
                    <p>Balance: {balance} DEV</p>
                    <button onClick={connectWallet}>Reconnect Wallet</button>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect MetaMask</button>
            )}
        </div>
    );
};

export default AccountManager;