import { Center } from "@chakra-ui/react"
import { Box, Fab, InputAdornment, Stack, TextField } from "@mui/material"
import Image from "next/image"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Web3Storage } from "web3.storage"
import LitJsSdk from "@lit-protocol/sdk-browser"
import { ethers } from "ethers"
import Tracklist from "../components/Tracklist"
import AddIcon from "@mui/icons-material/Add"
import MediaFooter from "../components/MediaFooter"

export default function MediaUpload() {
	// const [tracklistCounter, setTracklistCounter] = useState(1)
	const [splitCounter, setSplitCounter] = useState(1)
	const [input, setInput] = useState(
		"0x12E618dDA8A05532f5e20286f849a372220B0b60",
	)
	const [selectedImageFile, setSelectedImageFile] = useState(null)
	const [tracklist, setTracklist] = useState([""])
	const [split, setSplit] = useState([{ address: "", percentage: "" }])
	const [percentageError, setPercentageError] = useState(false)
	const [percentHelperText, setPercentHelperText] = useState("")
	const [addressError, setAddressError] = useState(false)
	const [addressHelperText, setAddressHelperTex] = useState("")
	const [royalty, setRoyalty] = useState(0)
	const [author, setAuthor] = useState("")

	function increaseTracks() {
		const data = [...tracklist, ""]
		setTracklist(data)
	}

	function handleTracklistChange(index, event) {
		let data = tracklist
		data[index] = event.target.value
		setTracklist(data)
	}

	function increaseSplit() {
		setSplitCounter(splitCounter + 1)
		setSplit([...split, { address: "", percentage: "" }])
	}

	function splitEvenly() {
		let sumOfSplit = 100
		const individualSplit = Math.floor(sumOfSplit / splitCounter)
		console.log(individualSplit)
		let splitData = [...split]
		for (let i = 0; i < splitData.length; i++) {
			splitData[i].percentage = individualSplit
		}
		setSplit(splitData)
		checkTotalPercentage(splitData)
	}

	function checkTotalPercentage(data) {
		let maxPercentage = 0
		for (let i = 0; i < data.length; i++) {
			const element = Number(data[i].percentage)
			maxPercentage += element
		}
		if (maxPercentage === 100) {
			setPercentageError(false)
			setPercentHelperText("")
		} else {
			setPercentageError(true)
			setPercentHelperText("total percentage should equal 100")
		}
	}

	function checkAddressValidity(data) {
		let isAddressValid = false
		for (let i = 0; i < data.length; i++) {
			if (data[i].address) {
				try {
					isAddressValid = ethers.utils.isAddress(data[i].address.toLowerCase())
				} catch (error) {
					console.log(error)
				}
			}
		}
		if (isAddressValid) {
			setAddressError(false)
			setAddressHelperTex("")
		} else {
			setAddressError(true)
			setAddressHelperTex("Input Valid Address")
		}
	}

	function handleSplitChange(index, event) {
		let data = [...split]
		data[index][event.target.name] = event.target.value
		setSplit(data)
		checkTotalPercentage(data)
		checkAddressValidity(data)
		console.log(split)
	}

	function handleRoyaltyChange(event) {
		if (event.target.value <= 100) {
			setRoyalty(event.target.value)
		}
	}

	const control = [
		{
			conditionType: "evmBasic",
			contractAddress: input,
			standardContractType: "ERC721",
			chain: "ethereum",
			method: "balanceOf",
			parameters: [":userAddress"],
			returnValueTest: {
				comparator: ">=",
				value: "1",
			},
		},
	]
	async function encrypt() {
		const client = new LitJsSdk.LitNodeClient()
		await client.connect()
		window.litNodeClient = client
		const accessControlConditions = control
		const chain = "goerli"

		await client.connect()
		const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
		console.log("Authenticated MEssage:- ")
		console.log(authSig)
		console.log("The selected file- ")
		console.log(selectedImageFile)
		const { zipBlob, encryptedSymmetricKey, symmetricKey } =
			await LitJsSdk.encryptFileAndZipWithMetadata({
				file: selectedImageFile,
				authSig: authSig,
				accessControlConditions: accessControlConditions,
				chain: chain,
				litNodeClient: window.litNodeClient,
				unifiedAccessControlConditions: [accessControlConditions],
			})

		console.log("Symmetric Key :- ")
		console.log(symmetricKey)

		console.log("Encrypted Symmetric Key:-")
		console.log(encryptedSymmetricKey)
		console.log("Enxrypted File")
		console.log(zipBlob)

		return {
			zipBlob,
			encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
				encryptedSymmetricKey,
				"base16",
			),
			accessControlConditions,
		}
	}

	async function uploadIpfs() {
		setLoading(true)
		const token = process.env.NEXT_PUBLIC_WEB3_STORAGE
		const web3Client = new Web3Storage({ token: token })

		console.log("Getting Encrypted FIle and key...")
		const { zipBlob, encryptedSymmetricKey, accessControlConditions } =
			await encrypt()
		console.log("Done getting Encrypted FIle and key")

		console.log("Putting files on ipfs.....")
		const cid = await web3Client.put([new File([zipBlob], "upload.zip")])

		console.log("Uploaded to IPFS successfully. CID is :- ")
		console.log(cid)
		setLoading(false)
		alert(
			`Your Files have been encrypted with LIT and Uploaded to IPFS heres is your CID:- ${cid}`,
		)
	}

	return (
		<div>
			<Navbar />
			<div className="relative top-48 px-1/2 min-w-full">
				<Center>
					<div>
						<h1 className="mb-10 text-3xl font-['DM Sans'] font-medium">
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
										onChange={(e) => {
											setSelectedImageFile(e.target.files[0])
										}}
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
								// onClick={() => console.log("Clicked!")}
							>
								<input
									type="file"
									accept="audio/*"
									className="input_audio"
									hidden
									onChange={(e) => console.log(e)}
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

						{/* <Tracklist setTracklist={setTracklist} tracklist={tracklist} /> */}
						<Stack>
							<h2>Tracklist</h2>
							{tracklist.map((item, index) => {
								return (
									<div key={index}>
										<h2 className="my-5 font-medium text-[#888888] font-['DM Sans'] text-md mx-1">
											Tracklist {index + 1}
										</h2>
										<TextField
											id="outlined-basic"
											label="TrackList"
											variant="outlined"
											name="tracklist"
											// value={item}
											sx={{ width: "52.5rem" }}
											onChange={(event) => handleTracklistChange(index, event)}
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
								type="number"
								max="100"
								value={royalty}
								onChange={(event) => handleRoyaltyChange(event)}
								sx={{ width: "15rem" }}
							/>
						</div>
						<div className="my-20">
							<h2 className="text-3xl font-medium my-10">Splits</h2>

							<Stack>
								{split.map((i, index) => {
									return (
										<div className="flex my-5" key={index}>
											<TextField
												id="outlined-basic"
												label="Wallet / ENS address"
												variant="outlined"
												sx={{ width: "35rem" }}
												name="address"
												value={i.address}
												error={addressError}
												helperText={addressHelperText}
												onChange={(event) => handleSplitChange(index, event)}
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
												// accept=
												name="percentage"
												type="number"
												inputProps={{ inputMode: "numeric", max: "100" }}
												value={i.percentage}
												error={percentageError}
												helperText={percentHelperText}
												onChange={(event) => handleSplitChange(index, event)}
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
							<button
								className="border-4 float-right  rounded-md border-[#222222] px-20 py-4 font-medium text-xl"
								onClick={splitEvenly}
							>
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
									<button
										className="rounded-md border-[#222222] px-20 py-4 font-medium text-xl text-white bg-black"
										onClick={uploadIpfs}
									>
										Upload
									</button>
								</div>
							</div>
						</div>
					</div>
				</Center>
			</div>
			{/* <div className="min-w-full inset-y-2/3 px-10"> */}
			<MediaFooter />
			{/* </div> */}
		</div>
	)
}
