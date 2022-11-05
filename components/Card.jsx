import { useEffect, useState } from "react"
// import ReactPlayer from "react-player"
import dynamic from "next/dynamic"
import { ClickAwayListener, IconButton } from "@mui/material"
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"
import Image from "next/image"
import { Center } from "@chakra-ui/react"

export default function Card(props) {
	const givenFilePath = props.audioFilePath
	const [audio, setAudio] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)

	function playAudio() {
		setIsPlaying(true)
		audio.play()
	}
	function stopAudio() {
		audio.pause()
		setIsPlaying(false)
	}

	useEffect(() => {
		setAudio(new Audio(givenFilePath))
	}, [])
	return (
		<div className="relative flex-shrink-0">
			<ClickAwayListener onClickAway={stopAudio}>
				<div className="my-0">
					<div className=" justify-items-center ">
						<img
							src={props.backgroundFilePath}
							className="lg:w-[60.50rem] min-w-full "
						></img>
						<div className="container absolute inset-y-1/4">
							{isPlaying ? (
								<Center>
									<IconButton onClick={stopAudio} className="z-10">
										{/* <PauseCircleFilledIcon
											sx={{ fontSize: 150, color: "#FF6700" }}
										/> */}
										<img src="/stop_icon.svg"></img>
									</IconButton>
								</Center>
							) : (
								<Center>
									<IconButton onClick={playAudio} className=" z-10">
										{/* <PlayCircleFilledIcon
											sx={{ fontSize: 120, color: "#FF6700" }}
										/> */}<img src="/play_icon.svg"></img>
									</IconButton>
								</Center>
							)}
						</div>
					</div>
					<div className="relative bg-[#F5F5F5] justify-self-center py-5 my-0 px-6">
						<div className="text-center">
							<span className="text-[#888888] font-azeretcus">
								Recorded: {props.createdBy}
							</span>
							<img src="/Component 2.png" className="min-w-full" />
							<div className="justify-between gap-x-4 flex ">
								<div className="container px-2 border-[#FF6700] border-2 w-[7.69rem] rounded-full my-6 text-[#FF6700] py-1">
									<span className="hidden lg:inline-block">Description</span>
									<Center>
										<img
											src="/icon_description.svg"
											className="lg:hidden"
										></img>
									</Center>
								</div>
								<div className="px-2 border-[#FF6700] border-2 w-[7.69rem] rounded-full my-6 text-[#FF6700]  py-1">
									<span className="hidden lg:inline-block">Tracklist</span>
									<Center>
										<img
											src="/icon_tracklist.svg"
											className="lg:hidden"
										></img>
									</Center>
								</div>
								<div className="px-2 border-[#FF6700] border-2 w-[7.69rem] rounded-full my-6 text-[#FF6700] py-1">
									<span className="hidden lg:inline-block">Splits</span>
									<Center>
										<img
											src="/icon-split.svg"
											className="lg:hidden"
										></img>
									</Center>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ClickAwayListener>
		</div>
	)
}
