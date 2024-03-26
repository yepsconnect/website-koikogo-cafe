export interface Dish {
  id: number;
  menu: string;
  category: string;
  name: string;
  description: string | null;
  unit: string | number;
  price: number;
  feature: string | null;
  image: string | null;
}
