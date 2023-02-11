import { Center } from "@chakra-ui/react"
import {
	Box,
	Button,
	CircularProgress,
	LinearProgress,
	Modal,
	Typography,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import Link from "next/link"
import { MintPageModalInterface } from "../../lib/Interfaces"
export default function MintPageModal(props:MintPageModalInterface) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 700,
		bgcolor: "background.paper",
		border: "2px solid #fff",
		boxShadow: 24,
		p: 5,
	}
	function close() {
		props.setIsError(false)
		props.handleModalClose()
	}
	return (
		<Center>
			<Modal open={props.isModalOpen} onClose={props.handleModalClose}>
				<Box sx={style}>
					<Center>
						<Typography
							id="modal-modal-title"
							variant="h4"
							component="h1"
							sx={{ m: 5 }}
						>
							{props.modalTitle}
						</Typography>
					</Center>
					{props.modalProgress === 100 ? (
						<>
							<Center>
								<div>
									<CheckCircleIcon sx={{ fontSize: 100, color: "#32CD32" }} />
								</div>
							</Center>
							<Center>
								<div>
									<a
										href={`https://mumbai.polygonscan.com/tx/${props.txHash}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										View on Etherscan
									</a>
								</div>
							</Center>
						</>
					) : !props.isError ? (
						<Center>
							<CircularProgress />
						</Center>
					) : (
						<Center>
							<ErrorIcon sx={{ fontSize: 100, color: "#ED0000" }} />
						</Center>
					)}
					<LinearProgress
						variant="determinate"
						value={props.modalProgress}
						sx={{ mt: 5 }}
					/>
					<Center>
						<Typography id="modal-modal-description" sx={{ m: 5 }}>
							{props.modalBody}
						</Typography>
					</Center>
					<Center>
						<Button onClick={close} sx={{ bgcolor: "white", color: "black" }}>
							Close
						</Button>
					</Center>
				</Box>
			</Modal>
		</Center>
	)
}
