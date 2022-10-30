import { Customer, CustomerRules, Size } from '../../../typings';
import { buyXGetYFreeBySize, customPriceBySize, defaultPolicy } from './pricingRules';

export const customerRulesMapping: CustomerRules = {
  [Customer.DEFAULT]: [defaultPolicy()],

  //Microsoft Gets a 3 for 2 deal for Small Pizzas
  [Customer.MICROSOFT]: [defaultPolicy(), buyXGetYFreeBySize(Size.SMALL, { threshold: 3, bonus: 1 })],

  // Gets a 5 for 4 deal on Medium Pizza
  [Customer.FACEBOOK]: [defaultPolicy(), buyXGetYFreeBySize(Size.MEDIUM, { threshold: 5, bonus: 1 })],

  // Gets a discount on Large Pizza where the price drops to $19.99 per pizza  
  [Customer.AMAZON]: [defaultPolicy(), customPriceBySize(Size.LARGE, 19.99)],
};
