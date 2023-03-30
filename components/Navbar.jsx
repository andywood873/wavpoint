import Link from "next/link"
import ConnectBtn from "./Connect";
import AddFundsButton from "./AddFundsButton"
import { MintPageContext } from "./context/MintPageContext";
import { useContext, useEffect } from "react";
import PrivyConnectBtn from "./PrivyConnectBtn";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
export default function Navbar() {
	// const mintContext = useContext(MintPageContext)
	const {chain} = useNetwork()
	const {switchNetwork} =  useSwitchNetwork({chainId:84531})
	const {user, authenticated, ready} = usePrivy()
	// const {address} = useAccount()
	// console.log(`Address from wagmi:- ${user?.wallet?.address}`);
	useEffect(() => {
		if (user) {
			// console.log(chain);
		if (chain?.id !== 84531) {
			switchNetwork()
		}	
		}
		
	},[chain])
	return (
		<>
			<div className="absolute top-10 left-10 md:top-8 md:left-10 lg:left-8 lg:top-6 cursor-pointer z-30">
				<Link href="/">
				<img
					src="/wavthe0ry-logo2@3x.png"
					alt="Logo"
					className="w-32 min-w-full min-h-full h-20 md:w-40 md:h-24 lg:w-36 lg:h-24"
				/></Link>
			</div>
			<div className="justify-between items-center cursor-pointer">
				<Link href="/mediaUpload">
					<h2 className="absolute font-['DM Sans'] inline invisible lg:visible text-sm font-medium leading-6 top-9 right-48">
						Deploy Drop
					</h2>
				</Link>
				{/* <ConnectBtn account={mintContext.account} connectWeb3={mintContext.connectWeb3} disconnectWeb3={mintContext.disconnectWeb3} /> */}
				<PrivyConnectBtn/>
			</div>
			{/* {props.account? : null} */}
				{ready && authenticated? <AddFundsButton user={user} address={user.wallet?.address}/>: null}
		</>
	)
}
