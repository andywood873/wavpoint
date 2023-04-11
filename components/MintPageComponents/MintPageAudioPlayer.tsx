import { useContext, useEffect, useState } from "react"
import { MintPageAudioPlayerContext } from "../context/MintPageAudioPlayerContext"
import { Slider } from "@mui/material"

export default function MintPageAudioPlayer() {
	const { isPlaying, audio, setIsPlaying } = useContext(MintPageAudioPlayerContext)
	const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
	const [time, setTime] = useState<number>(0)

	const handleSliderChange = () => {}
	useEffect(() => {
		if (isPlaying) {
			setIntervalId(
				setInterval(() => {
					setTime(audio.currentTime)
					if (audio.ended) {
						setIsPlaying(false)
					}
				}, 1000),
			)
		}
		if (!isPlaying) {
			clearInterval(intervalId)
		}
	}, [isPlaying])
	return (
		<div className="relative container top-[18rem] md:top-[10rem] w-full px-[2.2rem] xl:px-0">
			<h1 className="text-4xl text-left m-0 md:text-3xl md:text-4xl lg:text-5xl xl:pb-10">Jamiroquai</h1>
			<p className="text-2xl md:text-lg lg:text-2xl text-left mt-5 text-[#888888] xl:mt-20">
				Recorded: Chillington
			</p>
			<div className="min-w-full mt-10 flex items-center  md:text-lg lg:text-2xl">
				{/* <audio
					controls
					src="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
					className="min-w-full text-white"
				></audio> */}
				<span>
					{Math.trunc(time / 60)}:{Math.trunc(time % 60)}
				</span>
				<Slider
					size="small"
					value={time}
					aria-label="Small"
					// valueLabelDisplay="auto"
					min={0}
					max={audio ? audio.duration : 1}
					className="mx-5"
					onChange={(event: Event, value: number): void => {
						audio.currentTime = value
					}}
				/>
				<span>
					{audio
						? Math.trunc(audio.duration / 60) +
						  ":" +
						  Math.trunc(audio.duration % 60)
						: 0}
				</span>
			</div>
		</div>
	)
}
