import { useQuery } from "@tanstack/react-query";
import caculateFee from "../apis/caculateFee";
import { Shipment } from "@/src/types/order";

export const useCaculateFee = (shipment?: Shipment) => {
  return useQuery({
    queryKey: ["calculate-fee", shipment],
    queryFn: () => {
      if (!shipment) throw new Error("Shipment is required");
      return caculateFee(shipment);
    },
    enabled: !!shipment,
  });
};
