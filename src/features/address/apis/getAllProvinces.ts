import axios from "axios";
import { Province } from "@/src/types/address";

export const getAllProvinces = async (): Promise<Province[]> => {
  console.log("process.env.NEXT_PUBLIC_API_URL: ", process.env.NEXT_PUBLIC_API_URL);
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/ghn/provinces");

  return response.data.data ?? [];
};
