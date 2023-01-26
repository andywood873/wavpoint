import { Center } from "@chakra-ui/react";
import { ClickAwayListener, IconButton } from "@mui/material";
import { MusicPlayerPropInterface } from "../lib/Interfaces";
import { useContext, useEffect, useState } from "react";
import { MintPageAudioPlayerContext } from "./context/MintPageAudioPlayerContext";

export default function MusicPlayer(props: MusicPlayerPropInterface) {
    const {playAudio,isPlaying,stopAudio,changeAudio} = useContext(MintPageAudioPlayerContext)

	useEffect(() => {
		const newAudio = new Audio(props.audioFilePath)
		changeAudio(newAudio)
	}, [])


    return <ClickAwayListener onClickAway={props.isClickAway? ():void =>{}: stopAudio}>
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