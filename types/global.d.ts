interface User {
  _id: string;
  email: string;
  phone?: string;
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
}

interface Category extends CategoryNew {
  _id: string;
  order: number;
  slug: string;
}

interface NewPosition {
  pageId: string[];
  categoryId: string;
  description: { [key: string]: string };
  image: string | null;
  title: { [key: string]: string };
  price: number;
  unit: string;
}

interface Position extends NewPosition {
  _id: string;
  order: number;
  isArchived: boolean;
  isAvailable: boolean;
  type: string;
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
  priceAtOrder: number;
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
  bookingNumber: string;
}
