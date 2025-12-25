import axios from "axios";

export const deleteProductById = async (id: number): Promise<void> => {
  await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/products/${id}`);
};
