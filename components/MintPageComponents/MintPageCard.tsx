import MusicPlayer from "../MusicPlayer";


export default function MintPageCard() {
    
    return <div className="relative md:container top-[15rem] md:top-[25rem] lg:top-[22rem] md:overflow-x-auto lg:max-w-full mx-10">
        <MusicPlayer audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3" backgroundFilePath="/Rectangle 122@3x.png" isClickAway={true}/>
    </div>
}