import SmartAccount from "@biconomy/smart-account"
import SocialLogin from "@biconomy/web3-auth"
import { MintNftButtonInterface } from "../lib/Interfaces"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useEffect, useState } from "react"
import { Center } from "@chakra-ui/react"
import { ClickAwayListener } from "@mui/material"
import Link from "next/link"

export default function MintNftButton(props: MintNftButtonInterface) {
	// Show modal on click
	// function showModal(): void {
	// 	props.handleModalOpen()
	// 	if (!props.smartAccount) {
	// 	}
	// }
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
			<Link href={"/drop/cool-contract-Address"}>
			<img src="/Component 2.png" className="min-w-full" /></Link>
		</div>
	)
}
