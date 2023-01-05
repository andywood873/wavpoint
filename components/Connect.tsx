import { CircularProgress } from "@mui/material"
import { useState } from "react"

export default function ConnectBtn(props) {
	const [isClicked,setIsClicked] = useState(false)
	async function connect() {
		setIsClicked(true)
		await props.connectWeb3()
		setIsClicked(false)
	}
	return (
		<div>
			{!props.account ? ( 
				<button
					onClick={connect}
					className="absolute lg:right-8 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-6 md:top-8 md:right-10 md:py-3 md:px-10 top-10 right-10 py-4 px-8"
				>
					{isClicked? <CircularProgress /> :
					"Connect"}
				</button>
			) : (
				<button
					className="absolute lg:right-20 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-2 md:top-8 md:right-24 md:py-3 md:px-5 top-10 right-20 py-4 px-2"
					onClick={props.disconnectWeb3}
				>
					Disconnect
				</button>
			)}
		</div>
	)
}
