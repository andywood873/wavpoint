import dynamic from "next/dynamic"
// const Magic = dynamic(
// 	() => {
// 		return import("magic-sdk")
// 	},
// 	{ ssr: false },
// )
import { Magic } from "magic-sdk"

import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { magic } from "../lib/CreateMagic"
import { Box, CircularProgress } from "@mui/material"

export default function ConnectButton() {
	const [account, setAccount] = useState(null)
	const [balance, setBalance] = useState(null)
	const [isConnectLoading, setConnectLoading] = useState(null)
	// console.log(provider)
	const Connect = async () => {
		setConnectLoading(true)
		// await magic.connect.disconnect()
		const provider = new ethers.providers.Web3Provider(magic.rpcProvider)
		const accountLocal = await provider
			.listAccounts()
			.then((accounts) => {
				return accounts[0]
			})
			.catch((e) => {
				console.log(e)
			})
		const walletInfo = await magic.connect.getWalletInfo().catch((e) => {
			console.log(e)
		})
		setAccount(accountLocal)
		console.log(accountLocal)
		console.log(walletInfo)

		if (accountLocal) {
			const balance = await provider.getBalance(accountLocal)
			const balanceInEth = ethers.utils.formatEther(balance).toString()
			console.log(balanceInEth)
			setBalance(balanceInEth)
		}
		setConnectLoading(false)
	}
	const Disconnect = async () => {
		await magic.connect.disconnect()
		setAccount(null)
		setBalance(null)
		console.log("Disconnected")
	}
	useEffect(() => {
		// Connect()
	}, [])
	return (
		<div>
			{account && balance ? (
				<div>
					<button
						onClick={Disconnect}
						className="absolute lg:right-8 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-6 md:top-8 md:right-10 md:py-3 md:px-10 top-10 right-10 py-4 px-8"
					>
						<span>{balance.slice(0, 4)} ETH</span>
						<span className="w-2.5 h-2.5 rounded-full bg-[#FF6700] inline-block ml-2"></span>
					</button>
				</div>
			) : (
				<button
					onClick={Connect}
					className="absolute lg:right-8 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-6 md:top-8 md:right-10 md:py-3 md:px-10 top-10 right-10 py-4 px-8"
				>
					{isConnectLoading ? (
						<Box sx={{ display: "flex" }}>
							<CircularProgress size={23} />
							<span className="w-2.5 h-2.5 rounded-full bg-[#FF6700] inline-block ml-2"></span>
						</Box>
					) : (
						<div>
							<span className="sm:text-2xl md:text-sm font-medium">
								Connect
							</span>
							<span className="w-2.5 h-2.5 rounded-full bg-[#FF6700] inline-block ml-2"></span>
						</div>
					)}
				</button>
			)}
		</div>
	)
}
