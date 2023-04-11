import SmartAccount from "@biconomy/smart-account"
import SocialLogin from "@biconomy/web3-auth"
import { ethers } from "ethers"
import { useCallback, useEffect, useState } from "react"
import { ChainId } from "../utils/chainConfig"
import UploadSite from "./UploadSite"
import { MintPageContext } from "./context/MintPageContext"
import { useContext } from "react"
import { createClient } from "urql"
import { InferGetServerSidePropsType } from "next"
import { GetServerSideProps } from "next"



const UploadBody = (props)=> {
	// const {
	// 	account,
	// 	connectWeb3,
	// 	disconnectWeb3,
	// 	smartAccount,
	// 	socialLoginSDK,
	// 	provider,
	// } = useContext(MintPageContext)
	console.log(props.data)

	return (
		<div>
			<UploadSite
				nameNum = {props.data}
				/>
		</div>
	)
}
export default UploadBody
