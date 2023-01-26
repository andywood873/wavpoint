import { MintPageTotalCollectedInterface } from "../../lib/Interfaces";


export default function MintPageTotalCollected({collectedNumber}: MintPageTotalCollectedInterface) {
    
    return <div className="absolute z-20 top-[43rem] right-[4rem] sm:top-[44rem] md:top-[60rem]  bg-[#F5F5F5] px-10 py-5 rounded-full">
						<span className="text-2xl text-[#FF6700]">
							{collectedNumber} collected
						</span>
					</div>
}