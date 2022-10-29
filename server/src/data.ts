import { TPizzas, Size } from './typings';

export const pizzas: TPizzas = {
  [Size.SMALL]: { description: "10'' pizza for one person", price: 11.99, size: "10''" },
  [Size.MEDIUM]: { description: "12'' Pizza for two persons", price: 15.99, size: "12''" },
  [Size.LARGE]: { description: "15'' Pizza for four persons", price: 21.99, size: "15''" },
}
