import Link from "next/link"

import AddFundsButton from "./AddFundsButton"
import { useEffect, useState } from "react"
import PrivyConnectBtn from "./PrivyConnectBtn"
import { usePrivy } from "@privy-io/react-auth"
import {  useNetwork, useSwitchNetwork } from "wagmi"
import { ethers } from "ethers"
export default function Navbar() {
	
	const [hasWavpoint, setHasWavpoint] = useState(false)
	const { chain } = useNetwork()
	const { switchNetwork } = useSwitchNetwork({ chainId: 84531 })
	const { user, authenticated, ready, getEthersProvider } = usePrivy()

	useEffect(() => {
		if (user) {
			// console.log(chain);

			if (chain?.id !== 84531) {
				switchNetwork()
			}
		}
	}, [chain])
	useEffect(() => {
		async function getBalance() {
			const provider = getEthersProvider()
			const abi = [
				// Read-Only Functions
				"function balanceOf(address owner) view returns (uint256)",
			]
			const address = "0x22D2D4E8287D3C8BCf54Ccdf37710D35540C943b"
			const wavpointNft = new ethers.Contract(address, abi, provider)
			if (ready && authenticated) {
				const balance = await wavpointNft.balanceOf(user?.wallet?.address)
				console.log("Balance- ")
				console.log(parseInt(balance.toString()))
				if (parseInt(balance.toString()) >= 1) {
					setHasWavpoint(true)
				} else {
					setHasWavpoint(false)
				}
			}
		}
		getBalance()
	}, [user])
	return (
		<>
			<div className="absolute top-10 left-10 md:top-8 md:left-10 lg:left-8 lg:top-6 cursor-pointer z-30">
				<Link href="/">
					<img
						src="/wavthe0ry-logo2@3x.png"
						alt="Logo"
						className="w-32 min-w-full min-h-full h-20 md:w-40 md:h-24 lg:w-36 lg:h-24"
					/>
				</Link>
			</div>
			<div className="justify-between items-center cursor-pointer">
				{ready && authenticated && hasWavpoint ? (
					<Link href="/mediaUpload">
						<h2 className="absolute font-['DM Sans'] inline invisible lg:visible text-sm font-medium leading-6 top-9 right-48">
							Deploy Drop
						</h2>
					</Link>
				) : null}

				{/* <ConnectBtn account={mintContext.account} connectWeb3={mintContext.connectWeb3} disconnectWeb3={mintContext.disconnectWeb3} /> */}
				<PrivyConnectBtn />
			</div>
			{/* {props.account? : null} */}
			{ready && authenticated ? (
				<AddFundsButton user={user} address={user.wallet?.address} />
			) : null}
		</>
	)
}
