import { MintNftButtonInterface, TransactionInterface } from "../lib/Interfaces"
import { useState } from "react"

import Link from "next/link"
import { ethers } from "ethers"

import { MintModalTitleEnum, MintModalBodyEnum } from "../lib/Enums"
import MintPageModal from "./MintPageComponents/MintPageModal"
import { usePrivy } from "@privy-io/react-auth"

export default function MintNftButton(props: MintNftButtonInterface) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [modalTitle, setModalTitle] = useState<MintModalTitleEnum>()
	const [modalBody, setModalBody] = useState<MintModalBodyEnum>()
	const [modalProgress, setModalProgress] = useState<number>(0)
	const [isError, setIsError] = useState<boolean>(false)
	const [txHash, setTxHash] = useState<string>()
	const { authenticated, user, ready, signMessage } = usePrivy()
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
		if (authenticated && ready) {
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
				const contractAddress = "0x99De3D08e756eA7DB0AC4B0b3717218d0b519DCC"

				const tx1: TransactionInterface = {
					to: contractAddress,
					data: data,
					value: ethers.utils.parseEther("0.00001"),
				}

				setModalTitle(MintModalTitleEnum.createTx)
				setModalBody(MintModalBodyEnum.createTx)
				setModalProgress(35)
				const embeddedWallet = user.linkedAccounts.find(
					(account) =>
						account.type === "wallet" && account.walletClient === "privy",
				)
				let txReceipt
				if (embeddedWallet) {
					// signMessage(t)
					console.log("Embedded Wallet support yet to come!")
				} else {
					console.log("Creating transaction")
					const txResponse = await signer.sendTransaction(tx1)
					setModalTitle(MintModalTitleEnum.sentTx)
					setModalBody(MintModalBodyEnum.sentTx)
					setModalProgress(65)
					console.log("Sending traction")
					txReceipt = await txResponse.wait(1)
					console.log(txReceipt)
				}

				const events = txReceipt.logs.map((log) => {
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
						zoraDrop = e
					}
				})
				console.log(zoraDrop)
				console.log(zoraDrop._tokenId)
				setModalTitle(MintModalTitleEnum.successTx)
				setModalBody(MintModalBodyEnum.successTx)
				setModalProgress(100)
				// })
				// const txHash = await props.smartAccount.sendTransaction({
				// 	tx: transaction,
				// 	gasLimit,
				// })

				console.log("Transaction Hash")
				console.log(txHash)
				console.log("Transaction log")
				// console.log(transaction)
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
