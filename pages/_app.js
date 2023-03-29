import "../styles/globals.css"
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector"
// import "@biconomy/web3-auth/dist/src/style.css"
import {configureChains } from "wagmi"
import {goerli, baseGoerli} from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { PrivyProvider } from "@privy-io/react-auth"

const configureChainsConfig = configureChains([goerli, baseGoerli], [publicProvider()])

function MyApp({ Component, pageProps }) {
	const handleLogin = (user) => {
		console.log(`User logged in: ${user.id} and ${user.wallet.address}`)
	}

	return (
		<PrivyProvider
			appId={process.env.NEXT_PUBLIC_PRIVY_API_KEY}
			config={{
				appearance: {
				  theme:"light",
				  accentColor: "#FF6700",
				  logo: "wavthe0ry-logo2@3x.png",
				}
			  }}
			onSuccess={handleLogin}
		>
			<PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
				<Component {...pageProps} />
			</PrivyWagmiConnector>
		</PrivyProvider>
	)
}

export default MyApp
