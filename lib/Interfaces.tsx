// import SmartAccount from "@biconomy/smart-account"
// import SocialLogin from "@biconomy/web3-auth"
import { Bytes, ethers } from "ethers"
import { Dispatch, SetStateAction } from "react"

export interface MintNftButtonInterface {
    provider: any | null,
    account: string,
    isMintPage: boolean
}

export interface CardPropInterface {
    // smartAccount: SmartAccount | null,
    provider: any | null,
    account: string,
    // socialLoginSdk: SocialLogin | null,
    audioFilePath: string,
    backgroundFilePath: string,
    createdBy: string
}

export interface PopularPropInterface {
    // smartAccount: SmartAccount | null,
    provider: any | null,
    account: string,
    // socialLoginSdk: SocialLogin | null,
    
}

export interface MusicPlayerPropInterface {
    audioFilePath: string,
    backgroundFilePath: string,
    isClickAway?:boolean
}

export interface MintPageTotalCollectedInterface {
    collectedNumber: number
}

export interface TransactionInterface {
    to: string,
    data: string,
    value: ethers.BigNumber
}

export interface MintPageModalInterface{
    setIsError: Dispatch<SetStateAction<boolean>>,
    handleModalClose: () => void,
    isModalOpen: boolean,
    modalTitle: string,
    modalProgress: number,
    txHash: string,
    isError: boolean,
    modalBody: string
}