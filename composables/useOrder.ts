export default function () {
  const order = useState<
    {
      _id: string;
      count: number;
    }[]
  >("order", () => []);

  const addToOrder = (_id: string, count: number) => {
    const orderItem = order.value.find((item) => item._id === _id);
    if (orderItem) {
      orderItem.count += count;
    } else {
      order.value.push({
        _id,
        count,
      });
    }
    localStorage.setItem("order", JSON.stringify(order.value));
  };

  const decrementOrder = (_id: string) => {
    const orderItem = order.value.find((item) => item._id === _id);
    if (orderItem) {
      orderItem.count -= 1;
      if (orderItem.count === 0) {
        order.value = order.value.filter((item) => item._id !== _id);
      }
    }
    localStorage.setItem("order", JSON.stringify(order.value));
  };

  const incrementOrder = (_id: string) => {
    const orderItem = order.value.find((item) => item._id === _id);
    if (orderItem) {
      orderItem.count += 1;
    }
    localStorage.setItem("order", JSON.stringify(order.value));
  };

  const clearOrder = () => {
    order.value = [];
    localStorage.removeItem("order");
  };

  if (import.meta.client) {
    const orderStorage = localStorage.getItem("order");
    order.value = JSON.parse(orderStorage || "[]");
  }

  return {
    order,
    addToOrder,
    decrementOrder,
    incrementOrder,
    clearOrder,
  };
}
