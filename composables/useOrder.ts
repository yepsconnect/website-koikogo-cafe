export default function () {
  const order = useState<OrderItem[]>("order", () => []);

  const addToOrder = (productId: string, count: number) => {
    const orderItem = order.value.find((item) => item.productId === productId);
    if (orderItem) {
      orderItem.count += count;
    } else {
      order.value.push({
        productId,
        count,
      });
    }
    localStorage.setItem("order", JSON.stringify(order.value));
  };

  const decrementOrder = (_id: string) => {
    const orderItem = order.value.find((item) => item.productId === _id);
    if (orderItem) {
      orderItem.count -= 1;
      if (orderItem.count === 0) {
        order.value = order.value.filter((item) => item.productId !== _id);
      }
    }
    localStorage.setItem("order", JSON.stringify(order.value));
  };

  const incrementOrder = (_id: string) => {
    const orderItem = order.value.find((item) => item.productId === _id);
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
