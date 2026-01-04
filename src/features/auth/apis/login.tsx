import axios from "axios";
import { User } from "@/src/types/users";

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export const login = async ({ email, password }: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/login", { email, password });

  return response.data.data ?? [];
};
