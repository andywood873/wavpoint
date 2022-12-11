// import styles from "../styles/Home.module.css";
import { useCallback, useEffect, useState } from "react"
import { ethers } from "ethers"
import { ChainId } from "@biconomy/core-types"
import SocialLogin from "@biconomy/web3-auth"
import SmartAccount from "@biconomy/smart-account"

const Home = () => {
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
		await sdk.init(ethers.utils.hexValue(80001))
		setSocialLoginSDK(sdk)
		sdk.showConnectModal()
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

	return (
		<div>
			<button
				onClick={!account ? connectWeb3 : disconnectWeb3}
				className="absolute lg:right-8 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-6 md:top-8 md:right-10 md:py-3 md:px-10 top-10 right-10 py-4 px-8"
			>
				{!account ? "Connect" : "Disconnect"}
			</button>
		</div>
	)
}

export default Home
