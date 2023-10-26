import { Dish } from "~/types/Dish";

export default function () {
  const order = useState<Dish[]>("order", () => []);

  return {
    order,
  };
}
