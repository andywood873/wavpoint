import MusicPlayer from "../MusicPlayer";


export default function MintPageCard() {
    
    return <div className="relative md:container top-[15rem] md:top-[15rem] lg:top-[12rem] xl:top-[11rem] md:overflow-x-auto lg:max-w-full xl:max-w-[40rem] mx-10">
        <MusicPlayer audioFilePath="/One Piece OST_ Overtaken _ EPIC VERSION (Drums of Liberation).mp3" backgroundFilePath="/Rectangle 122@3x.png" isClickAway={true}/>
    </div>
}