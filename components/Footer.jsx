import { Center } from "@chakra-ui/react"

export default function Footer() {
	return (
		<div className="min-w-full relative top-[100rem] md:top-[80rem] border-slate-200 border-t-4 pt-20 md:pt-10 items-center ">
			<div className="md:flex justify-between">
				<Center>
					<div className="lg:2/3">
						<img
							className="min-w-full md:w-[10rem]"
							src="/image 17@3x.png"
						></img>
					</div>
				</Center>
				<div className="text-center pb-14 relative top-14">
					<div>
						<span className="text-2xl font-medium text-[#888888] md:text-xl invisible lg:visible">
							© Copyright 2022 Wavpoint, Inc.
						</span>
					</div>
				</div>
				<div className="flex justify-between items-center my-14">
					<div>
						<h2 className="text-2xl font-medium md:text-xl">Twitter</h2>
					</div>
					<div>
						<span className="w-4 h-4 md:w-3 md:h-3 md:mx-4 rounded-full bg-[#E5E5E5]  inline-block ml-2"></span>
					</div>
					<div>
						<h2 className="text-2xl font-medium md:text-xl">Instagram</h2>
					</div>
					<div>
						<span className="w-4 h-4 md:w-3 md:h-3 md:mx-4 rounded-full bg-[#E5E5E5]  inline-block ml-2"></span>
					</div>
					<div>
						<h2 className="text-2xl font-medium md:text-xl">FAQ</h2>
					</div>
					<div>
						<span className="w-4 h-4 md:w-3 md:h-3 md:mx-4 rounded-full bg-[#E5E5E5]  inline-block ml-2"></span>
					</div>
					<div>
						<h2 className="text-2xl font-medium md:text-xl">Deploy Drop</h2>
					</div>
				</div>
			</div>
			<div className="text-center pb-10 md:text-right lg:invisible">
				<span className="text-2xl font-medium text-[#888888] md:text-xl">
					© Copyright 2022 Wavpoint, Inc.
				</span>
			</div>
		</div>
	)
}
