import { useEffect, useState } from "react"
import { Center } from "@chakra-ui/react"
import MintNftButton from "./MintNftButton"
import { CardPropInterface } from "../lib/Interfaces"
import MusicPlayer from "./MusicPlayer"
import MintPageAudioPlayerContextProvider from "./context/MintPageAudioPlayerContext"

export default function Card(props: CardPropInterface) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	function handleModalClose() {
		setIsModalOpen(false)
		console.log("Modal close clicked")
	}
	function handleModalOpen() {
		setIsModalOpen(true)
	}
	return (
		<div className="relative flex-shrink-0">
			<MintPageAudioPlayerContextProvider>
				<div className="my-0">
					<div className="relative bg-[#F5F5F5] justify-self-center">
						<div className="text-center">
							<MusicPlayer
								backgroundFilePath={props.backgroundFilePath}
								audioFilePath={props.audioFilePath}
							/>
							<span className="text-[#888888] font-azeretcus">
								Recorded: {props.createdBy}
							</span>
							<MintNftButton
								smartAccount={props.smartAccount}
								provider={props.provider}
								socialLoginSdk={props.socialLoginSdk}
								account={props.account}
								isMintPage={false}
							/>
							<div className="justify-between gap-x-4 flex py-5 my-0 px-6">
								<div className="container px-2 border-[#FF6700] border-2 w-[7.69rem] rounded-full my-6 text-[#FF6700] py-1 cursor-pointer">
									<span className="hidden lg:inline-block">Description</span>
									<Center>
										<img
											src="/icon_description.svg"
											className="lg:hidden"
										></img>
									</Center>
								</div>
								<div className="px-2 border-[#FF6700] border-2 w-[7.69rem] rounded-full my-6 text-[#FF6700]  py-1 cursor-pointer">
									<span className="hidden lg:inline-block">Track ID</span>
									<Center>
										<img src="/icon_tracklist.svg" className="lg:hidden"></img>
									</Center>
								</div>
								<div className="px-2 border-[#FF6700] border-2 w-[7.69rem] rounded-full my-6 text-[#FF6700] py-1 cursor-pointer">
									<span className="hidden lg:inline-block">Splits</span>
									<Center>
										<img src="/icon-split.svg" className="lg:hidden"></img>
									</Center>
								</div>
							</div>
						</div>
					</div>
				</div>
			</MintPageAudioPlayerContextProvider>
		</div>
	)
}
