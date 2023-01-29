import SmartAccount from "@biconomy/smart-account"
import SocialLogin from "@biconomy/web3-auth"
import { MintNftButtonInterface } from "../lib/Interfaces"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useEffect, useState } from "react"
import { Center } from "@chakra-ui/react"
import { ClickAwayListener } from "@mui/material"
import Link from "next/link"
import { ethers } from "ethers"

export default function MintNftButton(props: MintNftButtonInterface) {
	// Show modal on click
	async function mintNft() {
		console.log("Starting Mint")
		console.log(props.smartAccount.address)

		try {
			const zoraNFTMintAbi = [
				"function purchase(uint256 quantity) external payable returns (uint256)",
			]
			const zoraNftMintInterface = new ethers.utils.Interface(zoraNFTMintAbi)
			console.log("Zora Mint Interface Set")
			const data = zoraNftMintInterface.encodeFunctionData("purchase", [1])
			console.log("Transaction data Encoded")
			console.log("Encoded Data")
			console.log(data)
			const signer = props.provider.getSigner()
			console.log(signer)
			const contractAddress = "0xF7cE2375478Ac0CE9d010482497C9a8f09fdFEC1"
			// console.log(ethers.utils.parseEther("1"));

			// const gasLimit = {
			// 			_hex: "0x1E8480",
			// 			_isBigNumber: true,
			// 		}
			// const tx = await nftContract.purchase(1)
			const tx1 = {
				to: contractAddress,
				data: data,
				value: ethers.utils.parseEther("0.00001"),
			}
			// console.log("Sending transaction....")
			// const tx = await signer.sendTransaction()
			// console.log("Transaction sent")
			// console.log(tx)

			const txs = []
			txs.push(tx1)
			console.log("Transactions")
			console.log(txs)
			const feeQuotes = await props.smartAccount.prepareRefundTransactionBatch({
				transactions: txs,
			})
			console.log("Fee quotes-----")
			console.log(feeQuotes)
			const transaction = await props.smartAccount.createRefundTransactionBatch(
				{
					transactions: txs,
					feeQuote: feeQuotes[0],
				},
			)
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
						return zoraNftMintInterface.decodeEventLog(
							"purchase",
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
				// console.log(zoraDropAddress)
				// setModalProgress(100)
			})
			const txHash = await props.smartAccount.sendTransaction({
				tx: transaction,
				gasLimit,
			})

			console.log("Transaction Hash")
			console.log(txHash)
			console.log("Transaction log")
			console.log(transaction)
		} catch (error) {
			console.log(error)
		}
	}
	// Check if wallet is connected
	// If connected check for balance in address
	// if required balance in address create transaction and mint
	// if any error in creating transaction show error
	// if not enough balance, show not enough balance error
	// if wallet not connected show wallet not connected

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

	return (
		<div className="cursor-pointer py-5 my-0 px-6">
			{props.isMintPage ? (
				<div onClick={mintNft}>
					<img src="/Component 2.png" className="min-w-full" />
				</div>
			) : (
				<Link href={"/drop/cool-contract-Address"}>
					<img src="/Component 2.png" className="min-w-full" />
				</Link>
			)}
		</div>
	)
}
