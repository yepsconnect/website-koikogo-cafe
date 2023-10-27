export default function () {
  const order = useState<
    {
      id: Number;
      count: Number;
    }[]
  >("order", () => []);

  const addToOrder = (id: Number) => {
    const orderItem = order.value.find((item) => item.id === id);
    if (orderItem) {
      orderItem.count++;
    } else {
      order.value.push({
        id,
        count: 1,
      });
    }
  };

  const removeFromOrder = (id: Number) => {
    const orderItem = order.value.find((item) => item.id === id);
    if (orderItem) {
      orderItem.count--;
      if (orderItem.count === 0) {
        order.value = order.value.filter((item) => item.id !== id);
      }
    }
  };

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
