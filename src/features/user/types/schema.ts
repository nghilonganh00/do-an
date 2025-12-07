import z from "zod";

export const updateUserProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  avatar: z.string().optional(),
  provinceId: z.number().nullable(),
  districtId: z.number().nullable(),
  wardId: z.number().nullable(),
});
