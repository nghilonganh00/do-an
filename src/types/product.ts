export type Category = {
  id?: number;
  name?: string;
  image?: string;
  totalProduct?: number;
  products?: Product[];
};

export type Product = {
  id?: number;
  name?: string;
  image?: string;
  inventory?: number;
  stars?: number;
  price?: number;
  originalPrice?: number;
  category_id?: number;
  category?: Category;
};
