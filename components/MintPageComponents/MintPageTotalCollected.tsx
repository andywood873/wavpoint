import { MintPageTotalCollectedInterface } from "../../lib/Interfaces";


export default function MintPageTotalCollected({collectedNumber}: MintPageTotalCollectedInterface) {
    
    return <div className="absolute z-20 top-[8rem] md:top-[20rem] lg:top-[15rem] right-[4rem] md:right-[0.3rem] sm:top-[5rem]  bg-[#F5F5F5] px-10 py-5 md:px-5 md:py-2.5 rounded-full">
						<span className="text-2xl text-[#FF6700] md:text-lg">
							{collectedNumber} collected
						</span>
					</div>
}