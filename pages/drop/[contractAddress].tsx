import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import Navbar from "../../components/Navbar"
import MediaFooter from "../../components/MediaFooter"
import MintPageCard from "../../components/MintPageComponents/MintPageCard"
import { Center } from "@chakra-ui/layout"
import MintPageTotalCollected from "../../components/MintPageComponents/MintPageTotalCollected"
import { useState } from "react"
import MintPageAudioPlayerContextProvider from "../../components/context/MintPageAudioPlayerContext"
import MintPageAudioPlayer from "../../components/MintPageComponents/MintPageAudioPlayer"

export default function MintPage() {
	const router = useRouter()
	const { contractAddress } = router.query
	console.log(`Hello World ${contractAddress}`)
	const [collectedNumber, setCollectedNumber] = useState<number>(0)
	return (
		<div className="relative font-azeretcus">
			<MintPageAudioPlayerContextProvider>
				<div className="relative">
					<Navbar />
				</div>
				<Center className="flex flex-col ">
					<div className="relative container w-full">
						<MintPageCard />
						<MintPageTotalCollected collectedNumber={collectedNumber} />
					</div>
					<MintPageAudioPlayer/>
				</Center>
			</MintPageAudioPlayerContextProvider>
			<MediaFooter />
		</div>
	)
}
