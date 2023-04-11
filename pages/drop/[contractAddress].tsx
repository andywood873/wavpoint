import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import Navbar from "../../components/Navbar"
import MediaFooter from "../../components/MediaFooter"
import MintPageCard from "../../components/MintPageComponents/MintPageCard"
import { Center } from "@chakra-ui/layout"
import MintPageTotalCollected from "../../components/MintPageComponents/MintPageTotalCollected"
import {  useState } from "react"
import MintPageAudioPlayerContextProvider from "../../components/context/MintPageAudioPlayerContext"
import MintPageAudioPlayer from "../../components/MintPageComponents/MintPageAudioPlayer"
import {
	trackListArray,
	description,
	format,
	deployedDate,
} from "../../utils/mockData"
import MintNftButton from "../../components/MintNftButton"
// import { MintPageContext } from "../../components/context/MintPageContext"
import MintPageTotalCollectedAudioPlayer from "../../components/MintPageComponents/MintPageTotalCollectedAudioPlayer"
import { usePrivy } from "@privy-io/react-auth"

export default function MintPage() {
	const router = useRouter()
	// const { smartAccount, provider, account, socialLoginSDK } =
	// 	useContext(MintPageContext)
	const { user, getEthersProvider } = usePrivy()
	const { contractAddress } = router.query
	const [collectedNumber, setCollectedNumber] = useState<number>(0)
	return (
		<div className="relative font-azeretcus ">
			<MintPageAudioPlayerContextProvider>
				<div className="static">
					<Navbar />
				</div>
				<Center className=" flex flex-col">
					<div className="md:grid md:grid-cols-2 md:gap-4 md:items-start md:top-[0rem] lg:p-[0rem] lg:pt-[0rem] md:pt-0">
						<div className="relative container w-full ">
							<MintPageCard />
							<div className="container relative w-full">
								<MintPageTotalCollected collectedNumber={collectedNumber} />
							</div>
						</div>
						<div className="relative md:top-[12rem] md:pl-[2.2rem] lg:top-[7rem] xl:top-[7rem]">
							<MintPageAudioPlayer />
							<div className="relative min-w-full top-[20rem] md:top-[17rem] xl:grid xl:grid-cols-2 xl:gap-2 xl:top-[15rem]">
								<MintNftButton
									provider={getEthersProvider()}
									account={user?.wallet?.address}
									isMintPage={true}
								/>
								<MintPageTotalCollectedAudioPlayer
									collectedNumber={collectedNumber}
								/>
							</div>
						</div>
					</div>
					<div className="relative container px-[2.2rem] top-[25rem] md:grid md:grid md:grid-rows-2 md:top-[17rem] md:text-left md:mt-5 xl:mt-5 xl:top-[13rem]">
						<div className="md:relative md:order-2 md:-top-[25rem] xl:mt-[2rem]">
							<h2 className="text-3xl text-[#FF6700] font-normal">Track ID</h2>
							{trackListArray.map((value: string, index): React.ReactNode => {
								return (
									<p key={index} className="text-2xl my-10 font-normal">
										{value}
									</p>
								)
							})}
							<h2 className="text-3xl text-[#FF6700] font-normal mt-24">
								Description
							</h2>
							<p className="text-2xl my-10 font-normal">{description}</p>
						</div>
						<div className="flex justify-between md:order-1">
							<div className="mt-10">
								<h3 className="text-3xl text-[#FF6700] font-normal ">
									Date Deployed
								</h3>
								<p className="text-2xl my-10 font-normal">{deployedDate}</p>
							</div>
							<div className="mt-10">
								<h3 className="text-3xl text-[#FF6700] font-normal ">
									Contract Address
								</h3>
								<p className="text-2xl my-10 font-normal">{contractAddress}</p>
							</div>
							<div className="mt-10">
								<h3 className="text-3xl text-[#FF6700] font-normal">Format</h3>
								<p className="text-2xl my-10 font-normal">{format}</p>
							</div>
						</div>
					</div>
				</Center>
			</MintPageAudioPlayerContextProvider>
			<MediaFooter />
		</div>
	)
}
