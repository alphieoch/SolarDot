import { ApiPromise, WsProvider } from '@polkadot/api';

let api;

export const getApi = async () => {
    if (!api) {
        // Connect to Moonbeam's Alphanet (Moonbase Alpha)
        const provider = new WsProvider('wss://wss.api.moonbase.moonbeam.network');
        api = await ApiPromise.create({ provider });
    }
    return api;
};