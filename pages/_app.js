import "../styles/globals.css"
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector"
// import "@biconomy/web3-auth/dist/src/style.css"
import { configureChains } from "wagmi"
import { baseGoerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { PrivyProvider } from "@privy-io/react-auth"

import {
	LivepeerConfig,
	createReactClient,
	studioProvider,
} from "@livepeer/react"

const configureChainsConfig = configureChains([baseGoerli], [publicProvider()])

const livepeerClient = createReactClient({
	provider: studioProvider({
		apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
	}),
})

function MyApp({ Component, pageProps }) {
	// const {wagmiChainsConfig} = useSwitchNetwork()
	const handleLogin = (user) => {
		console.log(`User logged in: ${user.id} and ${user.wallet.address}`)
		// console.log(user);
	}

	return (
		<PrivyProvider
			appId={process.env.NEXT_PUBLIC_PRIVY_API_KEY}
			// createPrivyWalletOnLogin
			config={{
				appearance: {
					theme: "light",
					accentColor: "#FF6700",
					logo: "wavthe0ry-logo2@3x.png",
					showWalletLoginFirst: true
				},
				embeddedWallets: {
					createOnLogin: "users-without-wallets"
				},
				loginMethods: ["wallet", "email"]
			}}
			onSuccess={handleLogin}
		>
			<PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
				<LivepeerConfig client={livepeerClient}>
					<Component {...pageProps} />
				</LivepeerConfig>
			</PrivyWagmiConnector>
		</PrivyProvider>
	)
}

export default MyApp
