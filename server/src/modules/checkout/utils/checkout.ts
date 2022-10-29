import { PricingRulesFn, TCartItems, Size, Customer } from "../../../typings";
import { customerRulesMapping } from "./customerRulesMapping";

export class Checkout {
    pricingRules: PricingRulesFn[];
  
    private cart: TCartItems = {
      [Size.SMALL]: { purchaseCount: 0 },
      [Size.MEDIUM]: { purchaseCount: 0 },
      [Size.LARGE]: { purchaseCount: 0 },
    };
  
    constructor(customerType: Customer) {
      this.pricingRules = customerRulesMapping[customerType];
    }
  
    add(size: Size, amount: number) {
      this.cart[size].purchaseCount += amount;
    }
  
    total() {
      const cart = this.pricingRules.reduce((acc, rule) => rule(acc), this.cart);
      const total = Object.values(cart).reduce((acc, item) => acc + item.total!, 0);
      return {
        cart,
        total,
      };
    }
  }