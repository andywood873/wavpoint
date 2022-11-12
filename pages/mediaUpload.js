import { Center } from "@chakra-ui/react"
import { Label } from "@mui/icons-material"
import {
	Box,
	Fab,
	FormControl,
	InputAdornment,
	Stack,
	TextField,
} from "@mui/material"
import Image from "next/image"
import { useState } from "react"
import Navbar from "../components/Navbar"
import AddIcon from "@mui/icons-material/Add"
import Link from "next/link"
import Footer from "../components/Footer"

export default function MediaUpload() {
	const [tracklistCounter, setTracklistCounter] = useState(1)
	const [splitCounter, setSplitCounter] = useState(1)
	function increaseTracks() {
		setTracklistCounter(tracklistCounter + 1)
	}

	function increaseSplit() {
		setSplitCounter(splitCounter + 1)
	}
	return (
		<div>
			<Navbar />
			<div className="absolute top-48 px-1/2 min-w-full">
				<Center>
					<div>
						<h1 className="mb-5 text-3xl font-['DM Sans'] font-medium">
							Media Upload
						</h1>
						<div className="flex">
							<Box component="form" autoComplete="off" sx={{}}>
								<div className="min-w-full">
									<Stack gap={4}>
										<TextField
											id="outlined-basic"
											label="Artist Name"
											variant="outlined"
											sx={{ width: "35rem" }}
										/>
										<TextField
											id="outlined-basic"
											label="Description"
											multiline
											rows={5}
											variant="outlined"
											sx={{ width: "35rem" }}
										/>
									</Stack>
								</div>
							</Box>
							<div className="py-10 px-7 border-2 ml-10 rounded-lg w-[14.8rem] h-[14.8rem]">
								<div
									onClick={() => document.querySelector(".input_image").click()}
								>
									<Center className="mb-5">
										<Image
											src="/icon-upload.svg"
											width={30}
											height={30}
											alt="upload icon"
										></Image>
									</Center>

									<p className="font-medium text-center font-['DM Sans']">
										Upload or drag & drop artwork
									</p>
									<p className="text-[#888888] text-center font-['DM Sans']">
										.JPEG, .PNG or .GIF max 50 MB
									</p>
									<input
										className="input_image"
										accept="image/*"
										type="file"
										hidden
									/>
								</div>
							</div>
						</div>
						<div className="my-10">
							<h2 className="font-medium text-[#888888] font-['DM Sans'] text-md mx-1">
								Audio
							</h2>
							<div
								className="ml-0 my-5 py-5 px-7 border-2 ml-10 rounded-lg w-[52.55rem] h-[5rem]"
								onClick={() => document.querySelector(".input_audio").click()}
							>
								<input
									type="file"
									accept="audio/*"
									className="input_audio"
									hidden
								/>
								<Center>
									<Image
										src="/icon-upload.svg"
										width={30}
										height={30}
										alt="upload icon"
									></Image>
									<p className="font-medium text-center font-['DM Sans'] mx-2.5">
										Upload or drag & drop artwork
									</p>
									<p className="text-[#888888] text-center font-['DM Sans'] mx-2.5">
										.MP3 or .WAV
									</p>
								</Center>
							</div>
						</div>
						<Stack>
							{Array.from(Array(tracklistCounter)).map((i, index) => {
								return (
									<div key={i}>
										<h2 className="my-5 font-medium text-[#888888] font-['DM Sans'] text-md mx-1">
											Tracklist {index + 1}
										</h2>
										<TextField
											id="outlined-basic"
											label=""
											variant="outlined"
											sx={{ width: "52.5rem" }}
										/>
									</div>
								)
							})}
							<div className="mt-5">
								<Fab size="small">
									<AddIcon onClick={increaseTracks} />
								</Fab>
							</div>
						</Stack>

						<div className="my-10 flex">
							<TextField
								label="Recording Location"
								id="outlined-start-adornment"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">
											City, Neighborhood, Nightclub
										</InputAdornment>
									),
								}}
								sx={{ width: "35rem" }}
								className="mr-10"
							/>
							<TextField
								label="Royalty"
								id="outlined-start-adornment"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">%</InputAdornment>
									),
								}}
								sx={{ width: "15rem" }}
							/>
						</div>
						<div className="my-20">
							<h2 className="text-3xl font-medium my-10">Splits</h2>

							<Stack>
								{Array.from(Array(splitCounter)).map((i, index) => {
									return (
										<div className="flex my-5" key={i}>
											<TextField
												id="outlined-basic"
												label="Wallet / ENS address"
												variant="outlined"
												sx={{ width: "35rem" }}
												className="mr-10"
											/>
											<TextField
												label="Percentage"
												id="outlined-start-adornment"
												InputProps={{
													endAdornment: (
														<InputAdornment position="start">%</InputAdornment>
													),
												}}
												sx={{ width: "15rem" }}
											/>
										</div>
									)
								})}
							</Stack>
							<p
								className="font-medium my-10 text-right cursor-pointer"
								onClick={increaseSplit}
							>
								Add more+
							</p>
							<button className="border-4 float-right  rounded-md border-[#222222] px-20 py-4 font-medium text-xl">
								Split Evenly
							</button>
						</div>
						<div className="border-t-4 my-44 py-20">
							<div className="float-right">
								<div className="flex ">
									<button className="rounded-md border-[#222222] px-20 py-4 font-medium text-xl">
										{" "}
										Cancel
									</button>
									<button className="rounded-md border-[#222222] px-20 py-4 font-medium text-xl text-white bg-black">
										Upload
									</button>
								</div>
							</div>
						</div>
					</div>
				</Center>
			</div>
			<div className="mt-[30rem]">
				<Footer />
			</div>
		</div>
	)
}
