import { Center } from "@chakra-ui/react"
import Card from "./Card"

export default function Recent() {
	return (
		<div className="relative top-[55rem] md:top-[35rem] lg:top-[30rem] 2xl:top-[25em] ">
			<h1 className="text-4xl md:text-[1.6rem] lg:text-4xl font-azeretcus mb-4">
				Recent
			</h1>
			<div className="md:container md:grid md:grid-cols-2 2xl:max-w-full gap-x-4 lg:grid-cols-3">
				<div className="mb-10">
					<Card
						audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
						backgroundFilePath="/Rectangle 43@3x.png"
						createdBy="D&D Studio"
					/>
				</div>
				<div className="mb-10 ">
					<Card
						audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
						backgroundFilePath="/Rectangle 44@3x.png"
						createdBy="Fool's Gold"
					/>
				</div>
				<div className="mb-10">
					<Card
						audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
						backgroundFilePath="/Mask group@3x_recent.png"
						createdBy="Chillington"
					/>
				</div>
				<div className="mb-10">
					<Card
						audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
						backgroundFilePath="/Rectangle 61@3x.png"
						createdBy="Chillington"
					/>
				</div>
				<div className="mb-10">
					<Card
						audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
						backgroundFilePath="/Rectangle 62@3x.png"
						createdBy="Chillington"
					/>
				</div>
				<div className="mb-10">
					<Card
						audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3"
						backgroundFilePath="/Mask group@3xrecent_2.png"
						createdBy="Chillington"
					/>
				</div>
			</div>
			<div className="container min-w-full mb-20">
				<Center>
					<button className="bg-[#222222] px-[3.75rem] py-6 min-w-full font-bold text-white rounded-lg text-3xl md:min-w-min md:text-base md:py-3 md:rounded lg:w-1/3 lg:py-4">Load More</button>
				</Center>
			</div>
		</div>
	)
}
