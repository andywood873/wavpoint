import { Magic } from 'magic-sdk';
import { ConnectExtension } from "@magic-ext/connect"
const MAGIC_API_KEY = process.env.NEXT_PUBLIC_MAGIC_API_KEY // API key from Magic link
import { ethers } from "ethers"
// Create client-side Magic instance
const createMagic = (key) => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
      extensions: [new ConnectExtension()],
      network: "goerli",
    })
  );
};


export const magic = createMagic(MAGIC_API_KEY);