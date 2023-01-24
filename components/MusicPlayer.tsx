import { Center } from "@chakra-ui/react";
import { ClickAwayListener, IconButton } from "@mui/material";
import { MusicPlayerPropInterface } from "../lib/Interfaces";
import { useEffect, useState } from "react";

export default function MusicPlayer(props: MusicPlayerPropInterface) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)

    function playAudio() {
		setIsPlaying(true)
		audio.play()
	}
	function stopAudio() {
		audio.pause()
		setIsPlaying(false)
	}

	useEffect(() => {
		setAudio(new Audio(props.audioFilePath))
	}, [])


    return <ClickAwayListener onClickAway={stopAudio}>
					<div className=" justify-items-center ">
						<img
							src={props.backgroundFilePath}
							className="lg:w-[60.50rem] min-w-full "
						></img>
						<div className="container absolute inset-y-1/3">
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
										/> */}
										<img src="/play_icon.svg"></img>
									</IconButton>
								</Center>
							)}
						</div>
					</div>
				</ClickAwayListener>
}