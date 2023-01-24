import "../styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import "@biconomy/web3-auth/dist/src/style.css"
import dynamic from "next/dynamic"
const MintPageContextProvider = dynamic(
	() => import("../components/context/MintPageContext"),
	{
		ssr: false,
	},
)

function MyApp({ Component, pageProps }) {
	return (
		// <ChakraProvider>
		<MintPageContextProvider>
			<Component {...pageProps} />
		</MintPageContextProvider>
		// </ChakraProvider>
	)
}

export default MyApp
