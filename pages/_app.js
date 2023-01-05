import "../styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import "@biconomy/web3-auth/dist/src/style.css"

function MyApp({ Component, pageProps }) {
	return (
		// <ChakraProvider>
			<Component {...pageProps} />
		// </ChakraProvider>
	)
}

export default MyApp
