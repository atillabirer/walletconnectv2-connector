import { AbstractConnector } from "@web3-react/abstract-connector";
import { ConnectorUpdate } from '@web3-react/types'
import UniversalProvider from "@walletconnect/universal-provider"
import SignClient from "@walletconnect/sign-client";
import {providers} from "ethers";
import { Web3Modal } from "@web3modal/standalone";
import {SessionTypes} from "@walletconnect/types"


const projectId = "ad2993f3d628ec73d7307035cb36c4f0";


export class WalletConnectConnector extends AbstractConnector {
  public provider?: UniversalProvider;
  public web3Provider?: providers.Web3Provider;
  public signClient?: SignClient;
  constructor() {
    super({supportedChainIds: [1284]})
  }
  public async activate() : Promise<ConnectorUpdate> {


    const web3Modal = new Web3Modal({
      projectId: projectId,
      defaultChain: [1284],
      
      walletConnectVersion: 2,
      desktopWallets: [
        {
          id: "metamask",
          name: "MetaMask",
          links: {
            native: "metamask://",
            universal: ""
          }
        }
      ]
    
    });
    

    


    const provider = await UniversalProvider.init({
      projectId: "ad2993f3d628ec73d7307035cb36c4f0",
      relayUrl: "wss://relay.walletconnect.com",
      
      
      
    })
    

    provider.on("display_uri", async (uri: string) => {
      console.log("EVENT", "QR Code Modal open");
      web3Modal?.openModal({ uri });
    });

    // Subscribe to session ping
    provider.on("session_ping", ({ id, topic }: { id: number; topic: string }) => {
      console.log("EVENT", "session_ping");
      console.log(id, topic);
    });

    // Subscribe to session event
    provider.on("session_event", ({ event, chainId }: { event: any; chainId: string }) => {
      console.log("EVENT", "session_event");
      console.log(event, chainId);
    });

    // Subscribe to session update
    provider.on(
      "session_update",
      ({ topic, session }: { topic: string; session: SessionTypes.Struct }) => {
        console.log("EVENT", "session_updated");
        console.log(topic,session);
        //setSession(session);
      },
    );

    // Subscribe to session delete
    provider.on("session_delete", ({ id, topic }: { id: number; topic: string }) => {
      console.log("EVENT", "session_deleted");
      console.log(id, topic);
     
    });

    this.provider = provider;
    

    this.signClient = provider.client;

    
    
    
      await provider.connect({
        

      namespaces: {
        eip155: {
          methods: [
            "eth_sendTransaction",
            "eth_signTransaction",
            "eth_sign",
            "personal_sign",
            "eth_signTypedData",
          ],
          chains: [`eip155:1284`],
          events: ["chainChanged", "accountsChanged"],
          rpcMap: {
            1284: "https://rpc.api.moonbeam.network"
          }
        },
      },
      
    })
    
    this.web3Provider = new providers.Web3Provider(provider);
    
    
    const result = await provider.enable();
    return {provider: provider,account:result[0]}

  }

  public async getProvider(): Promise<any> {
    return this.web3Provider;
  }

  

  public async getChainId(): Promise<number> {
    return 1284;
  }

  public async getAccount(): Promise<null | string> {
    const accs = await this.web3Provider?.listAccounts();
    return accs![0];
  }


  public async deactivate() {
    console.log("deactivate called")
    this.provider?.disconnect();


  }
  public async close() {
    this.emitDeactivate();
  }
}