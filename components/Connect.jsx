import { Magic } from "magic-sdk"
import { ConnectExtension } from "@magic-ext/connect"

export default function ConnectButton() {
	return (
		<div>
			<button className="absolute lg:right-8 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-6 md:top-8 md:right-10 md:py-3 md:px-10 top-10 right-10 py-4 px-8">
				<span className="sm:text-2xl md:text-sm font-medium">Connect</span>
				<span className="w-2.5 h-2.5 rounded-full bg-[#FF6700] inline-block ml-2"></span>
			</button>
		</div>
	)
}
