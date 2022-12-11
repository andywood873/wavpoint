"use client"
import "../styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import "@biconomy/web3-auth/dist/src/style.css"

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />
}

export default MyApp
