import dynamic from "next/dynamic"
import Link from "next/link"
import Navbar from "./Navbar"

export default function Header(props) {
	
	return (
		<div className="flex justify-between relative">
			<Navbar />
			<div className="md:flex">
				<div className="absolute top-64 left-10 w-2/3 h-44 md:top-56 md:left-10 md:w-2/5 md:h-20 lg:w-1/3 lg:h-16">
					<span className="leading-9 font-azeretcus font-medium text-2xl md:text-xs md:text-sm space-x-20 tracking-wider uppercase whitespace-pre-wrap">
						{"        "}A decentralized content creation experiment featuring DJ
						mixes,{""}
						mixtapes & maybe more. Curated drops can be bumped/collected.{" "}
					</span>
				</div>
				<div className="absolute top-[37rem] md:top-56 right-10 ">
					<span className="leading-9 font-azeretcus font-medium text-2xl md:text-xs md:text-sm space-x-20 tracking-wider uppercase whitespace-pre-wrap ">
						A project powered by
					</span>
					<div className="justify-items-end absolute -right-10 md:-right-5 lg:-right-6 -z-10">
						<img src="/image 19@3x.png" className="w-44 md:w-24 lg:w-28"></img>
					</div>
				</div>
			</div>
		</div>
	)
}
