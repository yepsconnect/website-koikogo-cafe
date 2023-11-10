export default function () {
  const order = useState<
    {
      id: Number;
      count: Number;
    }[]
  >("order", () => []);

  const notifications = useState<
    {
      id: Number;
      count: Number;
    }[]
  >("notifications", () => []);

  const addToOrder = (id: Number, count: Number) => {
    const orderItem = order.value.find((item) => item.id === id);

    if (orderItem) {
      +orderItem.count + 1;
    } else {
      order.value.push({
        id,
        count,
      });
    }

    localStorage.setItem("order", JSON.stringify(order.value));

    const notificationId = +Math.random().toString().slice(2);
    notifications.value.push({
      id: notificationId,
      count,
    });
    setTimeout(() => {
      notifications.value = notifications.value.filter(
        (item) => item.id !== notificationId
      );
    }, 3000);
  };

  const removeFromOrder = (id: Number) => {
    const orderItem = order.value.find((item) => item.id === id);
    if (orderItem) {
      +orderItem.count - 1;
      if (orderItem.count === 0) {
        order.value = order.value.filter((item) => item.id !== id);
      }
    }
    localStorage.setItem("order", JSON.stringify(order.value));
  };

  return {
    order,
    addToOrder,
    removeFromOrder,
    notifications,
  };
}
