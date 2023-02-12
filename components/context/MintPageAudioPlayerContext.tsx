import React, {createContext, useEffect, useState} from "react"


type MintPageAudioPlayerContextType = {
	children: React.ReactNode
}

type MintPageAudioPlayerContextValue = {
    audio:HTMLAudioElement,
    playAudio: () => void,
    stopAudio: () => void,
    changeAudio: (newAudio:HTMLAudioElement) => void,
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export const MintPageAudioPlayerContext = createContext<MintPageAudioPlayerContextValue | null>(null)

const MintPageAudioPlayerContextProvider = ({children}:MintPageAudioPlayerContextType) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)

    function playAudio() {
		setIsPlaying(true)
		audio.play()
	}
	function stopAudio() {
		audio.pause()
		setIsPlaying(false)
	}
    function changeAudio(newAudio:HTMLAudioElement):void {
        setAudio(newAudio)
    }

    return <MintPageAudioPlayerContext.Provider value={{audio,playAudio, stopAudio,changeAudio,isPlaying, setIsPlaying}}>{children}</MintPageAudioPlayerContext.Provider>
}

export default MintPageAudioPlayerContextProvider