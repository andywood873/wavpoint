import SmartAccount from "@biconomy/smart-account"
import SocialLogin from "@biconomy/web3-auth"
import { ethers } from "ethers"
import { useCallback, useEffect, useState } from "react"
import { ChainId } from "../../utils/chainConfig"
import React, {createContext} from "react"

type MintPageContextType = {
	children: React.ReactNode
}

type MintPageContextValueType = {
    account:string,
    provider:any,
    smartAccount: SmartAccount | null,
    socialLoginSDK: SocialLogin | null,
    connectWeb3: ()=> Promise<SocialLogin>,
    disconnectWeb3: () => Promise<void>
}

export const MintPageContext = createContext<MintPageContextValueType | null>(null)
const MintPageContextProvider = ({children}: MintPageContextType) =>{
    const [provider, setProvider] = useState<any>()
	const [account, setAccount] = useState<string>()
	const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null)
	const [scwAddress, setScwAddress] = useState("")
	const [scwLoading, setScwLoading] = useState(false)
	const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(null)

	const connectWeb3 = useCallback(async () => {
		if (typeof window === "undefined") return
		console.log("socialLoginSDK", socialLoginSDK)
		if (socialLoginSDK?.provider) {
			const web3Provider = new ethers.providers.Web3Provider(
				socialLoginSDK.provider,
			)
			setProvider(web3Provider)
			const accounts = await web3Provider.listAccounts()
			setAccount(accounts[0])
			return
		}
		if (socialLoginSDK) {
			socialLoginSDK.showWallet()
			return socialLoginSDK
		}
		const sdk = new SocialLogin()
		await sdk.init({ chainId: ethers.utils.hexValue(5) })
		setSocialLoginSDK(sdk)
		// sdk.showConnectModal()
		sdk.showWallet()
		return socialLoginSDK
	}, [socialLoginSDK])

	// if wallet already connected close widget
	useEffect(() => {
		console.log("hidelwallet")
		if (socialLoginSDK && socialLoginSDK.provider) {
			socialLoginSDK.hideWallet()
		}
	}, [account, socialLoginSDK])

	// after metamask login -> get provider event
	useEffect(() => {
		const interval = setInterval(async () => {
			if (account) {
				clearInterval(interval)
			}
			if (socialLoginSDK?.provider && !account) {
				connectWeb3()
			}
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	}, [account, connectWeb3, socialLoginSDK])

	const disconnectWeb3 = async () => {
		if (!socialLoginSDK || !socialLoginSDK.web3auth) {
			console.error("Web3Modal not initialized.")
			return
		}
		await socialLoginSDK.logout()
		socialLoginSDK.hideWallet()
		setProvider(undefined)
		setAccount(undefined)
		setScwAddress("")
	}

	useEffect(() => {
		async function setupSmartAccount() {
			setScwAddress("")
			setScwLoading(true)
			const smartAccount = new SmartAccount(provider, {
				activeNetworkId: ChainId.GOERLI,
				supportedNetworksIds: [ChainId.GOERLI],
				networkConfig: [
					{
						chainId: ChainId.GOERLI,
						dappAPIKey: process.env.NEXT_PUBLIC_BICONOMY_GOERLI,
						// check in the beginning of the page to play around with testnet common keys
						// customPaymasterAPI: <IPaymaster Instance of your own Paymaster>
					},
				],
			})
			await smartAccount.init()
			const context = smartAccount.getSmartAccountContext()
			setScwAddress(context.baseWallet.getAddress())
			setSmartAccount(smartAccount)
			setScwLoading(false)
		}
		if (!!provider && !!account) {
			setupSmartAccount()
			console.log("Provider...", provider)
		}
	}, [account, provider])

	return <MintPageContext.Provider value={{account, provider, smartAccount, socialLoginSDK, connectWeb3,disconnectWeb3}}>{children}</MintPageContext.Provider>
}

export default MintPageContextProvider