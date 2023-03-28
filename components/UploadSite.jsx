import { Center, useDisclosure } from "@chakra-ui/react"
import {
	Box,
	Fab,
	InputAdornment,
	Stack,
	Switch,
	TextField,
} from "@mui/material"
import Image from "next/image"
import { useContext, useState } from "react"
import Navbar from "./Navbar"
import { Web3Storage } from "web3.storage"
import LitJsSdk from "@lit-protocol/sdk-browser"
import { ethers } from "ethers"
import AddIcon from "@mui/icons-material/Add"
import MediaFooter from "./MediaFooter"
import MintModal from "./MintModal"
import { MintPageContext } from "./context/MintPageContext"
export default function UploadSite(props) {
	// const [tracklistCounter, setTracklistCounter] = useState(1)
	const {provider, account, smartAccount, socialLoginSDK} = useContext(MintPageContext)
	const [splitCounter, setSplitCounter] = useState(1)
	const [input, setInput] = useState(
		"0x12E618dDA8A05532f5e20286f849a372220B0b60",
	)
	const [selectedImageFile, setSelectedImageFile] = useState(null)
	const [selectedAudioFile, setSelectedAudioFile] = useState(null)
	const [tracklist, setTracklist] = useState([{trackId:"",startTimestamp:""}])
	const [split, setSplit] = useState([{ address: "", percentage: "" }])
	const [percentageError, setPercentageError] = useState(false)
	const [percentHelperText, setPercentHelperText] = useState("")
	const [addressError, setAddressError] = useState(false)
	const [addressHelperText, setAddressHelperTex] = useState("")
	const [royalty, setRoyalty] = useState(0)
	const [artist, setArtist] = useState("")
	const [description, setDescription] = useState("")
	const [recordingLocation, setRecordingLocation] = useState("")
	const [isPrivate, setIsPrivate] = useState(true)
	const [splitCreated, setSplitCreated] = useState(false)
	const [splitAddress, setSplitAddress] = useState("")
	const [zoraDropCreated, setZoraDropCreated] = useState(false)
	const [zoraDropAddress, setZoraDropAddress] = useState("")
	const [imageIpfs, setImageIpfs] = useState("")
	const [audioIpfs, setAudioIpfs] = useState("")
	const [metadataIpfs, setMetadaIpfs] = useState("")
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalTitle, setModalTitle] = useState("")
	const [modalBody, setModalBody] = useState("")
	const [modalProgress, setModalProgress] = useState(0)
	const [isError, setIsError] = useState(false)

	const handleModalClose = () => {
		setIsModalOpen(false)
	}
	const handleModalOpen = () => {
		setIsModalOpen(true)
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

	function handleArtistChange(event) {
		setArtist(event.target.value)
	}

	function handleDescriptionChange(event) {
		setDescription(event.target.value)
	}

	function handleRecordingLocationChange(event) {
		setRecordingLocation(event.target.value)
	}

	function increaseTracks() {
		const data = [...tracklist, {trackId:"",startTimestamp:""}]
		setTracklist(data)
	}

	function handleTracklistChange(index, event) {
		let data = tracklist
		data[index].trackId = event.target.value
		console.log(data)
		setTracklist(data)
	}

	function handleStartTimestampChange(index, event) {
		let data = tracklist
		data[index].startTimestamp = event.target.value
		console.log(data)
		setTracklist(data)
	}

	function handlePrivacyChange(event) {
		setIsPrivate(event.target.checked)
		console.log(isPrivate)
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

	async function checkAddressValidity(data) {
		let isAddressValid = false

		if (data.address) {
			try {
				isAddressValid = ethers.utils.isAddress(data.address.toLowerCase())
			} catch (error) {
				console.log(error)
			}
			const split = data.address.split(".")
			console.log(split)
			console.log(split[split.length - 1])
			let isEns = false
			if (split[split.length - 1].toLowerCase() === "eth") {
				isEns = true
			}
			if (!isAddressValid && isEns) {
				try {
					const provider = ethers.getDefaultProvider("homestead")
					const resolver = await provider.resolveName(
						data.address.toLowerCase(),
					)
					isAddressValid = ethers.utils.isAddress(resolver.toLowerCase())
					if (isAddressValid === undefined) {
						isAddressValid = false
					}
					console.log(isAddressValid)
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
			setAddressHelperTex("One invalid Address")
			return isAddressValid
		}
		return isAddressValid
	}

	function handleSplitChange(index, event) {
		let data = [...split]
		data[index][event.target.name] = event.target.value
		setSplit(data)
		checkTotalPercentage(data)
		console.log(split)
	}

	function handleRoyaltyChange(event) {
		if (event.target.value <= 100) {
			setRoyalty(event.target.value)
		}
	}

	async function upload() {
		const json = {
			image: selectedImageFile,
			audio: selectedAudioFile,
			artist: artist,
			description: description,
			tracklist: tracklist,
			loaction: recordingLocation,
			royalty: royalty,
			split: split,
		}
		console.log(json)
		let isAddressValid = false
		for (let i = 0; i < split.length; i++) {
			console.log("Checking Address of - " + split[i].address)
			isAddressValid = await checkAddressValidity(split[i]).then(
				(value) => value,
			)
			console.log("Address validity - ")
			console.log(isAddressValid)
			if (isAddressValid === false) {
				return
			}
		}

		console.log("Checked Addresses")
		if (!(imageIpfs && audioIpfs)) {
			if (isPrivate) {
				// const { zipBlob, encryptedSymmetricKey, accessControlConditions } =
				// 	await encrypt(selectedAudioFile, true)
				// console.log(encryptedSymmetricKey)
				// console.log("Encrypted Audio Zip Blob ....")
				// console.log(zipBlob)
				// console.log("Encrypted Audio file!!")
				handleModalOpen()
				setIsError(false)
				setModalTitle("Encrypting with LIT...")
				setModalBody(
					"Encrypting the tracks and timestamps with LIT protocol....",
				)
				setModalProgress(10)
				const tracklistJsonString = JSON.stringify(tracklist)
				console.log(tracklistJsonString)
				const {
					encryptedString: tracklistEncrypted,
					encryptedSymmetricKey: encryptedSymmetricKey2,
				} = await encrypt(tracklistJsonString, false)
				console.log(encryptedSymmetricKey2)
				console.log("Encrypted tracklist Zip Blob ....")
				console.log(tracklistEncrypted)
				console.log("Encrypted Tracklist file!!")
				
				setIsError(false)
				setModalTitle("Uploading to IPFS...")
				setModalBody(
					"Uploading your content to IPFS, please wait while we do some crypto magic in the background",
				)
				setModalProgress(33)
				// const audioCid = await uploadToIpfs(selectedAudioFile, "audio")
				// const imageCid = await uploadToIpfs(selectedImageFile, "image")

				const tracklistText = await new Response(tracklistEncrypted).text()

				const metadataJson = {
					// image: "ipfs://" + imageCid,
					description: description,
					name: "WAVPOINT"+props.nameNum,
					// animationUrl: "ipfs://" + audioCid,
					tracklist: tracklistText,
					location: recordingLocation,
					encryptedSymmetricKeyForTracklist: encryptedSymmetricKey2,
					artist: artist
				}
				const metadataBlob = new Blob([JSON.stringify(metadataJson)])

				console.log(metadataJson)
				const {cid:metadataCid, audioURI:audioCid, imageURI:imageCid} = await uploadToIpfs([metadataBlob,selectedImageFile, selectedAudioFile], "data")
				console.log("Type of selectedImage- ")
				console.log(selectedImageFile.type)
				console.log("Type of selectedAudio- ")
				console.log(selectedAudioFile.type);
				console.log(audioCid)
				setAudioIpfs(audioCid)
				console.log(imageCid)
				setImageIpfs(imageCid)
				console.log(metadataCid)
				setMetadaIpfs(metadataCid)
				createSplit().then(async (address) => {
					await dropZoraNft(address)
				})
			} else {
				handleModalOpen()
				setIsError(false)
				setModalTitle("Uploading to IPFS...")
				setModalBody(
					"Uploading your content to IPFS, please wait while we do some crypto magic in the background",
				)
				setModalProgress(33)
				// const audioCid = await uploadToIpfs(selectedAudioFile, "audio")
				// const imageCid = await uploadToIpfs(selectedImageFile, "image")
				const metadataJson = {
					// image: "ipfs://" + imageCid,
					description: description,
					name: "WAVPOINT"+props.nameNum,
					// animationUrl: "ipfs://" + audioCid,
					tracklist: JSON.stringify(tracklist),
					location: recordingLocation,
					encryptedSymmetricKeyForTracklist: null,
					artist: artist
				}
				const metadataBlob = new Blob([JSON.stringify(metadataJson)])
				console.log(metadataJson)
				const {cid:metadataCid, audioURI:audioCid, imageURI:imageCid} = await uploadToIpfs(metadataBlob, "metadata.json")
				console.log(audioCid)
				setAudioIpfs(audioCid)
				console.log(imageCid)
				setImageIpfs(imageCid)
				console.log(metadataCid)
				setMetadaIpfs(metadataCid)
				createSplit().then(async (address) => {
					await dropZoraNft(address)
				})
			}
		} else {
			handleModalOpen()
			setIsError(false)
			createSplit().then(async (address) => {
				await dropZoraNft(address)
			})
		}
	}

	async function dropZoraNft(splitAddressFromPromise) {
		console.log("Starting Zora NFT drop....")
		if (splitAddressFromPromise) {
			// const date = new Date()
			setModalTitle("Creating Zora Drops...")
			setModalBody(
				"Setting up NFT drop, please wait while we do some crypto magic in the background",
			)
			setModalProgress(90)
			try {
				const saleConfiguration = {
					publicSaleStart: 0,
					publicSaleEnd:
						Math.floor(new Date().getTime() / 1000) + 31 * 24 * 60 * 60,
					presaleStart: 0,
					presaleEnd: 0,
					publicSalePrice: ethers.utils.parseEther("0.00001"),
					maxSalePurchasePerAddress: 200,
					presaleMerkleRoot:
						"0x0000000000000000000000000000000000000000000000000000000000000000",
				}
				console.log(saleConfiguration)
				console.log("Sales Configs set.....")
				const name = "WAVTHEORY"+props.nameNum
				const symbol = "WAV"+props.nameNum
				const defaultAdmin = props.smartAccount.address
				const editionSize = 200
				const royaltyBps = parseInt(royalty) * 100
				const fundsRecipient = splitAddressFromPromise
				const nftDescription = description
				const metadataUrl = metadataIpfs + "/metadata.json"
				const animationUrl = audioIpfs
				const imageUrl = imageIpfs
				console.log("Inputs Set....")
				const zoraDropInterface = new ethers.utils.Interface([
					"event CreatedDrop(address indexed creator, address indexed editionContractAddress, uint256 editionSize)",
					"function createEdition(string name, string symbol, uint64 editionSize, uint16 royaltyBPS, address fundsRecipient, address defaultAdmin, tuple(uint104 publicSalePrice, uint32 maxSalePurchasePerAddress, uint64 publicSaleStart, uint64 publicSaleEnd, uint64 presaleStart, uint64 presaleEnd, bytes32 presaleMerkleRoot) saleConfig, string description, string animationURI, string imageURI)",
				])
				console.log({
					name: name,
					symbol: symbol,
					defaultAdmin: defaultAdmin,
					editionSize: editionSize,
					royaltyBps: royaltyBps,
					fundsRecipient: fundsRecipient,
					nftDescription: nftDescription,
					animationUrl: animationUrl,
					imageUrl: imageUrl,
					saleConfiguration: saleConfiguration,
				})
				console.log("Zora Interface set....")
				const data = zoraDropInterface.encodeFunctionData("createEdition", [
					name,
					symbol,
					editionSize,
					royaltyBps,
					fundsRecipient,
					defaultAdmin,
					saleConfiguration,
					nftDescription,
					animationUrl,
					imageUrl,
				])
				console.log("Smart contract address")
				console.log(props.smartAccount.address)
				console.log("Encoded data")
				console.log(data)
				const tx1 = {
					to: "0xe31cccae5000C6B2361dd58316677d39685f50EB",
					data: data,
				}
				const txs = []
				txs.push(tx1)
				console.log("Transactions")
				console.log(txs)
				const feeQuotes =
					await props.smartAccount.prepareRefundTransactionBatch({
						transactions: txs,
					})
				console.log("Fee quotes-----")
				console.log(feeQuotes)
				const transaction =
					await props.smartAccount.createRefundTransactionBatch({
						transactions: txs,
						feeQuote: feeQuotes[0],
					})
				console.log("Created Transaction")
				console.log(transaction)
				let gasLimit = {
					hex: "0x1E8480",
					type: "hex",
				}

				props.smartAccount.on("txHashGenerated", (res) => {
					console.log("Generated txHash:- ")
					console.log(res.hash)
				})

				props.smartAccount.on("txMined", (res) => {
					console.log("Tx Mined:- ")
					console.log(res.hash)
					console.log(res)
					const events = res.receipt.logs.map((log) => {
						// if (log.topics[0] === createEventTopic) {
						// 	address = splitInterface.decodeEventLog("CreateSplit",log.data,log.topics)
						// }
						try {
							return zoraDropInterface.decodeEventLog(
								"CreatedDrop",
								log.data,
								log.topics,
							)
						} catch (error) {
							return
						}
						return
					})
					console.log(events)
					let zoraDrop
					events.forEach((e) => {
						if (e !== undefined) {
							setZoraDropCreated(true)
							zoraDrop = e
							setZoraDropAddress(e.editionContractAddress)
							setModalTitle("NFT DROP Created!")
							setModalBody(
								`Your NFT has been minted in the address ${e.editionContractAddress}.`,
							)
						}
					})
					console.log(zoraDrop)
					console.log(zoraDropAddress)
					setModalProgress(100)
				})
				console.log("Sending to relayer")
				// transaction.nonce = transaction.nonce + 1
				const txHash = await props.smartAccount.sendTransaction({
					tx: transaction,
					gasLimit,
				})

				console.log("Transaction Hash")
				console.log(txHash)
				console.log("Transaction log")
				console.log(transaction)
			} catch (error) {
				console.error("Something went wrong")
				console.log(error)
				setIsError(true)
				setModalBody(
					`We ran into some problem. Please ensure there is adequete ETH for gas fees in your smart contract wallet- ${props.smartAccount.address} or contact our support`,
				)
			}
		} else {
			console.log("Split Not created or Smart Account not connected!!!")
		}
	}

	function createSplit() {
		console.log("Starting SPlit creation.....")
		return new Promise(async (resolve, reject) => {
			if (props.provider) {
				if (!splitAddress) {
					setModalTitle("Creating Split....")
					setModalBody(
						"Setting up Splits, please wait while we do some crypto magic in the background",
					)
					setModalProgress(60)
					console.log("Provider is true")
					// const provider = props.provider
					// console.log(provider)
					// const signer = provider.getSigner()
					console.log("Got signer...")
					// console.log(signer)

					console.log("initialised Splits Client")

					try {
						const splitInterface = new ethers.utils.Interface([
							"function createSplit(address[] accounts, uint32[] percentAllocations, uint32 distributorFee, address controller)",
							"event CreateSplit(address indexed split, address[] accounts, uint32[] percentAllocations, uint32 distributorFee, address controller)",
						])
						console.log(props.smartAccount.address)
						let addressList = []
						console.log("Came till split address")

						console.log("Passed address")
						split.sort(function (a, b) {
							return a.address - b.address
						})
						console.log("Split Sorted! ....")
						console.log(split)
						let percentAllocation = []
						split.forEach((i) => {
							addressList.push(i.address)
							percentAllocation.push(parseInt(i.percentage) * 1e4)
						})
						console.log("Address List-  ")
						console.log(addressList)
						console.log("Percentage")
						console.log(percentAllocation)

						const distributorFee = 20000
						const controller = "0xB721347D2938a5594a12DF5Cc36D598b839Cb98f"
						const data = splitInterface.encodeFunctionData("createSplit", [
							addressList,
							percentAllocation,
							distributorFee,
							controller,
						])
						const tx1 = {
							to: "0x2ed6c4B5dA6378c7897AC67Ba9e43102Feb694EE",
							data: data,
						}
						const txs = []
						txs.push(tx1)

						const feeQuotes =
							await props.smartAccount.prepareRefundTransactionBatch({
								transactions: txs,
							})
						console.log("Fee quotes-----")
						console.log(feeQuotes)
						const transaction =
							await props.smartAccount.createRefundTransactionBatch({
								transactions: txs,
								feeQuote: feeQuotes[0],
							})
						console.log("Created Transaction")
						console.log(transaction)
						let gasLimit = {
							hex: "0x1E8480",
							type: "hex",
						}
						const createEventTopic = splitInterface.getEventTopic("CreateSplit")
						props.smartAccount.on("txHashGenerated", (res) => {
							console.log("Generated txHash:- ")
							console.log(res.hash)
						})
						let address
						props.smartAccount.on("txMined", (res) => {
							console.log("Tx Mined:- ")
							console.log(res.hash)
							console.log(res)
							// const tx = props.provider.getTransactionReceipt(res.hash)
							// console.log("Transaction- ")
							// console.log(tx)
							console.log("Event topic -----")
							console.log(createEventTopic)
							const events = res.receipt.logs.map((log) => {
								try {
									return splitInterface.decodeEventLog(
										"CreateSplit",
										log.data,
										log.topics,
									)
								} catch (error) {
									return
								}
								return
							})
							console.log(events)
							events.forEach((e) => {
								if (e !== undefined) {
									address = e.split
								}
								console.log("Address")
								console.log(address)
								setSplitAddress(address)
								setSplitCreated(true)
								resolve(address)
							})
						})
						console.log("Sending to relayer")
						const txHash = await props.smartAccount.sendTransaction({
							tx: transaction,
							gasLimit,
						})

						console.log("Transaction Hash")
						console.log(txHash)
						console.log("Transaction log")
						console.log(transaction)
						//   await tx
					} catch (error) {
						console.warn("Rejected transaction or someting happended")
						console.log(error)
						setIsError(true)
						setModalBody(
							`We ran into some problem. Please ensure there is adequete ETH for gas fees in your smart contract wallet- ${props.smartAccount.address} or contact our support`,
						)
					}
				} else if (splitAddress) {
					resolve(splitAddress)
				}
			} else {
				console.log("Connect Wallet Come on guys")
				reject("Some error")
			}
		})
	}

	async function encrypt(selectedFile, isZip) {
		setModalTitle("Encrypting Content")
		setModalBody("Encrypting your Content Using LIT Protocol...")
		setModalProgress(15)
		const client = new LitJsSdk.LitNodeClient()
		await client.connect()
		window.litNodeClient = client
		const accessControlConditions = control
		const chain = "mumbai"

		await client.connect()
		const provider2 = new ethers.providers.Web3Provider(
			socialLoginSDK.provider,
		);
		const address = ethers.utils.getAddress(account).toLowerCase()
		const authSig = await LitJsSdk.signAndSaveAuthMessage({web3:provider, chainId:"80001",account:address })
		// await LitJsSdk.checkAndSignAuthMessage({ chain })
		console.log("Authenticated MEssage:- ")
		console.log(authSig)
		console.log("The selected file- ")
		console.log(selectedFile)
		if (isZip) {
			const { zipBlob, encryptedSymmetricKey, symmetricKey } =
				await LitJsSdk.encryptFileAndZipWithMetadata({
					file: selectedFile,
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
			}
		} else {
			const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
				selectedFile,
			)

			const encryptedSymmetricKey =
				await window.litNodeClient.saveEncryptionKey({
					accessControlConditions: accessControlConditions,
					symmetricKey,
					authSig,
					chain,
				})
			console.log("Symmetric Key :- ")
			console.log(symmetricKey)

			console.log("Encrypted Symmetric Key:-")
			console.log(encryptedSymmetricKey)

			console.log("Enxrypted File")
			console.log(encryptedString)

			return {
				encryptedString,
				encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
					encryptedSymmetricKey,
					"base16",
				),
			}
		}
	}

	async function uploadToIpfs(zipBlob, fileName) {
		// setLoading(true)
		const token = process.env.NEXT_PUBLIC_WEB3_STORAGE
		const web3Client = new Web3Storage({ token: token })

		console.log("Getting Encrypted FIle and key...")
		// const { zipBlob, encryptedSymmetricKey, accessControlConditions } =
		// await encrypt()
		console.log("Done getting Encrypted FIle and key")
		let imageType = zipBlob[1].type.split("/")[1]
		// const imageExtension = 
		console.log(imageType);
		if (imageType.includes("svg")) {
			imageType = "svg"
		}
		const audioType = zipBlob[2].type.split("/")[1]
		console.log(audioType);
		console.log("Putting files on ipfs.....")
		const imageFileName = "image"+"."+imageType
		const audioFileName = "audio"+"."+audioType
		const files = [new File([zipBlob[0]], "metadata.json"), new File([zipBlob[1]],imageFileName), new File([zipBlob[2]],audioFileName)]
		const cid = await web3Client.put(files)
		console.log("Uploaded to IPFS successfully. CID is :- ")
		console.log(cid)
		const audioFileURI = "ipfs://"+cid+"/"+audioFileName
		const imageFileURI = "ipfs://"+cid+"/"+imageFileName
		console.log("audioURI")
		console.log(audioFileURI)
		console.log("imageUri")
		console.log(imageFileURI);
		setAudioIpfs(audioFileURI)
		setImageIpfs(imageFileURI)
		// setLoading(false)
		return {cid:cid, audioURI:audioFileURI, imageURI:imageFileURI}
	}
	// console.log(props.smartAccount.address)
	// console.log(1e6);
	return (
		<div>
			<Navbar
				account={props.account}
				connectWeb3={props.connectWeb3}
				disconnectWeb3={props.disconnectWeb3}
				smartAccount={props.smartAccount}
				socialLoginSDK={props.socialLoginSDK}
			/>
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
											value={artist}
											onChange={(event) => handleArtistChange(event)}
										/>
										<TextField
											id="outlined-basic"
											label="Description"
											multiline
											rows={5}
											variant="outlined"
											sx={{ width: "35rem" }}
											value={description}
											onChange={(event) => handleDescriptionChange(event)}
										/>
									</Stack>
								</div>
							</Box>
							<div className=" border-2 ml-10 rounded-lg w-[14.8rem] h-[14.8rem]">
								<div
									onClick={() => document.querySelector(".input_image").click()}
								>
									{selectedImageFile ? (
										<Center>
											<img
												className="-z-1"
												src={URL.createObjectURL(selectedImageFile)}
												alt={"image preview"}
											/>
										</Center>
									) : (
										<div className="py-10 px-7">
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
										</div>
									)}

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
							>
								<input
									type="file"
									accept="audio/*"
									className="input_audio"
									hidden
									onChange={(e) => {
										setSelectedAudioFile(e.target.files[0])
									}}
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
									{selectedAudioFile ? (
										<p className="font-medium text-center font-['DM Sans'] mx-2.5">
											{selectedAudioFile.name}
										</p>
									) : null}
								</Center>
							</div>
						</div>

						<Stack>
							<h2>Track IDs</h2>
							{tracklist.map((item, index) => {
								return (
									<div key={index}>
										<h2 className="my-5 font-medium text-[#888888] font-['DM Sans'] text-md mx-1">
											Track ID- {index + 1}
										</h2>
										<div>
											<TextField
												id="outlined-basic"
												label="Track ID"
												variant="outlined"
												name="tracklist"
												// value={item}
												sx={{ width: "35rem" }}
												onChange={(event) =>
													handleTracklistChange(index, event)
												}
											/>
											<TextField 
											id="outlined-basic"
											label="Start Timestamp"
											variant="outlined"
											name="startTimetstamp"
											onChange={(event) => handleStartTimestampChange(index,event)}
											// sx={{marginLeft:"3rem"}}
											/>
										</div>
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
								value={recordingLocation}
								onChange={(event) => handleRecordingLocationChange(event)}
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
						<div className="flex my-10 float-right inline-block items-center">
							<span className="mx-5">
								Audio and Track ID accesible only by collection holders?
							</span>
							<Switch
								checked={isPrivate}
								onChange={handlePrivacyChange}
								inputProps={{ "aria-label": "controlled" }}
							/>
						</div>
						<div className="my-36">
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
							<p className="font-medium my-10 text-right ">
								<span className="cursor-pointer" onClick={increaseSplit}>
									Add more+
								</span>
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
										Cancel
									</button>
									<button
										className="rounded-md border-[#222222] px-20 py-4 font-medium text-xl text-white bg-black"
										onClick={upload}
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

			<MintModal
				isModalOpen={isModalOpen}
				handleModalOpen={handleModalOpen}
				handleModalClose={handleModalClose}
				modalTitle={modalTitle}
				modalBody={modalBody}
				modalProgress={modalProgress}
				isError={isError}
				setIsError={setIsError}
				zoraDropAddress={zoraDropAddress}
				zoraDropCreated={zoraDropCreated}
			/>
		</div>
	)
}
