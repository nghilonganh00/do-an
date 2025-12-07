import { supabase } from "@/src/lib/supabaseClient";
import { Params } from "@/src/types";
import { User } from "@/src/types/users";

interface GetAllCustomers {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export const getAllCustomers = async ({
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortDir = "desc",
}: Params): Promise<GetAllCustomers | null> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let builder = supabase.from("users").select(
    `
      *,
      orders:orders(*),
      payments (*)
    `,
    { count: "exact" }
  );

  if (sortBy) {
    builder = builder.order(sortBy, { ascending: sortDir === "asc" });
  }

  const { data, error, count } = await builder.range(from, to);

  if (error) {
    console.error("Failed to fetch my order history:", error);
    return null;
  }

  return {
    data: data ?? [],
    total: count ?? 0,
    page,
    limit,
  };
};
