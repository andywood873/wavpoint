import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import Card from "./Card"

export default function Popular() {
	return (
		<div className="relative top-[50rem] md:top-[25rem] lg:top-[22rem]">
			<h1 className="text-4xl md:text-[1.6rem] lg:text-4xl font-azeretcus mb-4">
				Popular
			</h1>
			<div className="md:container  md:grid md:grid-flow-col gap-x-4 md:overflow-x-auto lg:max-w-full">
				<div className="mb-10 ">
					<Card
						audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
						backgroundFilePath="/Rectangle 122@3x.png"
						createdBy="D&D Studio"
					/>
				</div>
				<div className="mb-10">
					<Card
						audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
						backgroundFilePath="/Rectangle 2@3x.png"
						createdBy="Fool's Gold"
					/>
				</div>
				<div className="mb-10">
					<Card
						audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
						backgroundFilePath="/Mask group@3x.png"
						createdBy="Chillington"
					/>
				</div>
			</div>
		</div>
	)
}