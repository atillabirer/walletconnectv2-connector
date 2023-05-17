import { AbstractConnector } from "@web3-react/abstract-connector";
import { ConnectorUpdate } from '@web3-react/types'
import { EthereumProvider } from '@walletconnect/ethereum-provider'



export class WalletConnectConnector extends AbstractConnector {
  public provider: any;
  constructor() {
    super({supportedChainIds: [1284]})
  }
  public async activate() : Promise<ConnectorUpdate> {

    this.provider = await EthereumProvider.init({
      projectId: "ad2993f3d628ec73d7307035cb36c4f0",
      chains: [1284],
      optionalChains: [1284],
      showQrModal: true,
      rpcMap: {1284: "https://rpc.api.moonbeam.network"},
      events: ["chainChanged", "accountsChanged"],
      methods: [
        "eth_sendTransaction",
        "eth_signTransaction",
        "eth_sign",
        "personal_sign",
        "eth_signTypedData",
      ]

    })
    await this.provider.connect()
    const result = await this.provider.request({ method: 'eth_requestAccounts' })
    return {provider: this.provider,account:result[0]}

  }

  public async getProvider(): Promise<any> {
    return this.provider
  }

  public async getChainId(): Promise<number> {
    return this.provider.chainId
  }

  public async getAccount(): Promise<null | string> {
    const accounts = await this.provider.request({
      method: 'eth_requestAccounts'
    })
    return accounts[0]
  }


  public async deactivate() {

  }
}