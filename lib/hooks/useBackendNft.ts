import useSWR from "swr";
import { api } from "../api";

export default function useBackendNfts(address: string | null) {
  return useSWR(
    address ? ['nfts', address] : null,
    () => api(`/assets/nft?wallet=${address}`).then(r => r.json()),
  );
}