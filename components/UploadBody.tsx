import UploadSite from "./UploadSite"




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
