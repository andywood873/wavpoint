import SmartAccount from "@biconomy/smart-account"
import SocialLogin from "@biconomy/web3-auth"
import { Bytes } from "ethers"

export interface MintNftButtonInterface {
    smartAccount: SmartAccount | null,
    provider: any | null,
    account: string,
    socialLoginSdk: SocialLogin | null,
}

export interface CardPropInterface {
    smartAccount: SmartAccount | null,
    provider: any | null,
    account: string,
    socialLoginSdk: SocialLogin | null,
    audioFilePath: string,
    backgroundFilePath: string,
    createdBy: string
}

export interface PopularPropInterface {
    smartAccount: SmartAccount | null,
    provider: any | null,
    account: string,
    socialLoginSdk: SocialLogin | null,
    
}

export interface MusicPlayerPropInterface {
    audioFilePath: string,
    backgroundFilePath: string,
    isClickAway?:boolean
}

export interface MintPageTotalCollectedInterface {
    collectedNumber: number
}