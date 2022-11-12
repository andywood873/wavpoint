import { Button } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import ConnectButton from "./Connect"

export default function Header() {
	return (
		<div className="flex justify-between relative">
			{/* <image src="/wavthe0ry-logo2@3x.png" width="148px" height="92px" alt="wavThe0ry Logo" wid/> */}
			<div className="absolute top-10 left-10 md:top-8 md:left-10 lg:left-8 lg:top-6">
				<img
					src="/wavthe0ry-logo2@3x.png"
					alt="Logo"
					className="w-32 min-w-full min-h-full h-20 md:w-40 md:h-24 lg:w-36 lg:h-24"
				/>
			</div>
			<div className="justify-between items-center">
				<Link href="/mediaUpload">
				<h2 className="absolute font-['DM Sans'] inline invisible lg:visible text-sm font-medium leading-6 top-9 right-48">
					Deploy Drop
				</h2></Link>
				<ConnectButton />
			</div>
			<div className="md:flex">
				<div className="absolute top-64 left-10 w-2/3 h-44 md:top-56 md:left-10 md:w-2/5 md:h-20 lg:w-1/3 lg:h-16">
					<span className="leading-9 font-azeretcus font-medium text-2xl md:text-xs md:text-sm space-x-20 tracking-wider uppercase whitespace-pre-wrap">
						{"        "}A decentralized content creation experiment featuring DJ
						mixes,{""}
						mixtapes & maybe more. Curated drops can be bumped/collected.
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
