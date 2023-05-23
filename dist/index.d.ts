import { AbstractConnector } from "@web3-react/abstract-connector";
import { ConnectorUpdate } from '@web3-react/types';
import UniversalProvider from "@walletconnect/universal-provider";
import SignClient from "@walletconnect/sign-client";
import { providers } from "ethers";
export declare class WalletConnectConnector extends AbstractConnector {
    provider?: UniversalProvider;
    web3Provider?: providers.Web3Provider;
    signClient?: SignClient;
    constructor();
    activate(): Promise<ConnectorUpdate>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number>;
    getAccount(): Promise<null | string>;
    deactivate(): Promise<void>;
    close(): Promise<void>;
}
