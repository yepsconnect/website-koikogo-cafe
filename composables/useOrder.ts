export default function () {
  const order = useState<
    {
      id: number;
      count: number;
    }[]
  >("order", () => []);

  const notifications = useState<
    {
      id: number;
      count: number;
    }[]
  >("notifications", () => []);

  const addToOrder = (id: number, count: number, isNew: boolean) => {
    const orderItem = order.value.find((item) => item.id === id);

    if (orderItem?.count) {
      orderItem.count += 1;
    } else {
      order.value.push({
        id,
        count,
      });
    }

    localStorage.setItem("order", JSON.stringify(order.value));

    if (isNew) {
      return;
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
    }, 3000);
  };

  const removeFromOrder = (id: number) => {
    const orderItem = order.value.find((item) => item.id === id);
    if (orderItem) {
      orderItem.count -= 1;
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
