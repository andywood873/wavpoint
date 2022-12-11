
export default function ConnectBtn(props) {
	
	return (
		<div>
			<button
				onClick={!props.account ? props.connectWeb3 : props.disconnectWeb3}
				className="absolute lg:right-8 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-6 md:top-8 md:right-10 md:py-3 md:px-10 top-10 right-10 py-4 px-8"
			>
				{!props.account ? "Connect" : `Disconnect`}
			</button>
		</div>
	)
}
