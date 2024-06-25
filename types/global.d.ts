interface User {
  _id: string;
  email: string;
  password: string;
  role: "root" | "owner" | "manager" | "waiter" | "guest";
}

interface Category {
  _id: string;
  description: {
    [key: string]: string;
  };
  slug: string;
  title: {
    [key: string]: string;
  };
}

interface Dish {
  _id: string;
  menu: string;
  categoryId: string;
  name: string;
  description: string | null;
  unit: string | number;
  price: number;
  feature: string | null;
  image: string | null;
  type: string | null;
  portion_size: string | null;
}
