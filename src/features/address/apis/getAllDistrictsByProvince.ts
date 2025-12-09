import { District } from "@/src/types/address";
import axios from "axios";

export const getAllDistrictsByProvince = async (provinceId: number): Promise<District[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ghn/districts/${provinceId}`);

  return response.data.data ?? [];
};
