interface IUser {
  _id: string;
  email: string;
  password: string;
  role: "root" | "owner" | "manager" | "waiter" | "guest";
}

interface ICategory {
  _id: string;
  title: string;
  description: string | null;
}

interface IDish {
  _id: string;
  menu: string;
  category: string;
  name: string;
  description: string | null;
  unit: string | number;
  price: number;
  feature: string | null;
  image: string | null;
}
