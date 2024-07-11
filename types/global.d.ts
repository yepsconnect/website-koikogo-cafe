interface User {
  _id: string;
  email: string;
  password: string;
  role: "root" | "owner" | "manager" | "waiter" | "guest";
}

interface CategoryNew {
  description: {
    [key: string]: string;
  };
  title: {
    [key: string]: string;
  };
  page: string;
}

interface Category extends CategoryNew {
  _id: string;
  order: number;
  slug: string;
}

interface NewDish {
  categoryId: string;
  description: { [key: string]: string };
  image: string | null;
  title: { [key: string]: string };
  price: number;
  unit: string;
}

interface Dish extends NewDish {
  _id: string;
  order: number;
  slug: string;
  isAvailable: boolean;
  isArchived: boolean;
  new: boolean;
}

interface OrderItem {
  _id: string;
  count: number;
}

interface Order {
  dishId: string;
  quantity: number;
  price: number;
  status:
    | "ordered"
    | "preparing"
    | "prepared"
    | "served"
    | "completed"
    | "cancelled";
}

interface TableNew {
  name: { [key: string]: string };
  capacity: number;
  hall: string;
}

interface Table extends TableNew {
  order: number;
  _id: string;
}

interface HallNew {
  title: { [key: string]: string };
}

interface Hall extends HallNew {
  _id: string;
}

interface BookingNew {
  tableId: string;
  date: string;
  from: string;
  to: string;
  name: string;
  phone: string;
  status: "pending" | "confirmed" | "cancelled";
}

interface Booking extends BookingNew {
  _id: string;
}
