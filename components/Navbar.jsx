import Link from "next/link"
import ConnectBtn from "./Connect";
import AddFundsButton from "./AddFundsButton"
export default function Navbar(props) {
	return (
		<>
			<div className="absolute top-10 left-10 md:top-8 md:left-10 lg:left-8 lg:top-6">
				<img
					src="/wavthe0ry-logo2@3x.png"
					alt="Logo"
					className="w-32 min-w-full min-h-full h-20 md:w-40 md:h-24 lg:w-36 lg:h-24"
				/>
			</div>
			<div className="justify-between items-center">
				<Link href="/mediaUpload">
					<h2 className="absolute font-['DM Sans'] inline invisible lg:visible text-sm font-medium leading-6 top-9 right-48">
						Deploy Drop
					</h2>
				</Link>
				<ConnectBtn account={props.account} connectWeb3={props.connectWeb3} disconnectWeb3={props.disconnectWeb3} />
			</div>
			{/* {props.account? : null} */}
				{props.smartAccount && props.account? <AddFundsButton socialLoginSDK={props.socialLoginSDK} smartAccount={props.smartAccount}/>: null}
		</>
	)
}
