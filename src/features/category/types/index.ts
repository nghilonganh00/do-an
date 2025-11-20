import z from "zod";
import { categorySchema } from "../constants";

export type CategoryFormValues = z.infer<typeof categorySchema>;
