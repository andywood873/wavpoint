import SmartAccount from "@biconomy/smart-account"
import SocialLogin from "@biconomy/web3-auth"
import { ethers } from "ethers"
import { useCallback, useEffect, useState } from "react"
import { ChainId } from "../utils/chainConfig"
import UploadSite from "./UploadSite"
import { MintPageContext } from "./context/MintPageContext"
import { useContext } from "react"

const UploadBody = () => {
	const {
		account,
		connectWeb3,
		disconnectWeb3,
		smartAccount,
		socialLoginSDK,
		provider,
	} = useContext(MintPageContext)

	return (
		<div>
			<UploadSite
				provider={provider}
				account={account}
				connectWeb3={connectWeb3}
				disconnectWeb3={disconnectWeb3}
				smartAccount={smartAccount}
				socialLoginSDK={socialLoginSDK}
			/>
		</div>
	)
}
export default UploadBody
