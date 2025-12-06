import { useMutation } from "@tanstack/react-query";
import { updateProductVariant } from "../apis/updateProductVariant";
import { VariantFormData } from "../components/VariantForm";

const useUpdateProductVariant = () => {
  return useMutation({
    mutationFn: async (data: VariantFormData) => updateProductVariant(data),
  });
};

export default useUpdateProductVariant;
