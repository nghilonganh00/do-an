import axios from "axios";
import { User } from "@/src/types/users";

export const registerByPassword = async ({
  email,
  password,
  fullname,
}: {
  email: string;
  password: string;
  fullname: string;
}): Promise<User[]> => {
  const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/register", { email, password, fullname });

  return response.data.data ?? [];
};
