// utils/contract.js
import { ethers } from "ethers";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const contractABI = [
  "function joinWaitlist() external",
  "function isWaitlisted(address) view returns (bool)",
  "function waitlistCount() view returns (uint256)",
  "function getWaitlist() view returns (address[])"
];

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0]; // return connected account
};

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask is not installed");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []); // request access
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};


// Mengambil semua alamat yang sudah waitlist
export const getWaitlistAddresses = async () => {
  const contract = await getContract();
  const addresses = await contract.getWaitlist();
  return addresses;
};
