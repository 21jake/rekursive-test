import { Customer, CustomerRules, Size } from '../../../typings';
import { buyXGetYFreeBySize, customPriceBySize, defaultPolicy } from './pricingRules';

export const customerRulesMapping: CustomerRules = {
  [Customer.DEFAULT]: [defaultPolicy()],
  [Customer.MICROSOFT]: [defaultPolicy(), buyXGetYFreeBySize(Size.SMALL, { threshold: 2, bonus: 1 })],
  [Customer.FACEBOOK]: [defaultPolicy(), buyXGetYFreeBySize(Size.MEDIUM, { threshold: 5, bonus: 1 })],
  [Customer.AMAZON]: [defaultPolicy(), customPriceBySize(Size.LARGE, 19.99)],
};
