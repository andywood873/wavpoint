import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import Navbar from "../../components/Navbar"
import MediaFooter from "../../components/MediaFooter"
import MintPageCard from "../../components/MintPageComponents/MintPageCard"

export default function MintPage() {
	const router = useRouter()
	const { contractAddress } = router.query
	console.log(`Hello World ${contractAddress}`)

	return (
		<div>
			<div className="relative">
				<Navbar />
			</div>

			<MintPageCard />

			<MediaFooter />
		</div>
	)
}
