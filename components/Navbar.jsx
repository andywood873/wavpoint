import Link from "next/link"
import ConnectBtn from "./Connect";
import AddFundsButton from "./AddFundsButton"
import { MintPageContext } from "./context/MintPageContext";
import { useContext } from "react";
export default function Navbar() {
	const mintContext = useContext(MintPageContext)
	return (
		<>
			<div className="absolute top-10 left-10 md:top-8 md:left-10 lg:left-8 lg:top-6 cursor-pointer">
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
				<ConnectBtn account={mintContext.account} connectWeb3={mintContext.connectWeb3} disconnectWeb3={mintContext.disconnectWeb3} />
			</div>
			{/* {props.account? : null} */}
				{mintContext.smartAccount && mintContext.account? <AddFundsButton socialLoginSDK={mintContext.socialLoginSDK} smartAccount={mintContext.smartAccount}/>: null}
		</>
	)
}
