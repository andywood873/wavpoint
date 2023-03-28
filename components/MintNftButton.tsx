import SmartAccount from "@biconomy/smart-account"
import SocialLogin from "@biconomy/web3-auth"
import { MintNftButtonInterface, TransactionInterface } from "../lib/Interfaces"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useEffect, useState } from "react"
import { Center } from "@chakra-ui/react"
import { ClickAwayListener } from "@mui/material"
import Link from "next/link"
import { ethers } from "ethers"
import { FeeQuote, IWalletTransaction } from "@biconomy/core-types"
import { MintModalTitleEnum, MintModalBodyEnum } from "../lib/Enums"
import MintPageModal from "./MintPageComponents/MintPageModal"

export default function MintNftButton(props: MintNftButtonInterface) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [modalTitle, setModalTitle] = useState<MintModalTitleEnum>()
	const [modalBody, setModalBody] = useState<MintModalBodyEnum>()
	const [modalProgress, setModalProgress] = useState<number>(0)
	const [isError, setIsError] = useState<boolean>(false)
	const [txHash, setTxHash] = useState<string>()

	const handleModalClose = () => {
		setIsModalOpen(false)
		setTxHash("")
		setModalProgress(0)
	}

	// Show modal on click
	async function mintNft() {
		console.log("Starting Mint")
		// console.log(props.smartAccount.address)
		setIsModalOpen(true)
		// Check if wallet is connected
		if (props.smartAccount) {
			try {
				const zoraNFTMintAbi: string[] = [
					"function purchase(uint256 quantity) external payable returns (uint256)",
					"event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)",
				]
				setModalTitle(MintModalTitleEnum.prepareTx)
				setModalBody(MintModalBodyEnum.prepareTx)
				setModalProgress(15)
				const zoraNftMintInterface = new ethers.utils.Interface(zoraNFTMintAbi)
				console.log("Zora Mint Interface Set")
				const data = zoraNftMintInterface.encodeFunctionData("purchase", [1])
				console.log("Transaction data Encoded")
				console.log("Encoded Data")
				console.log(data)
				const signer = props.provider.getSigner()
				console.log(signer)
				const contractAddress = "0x9621eaE8a423f0726963301D84023C3014515464"

				const tx1: TransactionInterface = {
					to: contractAddress,
					data: data,
					value: ethers.utils.parseEther("0.00001"),
				}

				const txs: TransactionInterface[] = []
				txs.push(tx1)
				console.log("Transactions")
				console.log(txs)
				const feeQuotes: FeeQuote[] =
					await props.smartAccount.prepareRefundTransactionBatch({
						transactions: txs,
					})
				console.log("Fee quotes-----")
				console.log(feeQuotes)

				setModalTitle(MintModalTitleEnum.createTx)
				setModalBody(MintModalBodyEnum.createTx)
				setModalProgress(35)

				const transaction: IWalletTransaction =
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
					setTxHash(res.hash)
					console.log(res)
					const events = res.receipt.logs.map((log) => {
						// if (log.topics[0] === createEventTopic) {
						// 	address = splitInterface.decodeEventLog("CreateSplit",log.data,log.topics)
						// }

						try {
							const event = zoraNftMintInterface.decodeEventLog(
								"Transfer",
								log.data,
								log.topics,
							)
							return event
						} catch (error) {
							return
						}
						return
					})
					console.log(events)
					let zoraDrop
					events.forEach((e) => {
						if (e !== undefined) {
							// setZoraDropCreated(true)
							zoraDrop = e
							// console.log(zoraDrop)

							// setZoraDropAddress(e.editionContractAddress)
							// setModalTitle("NFT DROP Created!")
							// setModalBody(
							// `Your NFT has been minted in the address ${e.editionContractAddress}.`,
							// )
						}
					})
					console.log(zoraDrop)
					console.log(zoraDrop._tokenId)
					setModalTitle(MintModalTitleEnum.successTx)
					setModalBody(MintModalBodyEnum.successTx)
					setModalProgress(100)
				})
				const txHash = await props.smartAccount.sendTransaction({
					tx: transaction,
					gasLimit,
				})

				setModalTitle(MintModalTitleEnum.sentTx)
				setModalBody(MintModalBodyEnum.sentTx)
				setModalProgress(65)

				console.log("Transaction Hash")
				console.log(txHash)
				console.log("Transaction log")
				console.log(transaction)
			} catch (error) {
				console.log(error)
				setIsError(true)
				setModalTitle(MintModalTitleEnum.errorTx)
				setModalBody(MintModalBodyEnum.errorTx)
			}
		} else {
			setModalTitle(MintModalTitleEnum.walletNotConnected)
			setIsError(true)
			setModalBody(MintModalBodyEnum.walletNotConnected)
		}

		const style = {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: 400,
			bgcolor: "background.paper",
			border: "2px solid #000",
			boxShadow: 24,
			pt: 2,
			px: 4,
			pb: 3,
		}
	}
	return (
		<div className="cursor-pointer py-5 my-0 px-6 xl:px-0 xl:pb-0">
			{props.isMintPage ? (
				<div>
					<div onClick={mintNft}>
						<img src="/Component 2.png" className="min-w-full" />
					</div>
					<MintPageModal
						setIsError={setIsError}
						handleModalClose={handleModalClose}
						isModalOpen={isModalOpen}
						modalTitle={modalTitle}
						modalBody={modalBody}
						modalProgress={modalProgress}
						txHash={txHash}
						isError={isError}
					/>
				</div>
			) : (
				<Link href={"/drop/cool-contract-Address"}>
					<img src="/Component 2.png" className="min-w-full" />
				</Link>
			)}
		</div>
	)
}
