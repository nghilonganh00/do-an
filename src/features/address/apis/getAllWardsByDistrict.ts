import { Ward } from "@/src/types/address";
import axios from "axios";

export const getAllWardsByDistrict = async (districtId: number): Promise<Ward[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ghn/wards/${districtId}`);

  return response.data.data ?? [];
};
