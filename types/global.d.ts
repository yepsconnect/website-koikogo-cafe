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
  categoryId: string;
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  unit: string;
  price: number;
  image: string | null;
  slug: string;
}

interface OrderItem {
  _id: string;
  count: number;
}
