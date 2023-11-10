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
    const notificationId = +Math.random().toString().slice(2);
    notifications.value.push({
      id: notificationId,
      count,
    });
    setTimeout(() => {
      notifications.value = notifications.value.filter(
        (item) => item.id !== notificationId
      );
      console.log(notifications.value);
    }, 3000);
    console.log(notifications.value);
  };

  const removeFromOrder = (id: Number) => {
    const orderItem = order.value.find((item) => item.id === id);
    if (orderItem) {
      +orderItem.count - 1;
      if (orderItem.count === 0) {
        order.value = order.value.filter((item) => item.id !== id);
      }
    }
  };

  return {
    order,
    addToOrder,
    removeFromOrder,
    notifications,
  };
}
