import { pizzas } from '../../../data';
import { Size, TCartItems } from '../../../typings';

interface TThresholdBonus {
  threshold: number;
  bonus: number;
}

const buyXGetYFree = ({ threshold, bonus }: TThresholdBonus, amount: number) => {
  const rate = Math.floor(amount / threshold);
  return rate * bonus;
};

export const buyXGetYFreeBySize =
  (size: Size, { threshold, bonus }: TThresholdBonus) =>
  (items: TCartItems): TCartItems => {
    const item = items[size];
    if (!item) return items;

    const freeAmount = buyXGetYFree({ threshold, bonus }, item.purchaseCount);
    const paidAmount = item.purchaseCount - freeAmount;
    const total = paidAmount * pizzas[size].price;
    return { ...items, [size]: { ...item, total } };
  };

export const customPriceBySize =
  (size: Size, customPrice: number) =>
  (items: TCartItems): TCartItems => {
    const item = items[size];
    if (!item) return items;
    const total = item.purchaseCount * customPrice;
    return { ...items, [size]: { ...item, total } };
  };

export const defaultPolicy =
  () =>
  (items: TCartItems): TCartItems => {
    return Object.keys(items).reduce((acc, size) => {
      const item = items[size as Size];
      const total = item.purchaseCount * pizzas[size as Size].price;
      return { ...acc, [size]: { ...item, total } };
    }, {} as TCartItems);
  };
