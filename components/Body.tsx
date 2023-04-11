// import styles from "../styles/Home.module.css";
import Header from "./Header"
import Popular from "./Popular"
import Recent from "./Recent"
import LowerPanel from "./LowerPanel"
import Footer from "./Footer"


import { usePrivy } from "@privy-io/react-auth"

const Body = () => {
	const {user, getEthersProvider} = usePrivy()
	return (
		<div className="divide-y-8">
			<div>
				<Header/>
				<Popular
					account={user?.wallet?.address || " "}
					// smartAccount={smartAccount}
					// socialLoginSdk={socialLoginSDK}
					provider={getEthersProvider()}
				/>
				<Recent />
				<LowerPanel />
			</div>
			<div>
				<Footer />
			</div>
		</div>
	)
}

export default Body
