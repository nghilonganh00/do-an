import { Shipment } from "@/src/types/order";
import axios from "axios";
import { CalculateShipFee } from "../types";

const caculateFee = async (shipment: Shipment): Promise<CalculateShipFee> => {
  if (!shipment?.wardCode || !shipment?.districtId) return { total: 0 };

  const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/ghn/calculate-fee", {
    toWardCode: shipment?.wardCode,
    toDistrictId: shipment?.districtId,
  });

  return response.data.data ?? [];
};

export default caculateFee;
