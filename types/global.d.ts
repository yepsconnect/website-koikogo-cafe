interface User {
  _id: string;
  email: string;
  password: string;
  role: "root" | "owner" | "manager" | "waiter" | "guest";
}

interface Category {
  _id: string;
  description: string | null;
  slug: string;
  title: string;
}

interface Dish {
  _id: string;
  menu: string;
  category: string;
  name: string;
  description: string | null;
  unit: string | number;
  price: number;
  feature: string | null;
  image: string | null;
  type: string | null;
  portion_size: string | null;
}
