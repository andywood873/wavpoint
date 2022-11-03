import Card from "./Card"

export default function Recent() {
	return (
		<div className="absolute top-[220rem] md:top-[75rem] lg:top-[75rem] 2xl:top-[85rem] mr-10">
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
		</div>
	)
}
