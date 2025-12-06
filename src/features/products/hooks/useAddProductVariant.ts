import { useMutation } from "@tanstack/react-query";
import { VariantFormData } from "../components/VariantForm";
import { addProductVariant } from "../apis/addProductVariant";

const useAddProductVariant = () => {
  return useMutation({
    mutationFn: async (data: VariantFormData) => addProductVariant(data),
  });
};

export default useAddProductVariant;
