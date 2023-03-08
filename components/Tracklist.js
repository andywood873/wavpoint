import { Fab, TextField } from "@mui/material"
import { Stack } from "@mui/system"
import AddIcon from "@mui/icons-material/Add"

export default function Tracklist(props) {


    function increaseTracks() {
		// setTracklistCounter(tracklistCounter + 1)
        const data = [...props.tracklist, ""]
		props.setTracklist(data)
        console.log(props.tracklist)
	}

    function handleTracklistChange(index, event) {
		let data = props.tracklist
		console.log(data);
		data[index] = event.target.value
		// console.log(data)
		props.setTracklist(data)
		console.log(props.tracklist)
	}

	return (
		<Stack>
			<h2>Track ID</h2>
			{props.tracklist.map((item, index) => {
				return (
					<div key={item}>
						<h2 className="my-5 font-medium text-[#888888] font-['DM Sans'] text-md mx-1">
							Track ID {index + 1}
						</h2>
						<TextField
							id="outlined-basic"
							label="TrackList"
							variant="outlined"
							name="tracklist"
							// value={item}
							sx={{ width: "52.5rem" }}
							onChange = {(event) => handleTracklistChange(index, event)}
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
	)
}
