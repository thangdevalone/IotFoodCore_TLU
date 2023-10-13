import { FoodResponseBill } from "@/models"

interface FoodBill {
  nameRes: string;
  data: Food[];
}

interface Food {
  foodId: number;
  nameFood: string;
  priceFood: number;
  quantity: number;
  nameRes: string;
  resId: number;
  itemList: any;
}

export function handleFoodBill(data: FoodResponseBill[]): FoodBill[] {
  const rs: FoodBill[] = [];

  for (const item of data) {
    const existingBill = rs.find((bill) => bill.nameRes === item.nameRes);

    if (existingBill) {
      existingBill.data.push(item);
    } else {
      const newBill: FoodBill = {
        nameRes: item.nameRes || "",
        data: [item],
      };
      rs.push(newBill);
    }
  }

  return rs;
}
