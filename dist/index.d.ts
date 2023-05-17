import { AbstractConnector } from "@web3-react/abstract-connector";
import { ConnectorUpdate } from '@web3-react/types';
export declare class WalletConnectConnector extends AbstractConnector {
    provider: any;
    constructor();
    activate(): Promise<ConnectorUpdate>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number>;
    getAccount(): Promise<null | string>;
    deactivate(): Promise<void>;
}
