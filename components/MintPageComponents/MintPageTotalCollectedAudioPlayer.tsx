import { MintPageTotalCollectedInterface } from "../../lib/Interfaces";


export default function MintPageTotalCollectedAudioPlayer({collectedNumber}: MintPageTotalCollectedInterface) {
    
    return <div className="absolute invisible xl:top-[1rem] xl:mr-[5rem] xl:visible right-[4rem] md:right-[0.3rem] sm:top-[5rem]  bg-[#F5F5F5] px-10 py-5 md:px-5 xl: md:py-2.5 rounded-full">
						<span className="text-2xl text-[#FF6700] md:text-lg xl:text-xl">
							{collectedNumber} collected
						</span>
					</div>
}