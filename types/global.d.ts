type Locale = "ru" | "en";

interface Bakery {
  _id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  deliveryType: string;
  pickupAddress: string;
  city: string;
  street: string;
  house: string;
  flat: string;
  apartment: string;
  status:
    | "new"
    | "reject"
    | "approved"
    | "progress"
    | "pending"
    | "pickup"
    | "delivered";
}

interface User {
  _id: string;
  email: string;
  phone?: string;
  password: string;
  role: "root" | "owner" | "manager" | "waiter" | "guest";
}

interface CategoryNew {
  description: {
    ru: string;
    en: string;
  };
  title: {
    ru: string;
    en: string;
  };
}

interface Category extends CategoryNew {
  _id: string;
  slug: string;
}

interface PositionNew {
  description: {
    ru: string;
    en: string;
  };
  image: string | null;
  title: {
    ru: string;
    en: string;
  };
  price: string;
  unit: string;
  type?: string;
  categoryId: string;
}

interface Position extends PositionNew {
  _id: string;
  order: number;
  isArchived: boolean;
  isAvailable: boolean;
}

interface OrderItem {
  _id: string;
  quantity: number;
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

interface Order {
  positionId: string;
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

interface BookingNew {
  tableId: string;
  date: string;
  from: string;
  to: string;
  name: string;
  phone: string;
  status: "pending" | "confirmed" | "cancelled";
  quantity: number;
  order: Order[];
  specialRequests: string;
}

interface Booking extends BookingNew {
  _id: string;
}

interface Page {
  _id: string;
  title: {
    ru: string;
    en: string;
  };
  slug: string;
  categories: [string];
  positions: [string];
}

interface CakeOrder {
  title: string;
  description: string;
  filling: string;
  weight: number;
  price: number;
  comment: string | null;
  additional: string | null;
}

interface Cake {
  title: string;
  description: string;
  fillings: string[];
  options: {
    weight?: string;
    size?: string;
    type?: string;
    price: number;
  }[];
}

interface Cupcake {
  title: string;
  description: null;
  filling: string[];
  prices: {
    type: string;
    price: number;
  }[];
}
