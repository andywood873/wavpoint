import { CircularProgress } from "@mui/material"
import { usePrivy } from "@privy-io/react-auth"
import { useState } from "react"
import { useProvider, useSigner } from "wagmi"

export default function PrivyConnectBtn() {
	const [isClicked,setIsClicked] = useState<boolean>(false)
    const {login, logout, authenticated} = usePrivy()
	const provider = useProvider()
	
	async function connect() {
		setIsClicked(true)
		await login()
		setIsClicked(false)
		// console.log(provider);
		
	}
	return (
		<div>
			{!authenticated ? ( 
				<button
					onClick={connect}
					className="absolute lg:right-8 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-6 md:top-8 md:right-10 md:py-3 md:px-10 top-10 right-10 py-4 px-8"
				>
					{isClicked? <CircularProgress /> :
					"Log in"}
				</button>
			) : (
				<button
					className="absolute lg:right-20 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-2 md:top-8 md:right-24 md:py-3 md:px-5 top-10 right-20 py-4 px-2"
					onClick={logout}
				>
					Log out
				</button>
			)}
		</div>
	)
}
