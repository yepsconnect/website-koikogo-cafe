interface User {
  _id: string;
  email: string;
  password: string;
  role: "root" | "owner" | "manager" | "waiter" | "guest";
}

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
  bookingNumber?: string;
  status:
    | "new"
    | "reject"
    | "approved"
    | "progress"
    | "pending"
    | "pickup"
    | "delivered";
}

interface CategoryNew {
  description?: {
    [key: string]: string;
  };
  title: {
    [key: string]: string;
  };
}

interface Category extends CategoryNew {
  _id: string;
  order: number;
  slug: string;
}

interface NewPosition {
  pageIds: string[];
  categoryId: string;
  description: { [key: string]: string };
  image: string | null;
  title: { [key: string]: string };
  price: number;
  unit: string;
  type?: string;
}

interface Position extends NewPosition {
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

interface Page {
  _id: string;
  title: {
    ru: string;
    en: string;
  };
  categories: string[];
}
