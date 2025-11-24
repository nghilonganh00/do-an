"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/src/types/users";
import { updateMyProfile } from "../apis/updateMyProfile";

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: number; payload: Partial<User> }) => updateMyProfile(userId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-me"] });
    },

    onError: (error) => {
      console.error("Update profile failed:", error);
    },
  });
}
