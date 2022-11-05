import { Center } from "@chakra-ui/react"

export default function LowerPanel() {
	return (
		<div className="relative top-[100rem] md:top-[77rem] lg:top-[77rem] xl:top-[75rem] 2xl:top-[75rem] text-center min-w-full divide-y-4">
			<div className="absolute mb-20 inset-x-0 bottom-0">
				<Center>
					<div className="lg:2/3">
						<img className="min-w-full" src="/wavthe0ry-logo4@3x.png"></img>
					</div>
				</Center>
				<div className="absolute min-w-full container inset-y-1/4">
					<h1 className=" lg:px-10 xl:px-32 2xl:px-28 text-4xl md:text-5xl text-[#FF6700] px-10 md:px-12 lg:text-6xl 2xl:text-8xl font-azeretcus">
						a creative experiment for the underground.
					</h1>
				</div>
				<div>
					<h1 className="lg:px-10 xl:px-32 2xl:px-66 px-14 md:text-xl md:px-20 lg:px-32 text-3xl mt-20 font-azeretcus text-2xl leading-loose">
						self-soverign creation. a person and an idea. a community. beyond
						the boundary. curiosity. not centralized.
					</h1>
				</div>
			</div>
			
		</div>
	)
}
