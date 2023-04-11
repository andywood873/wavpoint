// import styles from "../styles/Home.module.css";
import { useCallback, useEffect, useState } from "react"
import { ethers } from "ethers"
import { ChainId } from "@biconomy/core-types"
import SocialLogin from "@biconomy/web3-auth"
import SmartAccount from "@biconomy/smart-account"
import Header from "./Header"
import Popular from "./Popular"
import Recent from "./Recent"
import LowerPanel from "./LowerPanel"
import Footer from "./Footer"
import { MintPageContext } from "./context/MintPageContext"
import { useContext } from "react"

const Body = () => {
	// const {
	// 	account,
	// 	connectWeb3,
	// 	disconnectWeb3,
	// 	smartAccount,
	// 	socialLoginSDK,
	// 	provider,
	// } = useContext(MintPageContext)

	return (
		<div className="divide-y-8">
			<div>
				<Header/>
				<Popular
					// account={account}
					// smartAccount={smartAccount}
					// socialLoginSdk={socialLoginSDK}
					// provider={provider}
				/>
				<Recent />
				<LowerPanel />
			</div>
			<div>
				<Footer />
			</div>
		</div>
	)
}

export default Body
