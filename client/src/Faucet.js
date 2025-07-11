import { ethers } from "ethers";
import FaucetABI from "./abi/Faucet.json";

const CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // use your deployed address!

export const getFaucetContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, FaucetABI.abi, signer);
};
